import { PrismaClient } from "@prisma/client";

const AGGREGATORS = [
  "scholarshipregion", "opportunitydesk", "scholars4dev",
  "afterschoolafrica", "scholarship-positions", "masterstudies",
  "hotcoursesabroad", "studyportals", "findamasters", "scholarshipdb",
  "scholarsregion", "myschoolarship",
];

const LOGIN_KEYWORDS = [
  "studenti.", "portal.", "login", "signin", "sign-in",
  "account.", "applicants.", "candidature",
];

async function main() {
  const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

  const scholarships = await prisma.scholarship.findMany({
    where: { isActive: true, ivoirianEligible: true, isTranslated: true },
    select: { id: true, name: true, link: true },
  });

  const empty: typeof scholarships = [];
  const aggregators: typeof scholarships = [];
  const logins: typeof scholarships = [];
  const rootDomain: typeof scholarships = [];

  for (const s of scholarships) {
    if (!s.link) { empty.push(s); continue; }
    try {
      const url = new URL(s.link);
      const host = url.hostname;
      const path = url.pathname;

      if (AGGREGATORS.some((a) => host.includes(a))) {
        aggregators.push(s);
      } else if (LOGIN_KEYWORDS.some((k) => host.includes(k) || path.includes(k))) {
        logins.push(s);
      } else if (path === "/" || path === "") {
        rootDomain.push(s);
      }
    } catch {
      empty.push(s);
    }
  }

  console.log("=== Link Audit Report ===\n");
  console.log(`Total active scholarships: ${scholarships.length}`);
  console.log(`Empty/broken links:        ${empty.length}`);
  console.log(`Aggregator sites:          ${aggregators.length}`);
  console.log(`Login/portal pages:        ${logins.length}`);
  console.log(`Root domain only:          ${rootDomain.length}`);
  const ok = scholarships.length - empty.length - aggregators.length - logins.length - rootDomain.length;
  console.log(`Looks OK:                  ${ok}`);

  if (aggregators.length) {
    console.log("\n--- Aggregator sites (still need fixing) ---");
    aggregators.forEach((s) => console.log(` • ${s.name.slice(0, 60)}\n   ${s.link}`));
  }
  if (logins.length) {
    console.log("\n--- Login/portal pages (suspicious) ---");
    logins.forEach((s) => console.log(` • ${s.name.slice(0, 60)}\n   ${s.link}`));
  }
  if (rootDomain.length) {
    console.log("\n--- Root domain only (generic homepage) ---");
    rootDomain.forEach((s) => console.log(` • ${s.name.slice(0, 60)}\n   ${s.link}`));
  }

  await prisma.$disconnect();
}

main().catch(console.error);

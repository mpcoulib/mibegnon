import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";

const BASE_URL = "https://www.scholarshipregion.com";
const API_BASE = `${BASE_URL}/wp-json/wp/v2`;
const DELAY_MS = 500;

const HEADERS: Record<string, string> = {
  "User-Agent": "Mozilla/5.0 (compatible; MibegnonBot/1.0)",
  Accept: "application/json",
};

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const categoryArg = args.indexOf("--category");
const CATEGORY_ID: number | null =
  categoryArg !== -1 ? Number(args[categoryArg + 1]) : null;
const limitArg = args.indexOf("--limit");
const LIMIT: number | null =
  limitArg !== -1 ? Number(args[limitArg + 1]) : null;

interface WpPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
}

interface ParsedScholarship {
  name: string;
  provider: string;
  country: string;
  amount: number | null;
  currency: string;
  isFullFunding: boolean;
  deadline: Date | null;
  academicLevels: string[];
  fields: string[];
  description: string;
  requirements: string | null;
  link: string;
  isActive: boolean;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html: string): string {
  const $ = cheerio.load(html);
  return $("body").text().replace(/\s+/g, " ").trim();
}

async function fetchCategories(search = "") {
  const url = new URL(`${API_BASE}/categories`);
  url.searchParams.set("per_page", "100");
  if (search) url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { headers: HEADERS });
  if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
  return res.json() as Promise<Array<{ id: number; name: string; slug: string; count: number }>>;
}

async function fetchPosts(page: number, categoryId?: number, perPage = 100): Promise<WpPost[]> {
  const url = new URL(`${API_BASE}/posts`);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));
  url.searchParams.set("_fields", "id,date,link,title,excerpt,content");
  if (categoryId) url.searchParams.set("categories", String(categoryId));

  const res = await fetch(url.toString(), { headers: HEADERS });
  if (res.status === 400) return [];
  if (!res.ok) throw new Error(`Posts fetch failed: ${res.status}`);
  return res.json() as Promise<WpPost[]>;
}

async function fetchAllPosts(categoryId?: number, limit?: number): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let page = 1;

  console.log(`\nFetching posts${categoryId ? ` (category ${categoryId})` : ""}${limit ? ` (limit: ${limit})` : ""}...`);

  while (true) {
    const perPage = limit ? Math.min(limit - posts.length, 100) : 100;
    const batch = await fetchPosts(page, categoryId, perPage);
    if (batch.length === 0) break;
    posts.push(...batch);
    process.stdout.write(`  Page ${page}: ${batch.length} posts (total: ${posts.length})\r`);
    if (limit && posts.length >= limit) break;
    page++;
    await sleep(DELAY_MS);
  }

  console.log(`\nFetched ${posts.length} posts total.`);
  return posts;
}

const LEVEL_MAP: Record<string, string[]> = {
  BACHELOR:  ["bachelor", "undergraduate", "licence", "bsc", "b.sc", "b.a."],
  MASTER:    ["master", "msc", "m.sc", "mba", "postgraduate", "graduate"],
  DOCTORAT:  ["phd", "doctorate", "doctoral", "d.phil"],
  FELLOWSHIP:["fellowship", "professional", "vocational", "training"],
  SECONDARY: ["high school", "secondary", "terminale"],
};

const FIELD_MAP: Record<string, string[]> = {
  "Sciences":          ["science", "stem", "biology", "chemistry", "physics", "mathematics"],
  "Ingénierie":        ["engineering", "computer science", "technology", "it "],
  "Médecine":          ["medicine", "medical", "health", "nursing", "pharmacy"],
  "Droit":             ["law", "legal", "jurisprudence"],
  "Commerce":          ["business", "economics", "finance", "management", "mba"],
  "Arts":              ["art", "design", "music", "architecture", "creative"],
  "Sciences Sociales": ["social", "sociology", "psychology", "political science"],
  "Environnement":     ["environment", "climate", "sustainability", "agriculture"],
};

const KNOWN_COUNTRIES = [
  "USA", "United States", "UK", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Netherlands", "Sweden", "Norway", "Denmark",
  "Japan", "China", "South Korea", "Singapore", "New Zealand",
  "Switzerland", "Austria", "Belgium", "Italy", "Spain",
  "Turkey", "Egypt", "South Africa", "Kenya", "Ghana",
];

function extractName(rawTitle: string): string {
  return stripHtml(rawTitle).replace(/\s+\d{4}.*$/, "").trim();
}

function extractProvider(text: string, title: string): string {
  const byMatch = text.match(
    /(?:offered|funded|provided|sponsored|supported)\s+by[:\s]+([A-Z][^\n.]{3,60})/i
  );
  if (byMatch) return byMatch[1].trim();

  const titleMatch = title.match(/^(.+?)\s+Scholarship/i);
  if (titleMatch) return titleMatch[1].trim();

  return "ScholarshipRegion";
}

function extractCountry(text: string): string {
  for (const country of KNOWN_COUNTRIES) {
    const pattern = new RegExp(
      `(?:study|held|based|located|hosted|available)\\s+in\\s+${country}|in\\s+${country}\\s+for`,
      "i"
    );
    if (pattern.test(text)) return country;
  }
  const m = text.match(/[Ss]tudy in ([A-Z][a-zA-Z\s]{2,30})(?:[,.]|\s(?:for|and|with))/);
  if (m) return m[1].trim();
  return "International";
}

function extractAmount(text: string): { amount: number | null; currency: string; isFullFunding: boolean } {
  if (/fully\s+funded/i.test(text)) {
    return { amount: null, currency: "USD", isFullFunding: true };
  }

  const match = text.match(/([\$€£])\s?([\d,]+(?:\.\d{2})?)/);
  if (match) {
    const symbolMap: Record<string, string> = { "$": "USD", "€": "EUR", "£": "GBP" };
    return {
      amount: parseFloat(match[2].replace(/,/g, "")),
      currency: symbolMap[match[1]] ?? "USD",
      isFullFunding: false,
    };
  }

  const wordMatch = text.match(/(\d[\d,]+)\s*(USD|EUR|GBP)/i);
  if (wordMatch) {
    return {
      amount: parseFloat(wordMatch[1].replace(/,/g, "")),
      currency: wordMatch[2].toUpperCase(),
      isFullFunding: false,
    };
  }

  return { amount: null, currency: "USD", isFullFunding: false };
}

function extractDeadline(text: string): Date | null {
  const patterns = [
    /[Dd]eadline[:\s]+([A-Z][a-z]+ \d{1,2},?\s*\d{4})/,
    /[Dd]eadline[:\s]+(\d{1,2} [A-Z][a-z]+ \d{4})/,
    /[Cc]losing [Dd]ate[:\s]+([A-Z][a-z]+ \d{1,2},?\s*\d{4})/,
    /[Aa]pplication [Dd]eadline[:\s]+([A-Z][a-z]+ \d{1,2},?\s*\d{4})/,
    /([A-Z][a-z]+ \d{1,2},?\s*20\d{2})/,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      const d = new Date(m[1].replace(",", ""));
      if (!isNaN(d.getTime())) return d;
    }
  }
  return null;
}

function extractLevels(text: string): string[] {
  const t = text.toLowerCase();
  const found = Object.entries(LEVEL_MAP)
    .filter(([, kws]) => kws.some((kw) => t.includes(kw)))
    .map(([level]) => level);
  return found.length ? found : ["BACHELOR"];
}

function extractFields(text: string): string[] {
  const t = text.toLowerCase();
  return Object.entries(FIELD_MAP)
    .filter(([, kws]) => kws.some((kw) => t.includes(kw)))
    .map(([field]) => field);
}

function extractRequirements(html: string): string | null {
  const $ = cheerio.load(html);
  const headings = $("h2, h3, h4, strong");
  let requirements: string | null = null;

  headings.each((_, el) => {
    const text = $(el).text().toLowerCase();
    if (/eligib|requirement|who can apply|criteria/i.test(text)) {
      const nextContent = $(el).nextUntil("h2, h3, h4").text().replace(/\s+/g, " ").trim();
      if (nextContent.length > 20) {
        requirements = nextContent;
        return false;
      }
    }
  });

  return requirements;
}

function parsePost(post: WpPost): ParsedScholarship {
  const titleRaw = post.title.rendered;
  const contentHtml = post.content.rendered;
  const excerptHtml = post.excerpt.rendered;

  const title = stripHtml(titleRaw);
  const contentText = stripHtml(contentHtml);
  const excerpt = stripHtml(excerptHtml);
  const combined = `${title} ${contentText}`;

  const { amount, currency, isFullFunding } = extractAmount(combined);

  return {
    name: extractName(titleRaw),
    provider: extractProvider(contentText, title),
    country: extractCountry(combined),
    amount,
    currency,
    isFullFunding,
    deadline: extractDeadline(combined),
    academicLevels: extractLevels(combined),
    fields: extractFields(combined),
    description: excerpt || contentText.slice(0, 500),
    requirements: extractRequirements(contentHtml),
    link: post.link,
    isActive: true,
  };
}

async function upsertScholarship(
  prisma: PrismaClient,
  data: ParsedScholarship
): Promise<"created" | "updated"> {
  const existing = await prisma.scholarship.findFirst({
    where: { link: data.link },
    select: { id: true },
  });

  if (existing) {
    await prisma.scholarship.update({ where: { id: existing.id }, data });
    return "updated";
  }

  await prisma.scholarship.create({ data });
  return "created";
}

async function main() {
  console.log("=== Mibegnon Scholarship Scraper ===");
  if (DRY_RUN) console.log("DRY RUN — nothing will be written to the DB.\n");

  if (args.includes("--list-categories")) {
    const cats = await fetchCategories("scholarships");
    console.log("\nAvailable categories:");
    for (const c of cats) {
      console.log(`  [${c.id}]  ${c.name.padEnd(45)} ${c.count} posts  /${c.slug}`);
    }
    return;
  }

  const prisma = DRY_RUN ? null : new PrismaClient();

  try {
    const posts = await fetchAllPosts(CATEGORY_ID ?? undefined, LIMIT ?? undefined);
    console.log(`\nParsing ${posts.length} posts...\n`);

    let created = 0;
    let updated = 0;
    let failed = 0;

    for (const post of posts) {
      try {
        const parsed = parsePost(post);

        if (DRY_RUN) {
          console.log(`[DRY] ${parsed.name}`);
          console.log(`      Provider: ${parsed.provider}`);
          console.log(`      Country:  ${parsed.country}`);
          console.log(`      Amount:   ${parsed.isFullFunding ? "Fully Funded" : parsed.amount ?? "N/A"} ${parsed.currency}`);
          console.log(`      Deadline: ${parsed.deadline?.toDateString() ?? "N/A"}`);
          console.log(`      Levels:   ${parsed.academicLevels.join(", ")}`);
          console.log(`      Fields:   ${parsed.fields.join(", ") || "—"}`);
          console.log();
        } else {
          const result = await upsertScholarship(prisma!, parsed);
          if (result === "created") created++;
          else updated++;
          process.stdout.write(`  ✓ [${result}] ${parsed.name.slice(0, 60)}\n`);
          await sleep(100);
        }
      } catch (err) {
        failed++;
        console.error(`  ✗ Failed post ${post.id}: ${(err as Error).message}`);
      }
    }

    if (!DRY_RUN) {
      console.log(`\n Done.`);
      console.log(`  Created: ${created}`);
      console.log(`  Updated: ${updated}`);
      console.log(`  Failed:  ${failed}`);
    }
  } finally {
    await prisma?.$disconnect();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

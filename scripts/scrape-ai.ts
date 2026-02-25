/**
 * scripts/scrape-ai.ts
 *
 * Usage:
 *   npx tsx scripts/scrape-ai.ts
 *   npx tsx scripts/scrape-ai.ts --limit 10 --dry-run
 *   npx tsx scripts/scrape-ai.ts --category 42
 *   npx tsx scripts/scrape-ai.ts --list-categories
 */

import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL  = "https://www.scholarshipregion.com";
const API_BASE  = `${BASE_URL}/wp-json/wp/v2`;
const DELAY_MS  = 500;
const AI_MODEL  = "claude-haiku-4-5-20251001";

const HEADERS: Record<string, string> = {
  "User-Agent": "Mozilla/5.0 (compatible; MibegnonBot/1.0)",
  Accept: "application/json",
};

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args         = process.argv.slice(2);
const DRY_RUN      = args.includes("--dry-run");
const categoryArg  = args.indexOf("--category");
const CATEGORY_ID  = categoryArg !== -1 ? Number(args[categoryArg + 1]) : null;
const limitArg     = args.indexOf("--limit");
const LIMIT        = limitArg !== -1 ? Number(args[limitArg + 1]) : null;

// ─── Types ────────────────────────────────────────────────────────────────────

interface WpPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
}

interface ScholarshipExtraction {
  isScholarship: boolean;
  name: string;
  provider: string;
  country: string;
  amount: number | null;
  currency: string;
  isFullFunding: boolean;
  deadline: string | null;
  academicLevels: string[];
  fields: string[];
  description: string;
  requirements: string | null;
  applyLink: string | null;
}

// ─── Tool schema ──────────────────────────────────────────────────────────────

const EXTRACT_TOOL: Anthropic.Tool = {
  name: "extract_scholarship",
  description:
    "Analyse a blog post and determine if it is a scholarship/grant/internship opportunity. " +
    "If it is, extract all structured details. If it is a news story, motivational post, " +
    "or advertisement, set isScholarship to false and leave all other fields empty.",
  input_schema: {
    type: "object" as const,
    required: ["isScholarship"],
    properties: {
      isScholarship: {
        type: "boolean",
        description: "True only if this post describes an actual scholarship, grant, fellowship, or internship opportunity.",
      },
      name: {
        type: "string",
        description: "Clean scholarship name without the year. E.g. 'Gates Cambridge Scholarship'.",
      },
      provider: {
        type: "string",
        description: "Organisation or institution offering the scholarship. E.g. 'Gates Foundation', 'DAAD'.",
      },
      country: {
        type: "string",
        description: "Country where the study/work takes place. E.g. 'Germany', 'USA'. Use 'International' if open to multiple countries.",
      },
      amount: {
        type: "number",
        description: "Numeric value of the award in the given currency. Null if unknown or fully funded.",
      },
      currency: {
        type: "string",
        description: "ISO currency code: USD, EUR, GBP, etc. Default USD.",
      },
      isFullFunding: {
        type: "boolean",
        description: "True if the scholarship is described as 'fully funded'.",
      },
      deadline: {
        type: "string",
        description: "Application deadline as an ISO 8601 date string (YYYY-MM-DD). Null if not found.",
      },
      academicLevels: {
        type: "array",
        items: { type: "string" },
        description: "Academic levels targeted. Use values from: BACHELOR, MASTER, DOCTORAT, FELLOWSHIP, SECONDARY.",
      },
      fields: {
        type: "array",
        items: { type: "string" },
        description: "Fields of study in French. E.g. ['Sciences', 'Ingénierie', 'Médecine', 'Droit', 'Commerce', 'Arts', 'Sciences Sociales', 'Environnement'].",
      },
      description: {
        type: "string",
        description: "2–4 sentence summary of the scholarship opportunity.",
      },
      requirements: {
        type: "string",
        description: "Eligibility criteria and requirements, if mentioned.",
      },
      applyLink: {
        type: "string",
        description: "The direct URL to the official scholarship application page, if present in the article.",
      },
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html: string): string {
  const $ = cheerio.load(html);
  return $("body").text().replace(/\s+/g, " ").trim();
}

function truncate(text: string, maxChars = 6000): string {
  return text.length > maxChars ? text.slice(0, maxChars) + "…" : text;
}

// ─── WP API ───────────────────────────────────────────────────────────────────

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

  console.log(`\nFetched ${posts.length} posts total.\n`);
  return posts;
}

// ─── AI extraction ────────────────────────────────────────────────────────────

async function extractWithClaude(
  client: Anthropic,
  post: WpPost
): Promise<ScholarshipExtraction | null> {
  const title   = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const body    = truncate(stripHtml(post.content.rendered));

  const response = await client.messages.create({
    model: AI_MODEL,
    max_tokens: 1024,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: "any" },
    messages: [
      {
        role: "user",
        content: `Analyse this blog post and extract scholarship details.\n\nTITLE: ${title}\n\nEXCERPT: ${excerpt}\n\nBODY:\n${body}`,
      },
    ],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") return null;

  const raw = toolUse.input as ScholarshipExtraction;
  return {
    ...raw,
    academicLevels: raw.academicLevels ?? [],
    fields:         raw.fields ?? [],
  };
}

// ─── DB upsert ────────────────────────────────────────────────────────────────

async function upsertScholarship(
  prisma: PrismaClient,
  data: ScholarshipExtraction,
  sourceLink: string
): Promise<"created" | "updated"> {
  const deadline = data.deadline ? new Date(data.deadline) : null;
  const link     = data.applyLink ?? sourceLink;

  const payload = {
    name:           data.name,
    provider:       data.provider,
    country:        data.country,
    amount:         data.amount,
    currency:       data.currency ?? "USD",
    isFullFunding:  data.isFullFunding,
    deadline:       deadline && !isNaN(deadline.getTime()) ? deadline : null,
    academicLevels: data.academicLevels,
    fields:         data.fields,
    description:    data.description,
    requirements:   data.requirements,
    link,
    isActive:       true,
  };

  const existing = await prisma.scholarship.findFirst({
    where: { link },
    select: { id: true },
  });

  if (existing) {
    await prisma.scholarship.update({ where: { id: existing.id }, data: payload });
    return "updated";
  }

  await prisma.scholarship.create({ data: payload });
  return "created";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Mibegnon AI Scholarship Scraper ===");
  if (DRY_RUN) console.log("DRY RUN — nothing will be written to the DB.\n");

  if (args.includes("--list-categories")) {
    const cats = await fetchCategories("scholarships");
    console.log("\nAvailable categories:");
    for (const c of cats) {
      console.log(`  [${c.id}]  ${c.name.padEnd(45)} ${c.count} posts  /${c.slug}`);
    }
    return;
  }

  const claude = new Anthropic();
  const prisma = DRY_RUN ? null : new PrismaClient();

  try {
    const posts = await fetchAllPosts(CATEGORY_ID ?? undefined, LIMIT ?? undefined);

    let scholarships = 0;
    let skipped      = 0;
    let created      = 0;
    let updated      = 0;
    let failed       = 0;

    for (const post of posts) {
      try {
        const result = await extractWithClaude(claude, post);

        if (!result || !result.isScholarship) {
          skipped++;
          console.log(`  — [skip] ${stripHtml(post.title.rendered).slice(0, 70)}`);
          await sleep(200);
          continue;
        }

        scholarships++;

        if (DRY_RUN) {
          console.log(`\n[DRY] ${result.name}`);
          console.log(`      Provider:   ${result.provider}`);
          console.log(`      Country:    ${result.country}`);
          console.log(`      Funding:    ${result.isFullFunding ? "Fully Funded" : result.amount ? `${result.amount} ${result.currency}` : "N/A"}`);
          console.log(`      Deadline:   ${result.deadline ?? "N/A"}`);
          console.log(`      Levels:     ${result.academicLevels.join(", ")}`);
          console.log(`      Fields:     ${result.fields.join(", ") || "—"}`);
          console.log(`      Apply link: ${result.applyLink ?? "(none found)"}`);
          console.log(`      Desc:       ${result.description?.slice(0, 120)}…`);
        } else {
          const action = await upsertScholarship(prisma!, result, post.link);
          if (action === "created") created++;
          else updated++;
          console.log(`  ✓ [${action}] ${result.name.slice(0, 60)}`);
        }

        await sleep(200);
      } catch (err) {
        failed++;
        console.error(`  ✗ Failed post ${post.id}: ${(err as Error).message}`);
      }
    }

    console.log(`\n${"─".repeat(40)}`);
    console.log(`  Scholarships found: ${scholarships}`);
    console.log(`  Skipped (not scholarships): ${skipped}`);
    if (!DRY_RUN) {
      console.log(`  Created: ${created}`);
      console.log(`  Updated: ${updated}`);
    }
    if (failed) console.log(`  Failed:  ${failed}`);
  } finally {
    await prisma?.$disconnect();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

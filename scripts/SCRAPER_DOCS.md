# Mibegnon Scholarship Scraper — Documentation

## Overview

This pipeline scrapes scholarships from ScholarshipRegion.com, uses Claude AI to extract structured data, and stores everything in the Mibegnon PostgreSQL database via Prisma. There are two versions of the scraper:

| Script | Extraction method |
|--------|------------------|
| `scrape.ts` | Regex-based (fast, less accurate) |
| `scrape-ai.ts` | Claude AI (accurate, filters noise) |

The AI version is recommended for production use.

---

## Why AI instead of regex?

ScholarshipRegion.com is a blog that mixes real scholarship listings with motivational stories, news articles, and advertisements. A regex cannot reliably tell the difference between:

- "DAAD Research Grants in Germany" → real scholarship
- "This farmer graduated at 69 and earned a master's degree" → news story
- "How this lady proved everyone wrong with a 4.71 GPA" → motivational post

The AI version solves this by sending each article to Claude, which reads it like a human and decides: *Is this actually a scholarship? If yes, extract the details.*

It also solves extraction problems that regex cannot handle cleanly, such as:
- Finding the real **application link** buried in the article body
- Distinguishing a **provider** ("Gates Foundation") from noise
- Parsing **deadlines** written in many different formats
- Avoiding false positives like detecting "fully funded" in a news headline

---

## Architecture

```
ScholarshipRegion.com
       │
       │  WordPress REST API
       │  (JSON — no HTML scraping needed for fetching)
       ▼
  fetchAllPosts()
       │
       │  Raw WordPress post objects
       │  { id, title, excerpt, content (HTML), link }
       ▼
  stripHtml()  ←  cheerio (HTML → plain text)
       │
       │  Clean text per post
       ▼
  extractWithClaude()
       │
       │  Sends title + excerpt + body to Claude Haiku
       │  Uses Tool Use to force structured JSON output
       ▼
  ScholarshipExtraction
       │
       │  { isScholarship, name, provider, country,
       │    amount, currency, isFullFunding, deadline,
       │    academicLevels, fields, description,
       │    requirements, applyLink }
       │
       ├──  isScholarship = false  →  skip
       │
       └──  isScholarship = true
                  │
                  ▼
           upsertScholarship()
                  │
                  │  Prisma upsert (safe to re-run)
                  ▼
           PostgreSQL (Supabase)
           scholarships table
```

---

## Key concepts

### WordPress REST API

ScholarshipRegion runs on WordPress, which exposes a built-in REST API at:

```
https://www.scholarshipregion.com/wp-json/wp/v2/posts
```

This returns structured JSON for every post — title, content, date, URL — without any HTML scraping. Parameters used:

| Parameter | Purpose |
|-----------|---------|
| `per_page` | Number of posts per page (max 100) |
| `page` | Page number for pagination |
| `categories` | Filter by category ID |
| `_fields` | Only return specific fields (reduces payload size) |

### Tool Use (Structured Output)

Instead of asking Claude to return free text and then parsing it, we use the **Tool Use** feature of the Anthropic API. This forces Claude to return a strictly typed JSON object that matches a schema we define.

The schema is defined as `EXTRACT_TOOL` in the script. It tells Claude exactly what fields to return, their types, and what each field means. Claude cannot return anything outside this schema.

This is equivalent to asking: *"Fill out this form"* instead of *"Write me an essay and I'll extract the data myself."*

```
We define:  extract_scholarship({ isScholarship, name, provider, ... })
Claude returns:  { isScholarship: true, name: "DAAD Research Grant", provider: "DAAD", ... }
```

### Cheerio

Cheerio is a Node.js library for parsing HTML, equivalent to Python's BeautifulSoup. We use it for one job: stripping HTML tags from the WordPress `content.rendered` field to get clean plain text before sending it to Claude.

### Prisma Upsert

The database write uses `upsert`, which means:
- If a scholarship with this link already exists → **update** it
- If it does not exist → **create** it

This makes the scraper safe to re-run at any time without creating duplicates. The unique key is the `link` field (the scholarship's application URL).

---

## Setup

### 1. Environment variables

Add your Anthropic API key to `.env` (the file already exists at the project root):

```
ANTHROPIC_API_KEY=sk-ant-...
```

The Anthropic SDK automatically reads `ANTHROPIC_API_KEY` from the environment.

### 2. Install dependencies

```bash
npm install
```

Dependencies added by this pipeline:

| Package | Purpose |
|---------|---------|
| `@anthropic-ai/sdk` | Claude API client |
| `cheerio` | HTML → plain text |
| `tsx` | Run TypeScript files directly without compiling |

---

## Running the scraper

### Discover categories

Before scraping, list the available categories to find the IDs you want:

```bash
npm run scrape:ai:categories
```

Output example:
```
  [  3]  Scholarships                              412 posts  /scholarships
  [ 12]  Masters Scholarships                       87 posts  /masters-scholarships
  [ 19]  Scholarships in Africa                     54 posts  /scholarships-in-africa
```

### Dry run (test without writing to DB)

Always run this first to check what Claude extracts before touching the database:

```bash
npm run scrape:ai:dry
```

This fetches 10 posts, runs them through Claude, and prints the results. Nothing is written to the database.

To test more posts:

```bash
npx tsx scripts/scrape-ai.ts --dry-run --limit 50
```

### Filter by category

```bash
npx tsx scripts/scrape-ai.ts --dry-run --limit 10 --category 12
```

### Full run (writes to DB)

```bash
npm run scrape:ai
```

To run only a specific category:

```bash
npx tsx scripts/scrape-ai.ts --category 12
```

---

## Output fields mapped to the Prisma schema

| Extracted field | Prisma column | Notes |
|----------------|--------------|-------|
| `name` | `name` | Title without year |
| `provider` | `provider` | Offering organisation |
| `country` | `country` | Host country |
| `amount` | `amount` | Float or null |
| `currency` | `currency` | ISO code, default USD |
| `isFullFunding` | `isFullFunding` | Boolean |
| `deadline` | `deadline` | DateTime or null |
| `academicLevels` | `academicLevels` | String array |
| `fields` | `fields` | String array (French labels) |
| `description` | `description` | 2–4 sentence summary |
| `requirements` | `requirements` | Eligibility text |
| `applyLink` | `link` | Official application URL |

---

## Cost estimate

The scraper uses **Claude Haiku**, the fastest and cheapest model in the Claude family.

Each post sends roughly 2,000–4,000 tokens (title + excerpt + body) and receives ~300 tokens back.

| Volume | Estimated cost |
|--------|---------------|
| 10 posts (dry run) | ~$0.002 |
| 100 posts | ~$0.02 |
| 500 posts (full site) | ~$0.10 |

---

## Using the data in the Next.js app

Once the database is populated, replace mock data calls with real Prisma queries.

Example — fetching scholarships for the `/bourses` page:

```ts
// lib/actions/scholarships.ts
import { prisma } from "@/lib/prisma";

export async function getScholarships(filters?: {
  level?: string;
  field?: string;
  query?: string;
}) {
  return prisma.scholarship.findMany({
    where: {
      isActive: true,
      ...(filters?.level && { academicLevels: { has: filters.level } }),
      ...(filters?.field  && { fields: { has: filters.field } }),
      ...(filters?.query  && {
        name: { contains: filters.query, mode: "insensitive" },
      }),
    },
    orderBy: { deadline: "asc" },
  });
}
```

---

## Re-running and keeping data fresh

The scraper is idempotent — re-running it updates existing records and adds new ones without duplicates. A simple strategy for keeping data fresh:

1. Run `npm run scrape:ai` manually whenever you want to refresh
2. Or schedule it as a cron job (e.g. weekly) using a service like GitHub Actions or Vercel Cron

---

## Files

```
scripts/
  scrape.ts        — original regex-based scraper (reference)
  scrape-ai.ts     — AI-powered scraper (production)
  SCRAPER_DOCS.md  — this document
```

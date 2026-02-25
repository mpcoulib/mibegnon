/**
 * scripts/translate-scholarships.ts
 *
 * Translates all scholarships in the DB to French and determines Ivorian eligibility.
 *
 * Usage:
 *   npx tsx scripts/translate-scholarships.ts
 *   npx tsx scripts/translate-scholarships.ts --limit 10
 *   npx tsx scripts/translate-scholarships.ts --dry-run
 */

import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const limitArg = args.indexOf("--limit");
const LIMIT = limitArg !== -1 ? Number(args[limitArg + 1]) : null;
const DELAY_MS = 1200;

const FRENCH_COUNTRIES: Record<string, string> = {
  "Germany": "Allemagne", "United Kingdom": "Royaume-Uni", "UK": "Royaume-Uni",
  "United States": "États-Unis", "USA": "États-Unis", "US": "États-Unis",
  "Australia": "Australie", "Japan": "Japon", "China": "Chine",
  "South Korea": "Corée du Sud", "Korea": "Corée du Sud",
  "Turkey": "Turquie", "Netherlands": "Pays-Bas", "Sweden": "Suède",
  "Norway": "Norvège", "Denmark": "Danemark", "Belgium": "Belgique",
  "Italy": "Italie", "Spain": "Espagne", "Brazil": "Brésil",
  "South Africa": "Afrique du Sud", "Egypt": "Égypte",
  "Ethiopia": "Éthiopie", "Cameroon": "Cameroun", "Ivory Coast": "Côte d'Ivoire",
  "Morocco": "Maroc", "Saudi Arabia": "Arabie Saoudite",
  "Thailand": "Thaïlande", "Malaysia": "Malaisie", "Singapore": "Singapour",
  "Indonesia": "Indonésie", "New Zealand": "Nouvelle-Zélande",
  "India": "Inde", "Greece": "Grèce", "Lebanon": "Liban",
};

const TRANSLATE_TOOL: Anthropic.Tool = {
  name: "translate_scholarship",
  description:
    "Translate a scholarship's details to French and determine if students from Côte d'Ivoire (Ivory Coast) are eligible.",
  input_schema: {
    type: "object" as const,
    required: ["name", "description", "ivoirianEligible"],
    properties: {
      name: {
        type: "string",
        description:
          "Scholarship name translated to French. Keep proper nouns (organization names, universities) as-is. Translate generic words like 'Scholarship' → 'Bourse', 'Fellowship' → 'Fellowship', 'Grant' → 'Bourse', 'Program' → 'Programme', 'Award' → 'Prix'.",
      },
      description: {
        type: "string",
        description:
          "Description translated to fluent, natural French. Not a word-for-word translation — write it as if a French speaker wrote it originally. 2-4 sentences maximum. Use appropriate French academic vocabulary.",
      },
      requirements: {
        type: "string",
        description:
          "Requirements translated to natural French. If null or empty, return null.",
      },
      ivoirianEligible: {
        type: "boolean",
        description:
          "True if students from Côte d'Ivoire (Ivory Coast) are likely eligible. False ONLY if the scholarship explicitly restricts to specific countries that exclude Côte d'Ivoire (e.g., Nigeria-only programs mentioning NYSC, JAMB, NIN; scholarships requiring specific citizenship like 'must be a Nigerian citizen'). If open to 'African students', 'Sub-Saharan Africa', 'developing countries', or 'international students' → true.",
      },
    },
  },
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateScholarship(
  client: Anthropic,
  scholarship: { name: string; description: string; requirements: string | null }
) {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    tools: [TRANSLATE_TOOL],
    tool_choice: { type: "any" },
    messages: [
      {
        role: "user",
        content: `Translate this scholarship to French and check Ivorian eligibility.\n\nNAME: ${scholarship.name}\n\nDESCRIPTION: ${scholarship.description}\n\nREQUIREMENTS: ${scholarship.requirements ?? "N/A"}`,
      },
    ],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") return null;

  return toolUse.input as {
    name: string;
    description: string;
    requirements: string | null;
    ivoirianEligible: boolean;
  };
}

async function main() {
  console.log("=== Mibegnon Scholarship Translator ===");
  if (DRY_RUN) console.log("DRY RUN — nothing will be written to the DB.\n");

  const client = new Anthropic();
  const prisma = new PrismaClient();

  try {
    const scholarships = await prisma.scholarship.findMany({
      select: { id: true, name: true, description: true, requirements: true, country: true },
      take: LIMIT ?? undefined,
      orderBy: { createdAt: "asc" },
    });

    console.log(`\nTranslating ${scholarships.length} scholarships...\n`);

    let translated = 0;
    let failed = 0;
    let ivoirianIneligible = 0;

    for (const s of scholarships) {
      try {
        const result = await translateScholarship(client, s);
        if (!result) {
          failed++;
          console.log(`  ✗ [skip] ${s.name.slice(0, 60)}`);
          await sleep(DELAY_MS);
          continue;
        }

        const frenchCountry = FRENCH_COUNTRIES[s.country] ?? s.country;
        if (!result.ivoirianEligible) ivoirianIneligible++;

        if (DRY_RUN) {
          console.log(`\n[DRY] ${s.name}`);
          console.log(`  → ${result.name}`);
          console.log(`  Pays: ${frenchCountry}`);
          console.log(`  Ivoiriens: ${result.ivoirianEligible ? "✓ éligibles" : "✗ non éligibles"}`);
          console.log(`  Desc: ${result.description.slice(0, 100)}…`);
        } else {
          await prisma.scholarship.update({
            where: { id: s.id },
            data: {
              name: result.name,
              description: result.description,
              requirements: result.requirements ?? null,
              country: frenchCountry,
              ivoirianEligible: result.ivoirianEligible,
            },
          });
          translated++;
          console.log(`  ✓ ${result.name.slice(0, 65)} [${result.ivoirianEligible ? "✓ CI" : "✗ CI"}]`);
        }

        await sleep(DELAY_MS);
      } catch (err) {
        failed++;
        console.error(`  ✗ Failed: ${s.name.slice(0, 50)} — ${(err as Error).message}`);
      }
    }

    console.log(`\n${"─".repeat(45)}`);
    console.log(`  Translated:              ${translated}`);
    console.log(`  Non-eligible for CI:     ${ivoirianIneligible}`);
    if (failed) console.log(`  Failed:                  ${failed}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

/**
 * scripts/translate-scholarships.ts
 *
 * Translates all scholarships in the DB to French and determines Ivorian eligibility.
 * Saves API calls by:
 *   1. Pre-filtering obviously ineligible scholarships with regex (no API call)
 *   2. Translating common study fields with a static map (no API call)
 *
 * commands importants to remember:
 *   npx tsx scripts/translate-scholarships.ts
 *   npx tsx scripts/translate-scholarships.ts --limit 10
 *   npx tsx scripts/translate-scholarships.ts --dry-run
 *   npx tsx scripts/translate-scholarships.ts --force   ← re-translate already translated ones
 */

import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const limitArg = args.indexOf("--limit");
const LIMIT = limitArg !== -1 ? Number(args[limitArg + 1]) : null;
const DELAY_MS = 1200;

// ─── Static lookups (no API cost) ────────────────────────────────────────────

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

const FIELD_TRANSLATIONS: Record<string, string> = {
  "Engineering": "Ingénierie", "Computer Science": "Informatique",
  "Medicine": "Médecine", "Business": "Commerce", "Law": "Droit",
  "Economics": "Économie", "Education": "Éducation",
  "Public Health": "Santé publique", "Social Sciences": "Sciences sociales",
  "Mathematics": "Mathématiques", "Physics": "Physique",
  "Chemistry": "Chimie", "Biology": "Biologie", "Architecture": "Architecture",
  "Finance": "Finance", "Journalism": "Journalisme",
  "Environmental Science": "Sciences de l'environnement",
  "Agriculture": "Agriculture", "Arts": "Arts", "Literature": "Littérature",
  "History": "Histoire", "Philosophy": "Philosophie", "Psychology": "Psychologie",
  "Sociology": "Sociologie", "Political Science": "Sciences politiques",
  "International Relations": "Relations internationales",
  "Communication": "Communication", "Media": "Médias",
  "Information Technology": "Technologies de l'information",
  "Data Science": "Science des données", "Artificial Intelligence": "Intelligence artificielle",
  "Biotechnology": "Biotechnologie", "Pharmacy": "Pharmacie",
  "Nursing": "Sciences infirmières", "Dentistry": "Médecine dentaire",
  "Veterinary Science": "Médecine vétérinaire", "Geology": "Géologie",
  "Geography": "Géographie", "Urban Planning": "Urbanisme",
  "Civil Engineering": "Génie civil", "Electrical Engineering": "Génie électrique",
  "Mechanical Engineering": "Génie mécanique", "Chemical Engineering": "Génie chimique",
  "Aerospace Engineering": "Génie aérospatial", "Marine Science": "Sciences marines",
  "Energy": "Énergie", "Climate Change": "Changement climatique",
  "Development Studies": "Études du développement", "Gender Studies": "Études de genre",
  "Accounting": "Comptabilité", "Management": "Management",
  "Marketing": "Marketing", "Entrepreneurship": "Entrepreneuriat",
  "Humanities": "Sciences humaines", "Natural Sciences": "Sciences naturelles",
  "Life Sciences": "Sciences de la vie", "Health Sciences": "Sciences de la santé",
  "Security Studies": "Études sécuritaires", "Cybersecurity": "Cybersécurité",
  "Statistics": "Statistiques", "Linguistics": "Linguistique",
  "Anthropology": "Anthropologie", "Archaeology": "Archéologie",
  "Fine Arts": "Beaux-Arts", "Music": "Musique", "Design": "Design",
  "Film": "Cinéma", "Theater": "Théâtre", "Sports": "Sports",
  "Tourism": "Tourisme", "Hospitality": "Hôtellerie",
  "Supply Chain": "Chaîne d'approvisionnement", "Logistics": "Logistique",
};

// Patterns that confirm a scholarship is restricted to a specific country
// that is NOT Côte d'Ivoire — no need to call the API for these.
const INELIGIBLE_PATTERNS = [
  // Nigeria-specific IDs and programs
  /\b(NYSC|JAMB|NIN|BVN|WAEC|NECO|NPC)\b/,
  // Explicit citizenship restrictions for other countries
  /\b(nigerian|kenyan|ghanaian|south african|egyptian|ethiopian|ugandan|tanzanian|rwandan|zambian|zimbabwean)\s+(nationals?|citizens?|passport holders?)\b/i,
  /must\s+be\s+a?\s+(nigerian|kenyan|ghanaian|south african|ugandan|tanzanian|rwandan)\b/i,
  /only\s+(open\s+)?for\s+(nigerian|kenyan|ghanaian|south african)\b/i,
  /exclusively\s+(for|available\s+to)\s+(nigerian|kenyan|ghanaian)\b/i,
  /restricted\s+to\s+(nigerian|kenyan|ghanaian)\b/i,
  // Kenya-specific programs
  /\bNHIF\b/,
  // India-specific
  /\b(AICTE|UGC|GATE exam)\b/,
];

function isObviouslyIneligible(text: string): boolean {
  return INELIGIBLE_PATTERNS.some((p) => p.test(text));
}

function translateFieldsStatically(fields: string[]): { result: string[]; hasUnknown: boolean } {
  const result = fields.map((f) => FIELD_TRANSLATIONS[f] ?? f);
  const hasUnknown = fields.some((f) => !FIELD_TRANSLATIONS[f]);
  return { result, hasUnknown };
}

// ─── Anthropic tool (only called when needed) ─────────────────────────────────

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
      unknownFields: {
        type: "array",
        items: { type: "string" },
        description:
          "Translate each study field to French. Only fields that couldn't be translated with a static map are sent here.",
      },
      ivoirianEligible: {
        type: "boolean",
        description:
          "Carefully read the name, description, and requirements to determine if students from Côte d'Ivoire (Ivory Coast) are likely eligible. Return false if ANY of these apply: the scholarship mentions country-specific programs or IDs (e.g., NYSC, JAMB, NIN, BVN — Nigerian; NHIF — Kenyan), it explicitly requires citizenship of a specific country that excludes Côte d'Ivoire, or it targets residents of a single country that excludes Côte d'Ivoire. Return true if open to 'African students', 'Sub-Saharan Africa', 'developing countries', 'international students', or if no geographic restriction is mentioned.",
      },
    },
  },
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateScholarship(
  client: Anthropic,
  scholarship: { name: string; description: string; requirements: string | null },
  unknownFields: string[]
) {
  const fieldsLine = unknownFields.length > 0
    ? `\n\nUNKNOWN FIELDS TO TRANSLATE: ${unknownFields.join(", ")}`
    : "";

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    tools: [TRANSLATE_TOOL],
    tool_choice: { type: "any" },
    messages: [
      {
        role: "user",
        content: `Translate this scholarship to French and check Ivorian eligibility.\n\nNAME: ${scholarship.name}\n\nDESCRIPTION: ${scholarship.description}\n\nREQUIREMENTS: ${scholarship.requirements ?? "N/A"}${fieldsLine}`,
      },
    ],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") return null;

  return toolUse.input as {
    name: string;
    description: string;
    requirements: string | null;
    unknownFields?: string[];
    ivoirianEligible: boolean;
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Mibegnon Scholarship Translator ===");
  if (DRY_RUN) console.log("DRY RUN — nothing will be written to the DB.\n");
  if (FORCE) console.log("FORCE — re-translating already translated scholarships.\n");

  const client = new Anthropic();
  const prisma = new PrismaClient();

  try {
    const scholarships = await prisma.scholarship.findMany({
      where: FORCE ? { ivoirianEligible: true } : { isTranslated: false, ivoirianEligible: true },
      select: { id: true, name: true, description: true, requirements: true, country: true, fields: true },
      take: LIMIT ?? undefined,
      orderBy: { createdAt: "asc" },
    });

    console.log(`\n${scholarships.length} scholarship(s) to process...\n`);

    let translated = 0;
    let skippedIneligible = 0;
    let failed = 0;

    for (const s of scholarships) {
      try {
        const fullText = `${s.name} ${s.description} ${s.requirements ?? ""}`;
        const frenchCountry = FRENCH_COUNTRIES[s.country] ?? s.country;
        const { result: translatedFields, hasUnknown } = translateFieldsStatically(s.fields);

        // ── Pre-filter: no API call needed ──
        if (isObviouslyIneligible(fullText)) {
          skippedIneligible++;
          if (DRY_RUN) {
            console.log(`  [DRY/skip] ${s.name.slice(0, 65)} → ✗ CI (regex)`);
          } else {
            await prisma.scholarship.update({
              where: { id: s.id },
              data: {
                country: frenchCountry,
                fields: translatedFields,
                ivoirianEligible: false,
                isTranslated: true,
              },
            });
            console.log(`  ⚡ ${s.name.slice(0, 65)} [✗ CI — regex, no API call]`);
          }
          continue;
        }

        // ── API call for translation + eligibility ──
        const unknownFields = hasUnknown
          ? s.fields.filter((f) => !FIELD_TRANSLATIONS[f])
          : [];

        const result = await translateScholarship(client, s, unknownFields);
        if (!result) {
          failed++;
          console.log(`  ✗ [skip] ${s.name.slice(0, 60)}`);
          await sleep(DELAY_MS);
          continue;
        }

        // Merge: static translations + any unknown ones Claude translated
        const finalFields = s.fields.map((f) => {
          if (FIELD_TRANSLATIONS[f]) return FIELD_TRANSLATIONS[f];
          const idx = unknownFields.indexOf(f);
          return result.unknownFields?.[idx] ?? f;
        });

        if (DRY_RUN) {
          console.log(`\n[DRY] ${s.name}`);
          console.log(`  → ${result.name}`);
          console.log(`  Pays: ${frenchCountry}`);
          console.log(`  Filières: ${finalFields.join(", ") || "—"}`);
          console.log(`  Ivoiriens: ${result.ivoirianEligible ? "✓ éligibles" : "✗ non éligibles"}`);
          console.log(`  Desc: ${result.description.slice(0, 100)}…`);
        } else {
          await prisma.scholarship.update({
            where: { id: s.id },
            data: {
              name: result.name,
              description: result.description,
              requirements: result.requirements ?? null,
              fields: finalFields,
              country: frenchCountry,
              ivoirianEligible: result.ivoirianEligible,
              isTranslated: true,
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
    console.log(`  Translated (API):        ${translated}`);
    console.log(`  Skipped ineligible:      ${skippedIneligible} (no API cost)`);
    if (failed) console.log(`  Failed:                  ${failed}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

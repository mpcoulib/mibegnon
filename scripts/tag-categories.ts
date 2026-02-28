import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

const programs = [
  { category: "chevening",    terms: ["chevening"] },
  { category: "erasmus",      terms: ["erasmus"] },
  { category: "commonwealth", terms: ["commonwealth"] },
  { category: "daad",         terms: ["daad"] },
  { category: "gates",        terms: ["gates cambridge", "gates scholar"] },
  { category: "fulbright",    terms: ["fulbright"] },
  { category: "aga-khan",     terms: ["aga khan"] },
];

async function main() {
  console.log("Tagging scholarships by category...");
  for (const p of programs) {
    const result = await prisma.scholarship.updateMany({
      where: {
        category: null,
        OR: p.terms.flatMap((t) => [
          { name: { contains: t, mode: "insensitive" } },
          { provider: { contains: t, mode: "insensitive" } },
        ]),
      },
      data: { category: p.category },
    });
    console.log(`  ${p.category}: tagged ${result.count}`);
  }
  console.log("Done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

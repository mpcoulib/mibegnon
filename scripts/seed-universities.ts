import { PrismaClient } from "@prisma/client";
import { universities } from "../lib/mock-data";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  let created = 0;

  for (const u of universities) {
    const existing = await prisma.university.findFirst({
      where: { name: u.name },
    });

    if (existing) {
      console.log("Skipped: " + u.name);
      continue;
    }

    await prisma.university.create({
      data: {
        name: u.name,
        country: u.country,
        city: "",
        website: u.websiteUrl,
        ranking: u.ranking ?? null,
        fields: u.fields,
        description: u.description,
        isActive: true,
      },
    });

    created++;
    console.log("Created: " + u.name);
  }

  console.log("Done — " + created + " universities created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const universities = [
  {
    name: "Université Paris-Saclay",
    country: "France",
    flag: "🇫🇷",
    ranking: 15,
    fields: ["Sciences", "Ingénierie", "Médecine", "Droit", "Économie"],
    tuition: "3 770 €/an",
    description:
      "L'Université Paris-Saclay est l'une des meilleures universités françaises et mondiales, classée dans le top 15 mondial selon QS. Elle regroupe des grandes écoles, des instituts de recherche et des universités au sud de Paris. Elle est réputée pour ses formations en sciences, en ingénierie et en médecine.",
    programs: [
      "Sciences fondamentales et appliquées",
      "Ingénierie et numérique",
      "Sciences de la vie et médecine",
      "Sciences économiques et de gestion",
      "Droit et sciences politiques",
    ],
    websiteUrl: "https://www.universite-paris-saclay.fr",
  },
  {
    name: "Technische Universität Berlin",
    country: "Allemagne",
    flag: "🇩🇪",
    ranking: 154,
    fields: ["Ingénierie", "Informatique", "Architecture", "Sciences"],
    tuition: "350 €/semestre",
    description:
      "La TU Berlin est l'une des universités techniques les plus réputées d'Allemagne et d'Europe. Fondée en 1879, elle se distingue par sa forte orientation recherche et ses liens étroits avec l'industrie. Les frais de scolarité sont quasi nuls pour tous les étudiants, y compris internationaux.",
    programs: [
      "Génie civil et architecture",
      "Informatique et intelligence artificielle",
      "Ingénierie électrique",
      "Mathématiques et sciences naturelles",
      "Économie et gestion",
    ],
    websiteUrl: "https://www.tu.berlin",
  },
  {
    name: "University of Edinburgh",
    country: "Royaume-Uni",
    flag: "🇬🇧",
    ranking: 27,
    fields: ["Médecine", "Sciences humaines", "Informatique", "Droit", "Sciences"],
    tuition: "26 000 – 34 000 £/an",
    description:
      "Fondée en 1583, l'Université d'Édimbourg est l'une des plus anciennes et prestigieuses universités d'Écosse. Elle figure régulièrement dans le top 30 mondial. Elle offre de nombreuses bourses pour les étudiants internationaux méritants.",
    programs: [
      "Médecine et sciences de la santé",
      "Informatique et intelligence artificielle",
      "Droit international",
      "Arts, humanités et sciences sociales",
      "Business et économie",
    ],
    websiteUrl: "https://www.ed.ac.uk",
  },
  {
    name: "University of Cape Town",
    country: "Afrique du Sud",
    flag: "🇿🇦",
    ranking: 226,
    fields: ["Toutes filières", "Médecine", "Droit", "Sciences", "Commerce"],
    tuition: "50 000 – 100 000 ZAR/an (~2 500 – 5 000 €)",
    description:
      "L'Université du Cap (UCT) est la meilleure université d'Afrique subsaharienne selon le classement QS. Elle offre un environnement multiculturel riche et de nombreuses opportunités de recherche. Elle est réputée pour ses facultés de médecine, de droit et de commerce.",
    programs: [
      "Médecine et sciences de la santé",
      "Commerce et gestion",
      "Droit",
      "Ingénierie et environnement",
      "Sciences humaines et sociales",
    ],
    websiteUrl: "https://www.uct.ac.za",
  },
  {
    name: "McGill University",
    country: "Canada",
    flag: "🇨🇦",
    ranking: 32,
    fields: ["Médecine", "Droit", "Sciences", "Commerce", "Ingénierie"],
    tuition: "21 000 – 32 000 CAD/an (~14 000 – 21 000 €)",
    description:
      "McGill est l'une des universités les plus prestigieuses du Canada et d'Amérique du Nord. Basée à Montréal, ville francophone, elle offre de nombreux programmes en anglais et un environnement bilingue. Elle est particulièrement réputée pour ses facultés de médecine, de droit et de sciences.",
    programs: [
      "Médecine et sciences de la santé",
      "Droit",
      "Sciences et ingénierie",
      "Commerce et gestion",
      "Arts et sciences humaines",
    ],
    websiteUrl: "https://www.mcgill.ca",
  },
  {
    name: "ETH Zürich",
    country: "Suisse",
    flag: "🇨🇭",
    ranking: 7,
    fields: ["Sciences", "Ingénierie", "Architecture", "Mathématiques", "Informatique"],
    tuition: "730 CHF/semestre (~750 €)",
    description:
      "ETH Zürich (École polytechnique fédérale de Zurich) est classée dans le top 10 mondial. Elle est mondialement reconnue pour l'excellence de ses programmes en sciences et ingénierie. Les frais de scolarité sont remarquablement bas pour une université de ce rang.",
    programs: [
      "Informatique et sciences des données",
      "Ingénierie mécanique et électrique",
      "Architecture et environnement bâti",
      "Mathématiques et physique",
      "Sciences de la vie et biotechnologie",
    ],
    websiteUrl: "https://www.ethz.ch",
  },
];

async function main() {
  console.log("Seeding university_listings...");
  // Clear existing and re-insert so running seed twice stays idempotent
  await prisma.universityListing.deleteMany();
  await prisma.universityListing.createMany({ data: universities });
  console.log(`Done. ${universities.length} universities seeded.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

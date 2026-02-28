
export type ScholarshipType = "complete" | "partial" | "exchange";
export type Level = "Licence" | "Master" | "Doctorat";

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: string;
  flag: string;
  type: ScholarshipType;
  levels: Level[];
  fields: string[];
  deadline: string;
  amount?: string;
  description: string;
  requirements: string[];
  applicationUrl: string;
  urgent?: boolean;
}

export interface University {
  id: string;
  name: string;
  country: string;
  flag: string;
  ranking?: number;
  fields: string[];
  tuition: string;
  description: string;
  programs: string[];
  websiteUrl: string;
}


export const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "Bourse d'Excellence Eiffel",
    provider: "Campus France",
    country: "France",
    flag: "🇫🇷",
    type: "complete",
    levels: ["Master", "Doctorat"],
    fields: ["Sciences", "Ingénierie", "Économie", "Droit", "Médecine"],
    deadline: "9 Janvier 2027",
    amount: "1 181 €/mois",
    description:
      "La bourse d'excellence Eiffel est un programme du ministère français de l'Europe et des Affaires étrangères. Elle vise à attirer en France des étudiants étrangers de haut niveau pour y suivre des formations d'excellence en master ou doctorat. Elle couvre les frais de vie, les frais de scolarité, la couverture sociale et les billets d'avion.",
    requirements: [
      "Avoir moins de 25 ans pour le Master, 30 ans pour le Doctorat",
      "Excellent dossier académique (mention Très Bien)",
      "Admission préalable dans un établissement d'enseignement supérieur français",
      "Ressortissant d'un pays étranger (non français)",
    ],
    applicationUrl: "https://www.campusfrance.org/fr/eiffel",
    urgent: false,
  },
  {
    id: "2",
    name: "Chevening Scholarships",
    provider: "UK Government / Foreign Commonwealth",
    country: "Royaume-Uni",
    flag: "🇬🇧",
    type: "complete",
    levels: ["Master"],
    fields: ["Toutes filières"],
    deadline: "2 Novembre 2026",
    amount: "Frais + billet + allocation mensuelle",
    description:
      "Les bourses Chevening sont le programme international de bourses et de leadership du gouvernement britannique, financé par le Foreign, Commonwealth & Development Office. Elles permettent aux futurs leaders de faire un Master d'un an dans n'importe quelle université britannique.",
    requirements: [
      "Citoyen d'un pays éligible Chevening",
      "Minimum 2 ans d'expérience professionnelle",
      "Diplôme équivalent à un Bachelor britannique",
      "Retourner dans son pays d'origine pour au moins 2 ans après les études",
    ],
    applicationUrl: "https://www.chevening.org",
    urgent: false,
  },
  {
    id: "3",
    name: "Programme MasterCard Foundation Scholars",
    provider: "MasterCard Foundation",
    country: "Ghana",
    flag: "🇬🇭",
    type: "complete",
    levels: ["Licence"],
    fields: ["Toutes filières"],
    deadline: "15 Mars 2027",
    amount: "Entièrement financée",
    description:
      "Le Programme MasterCard Foundation Scholars soutient des jeunes Africains talentueux mais économiquement défavorisés pour qu'ils accèdent à une éducation de qualité. Il couvre la totalité des frais de scolarité, l'hébergement, les repas, les billets d'avion et une allocation mensuelle.",
    requirements: [
      "Être citoyen d'un pays africain subsaharien",
      "Excellence académique avérée",
      "Besoins financiers démontrés",
      "Engagement fort envers le service à la communauté",
    ],
    applicationUrl: "https://mastercardfdn.org/programs/scholars",
    urgent: true,
  },
  {
    id: "4",
    name: "Bourses DAAD — Études en Allemagne",
    provider: "DAAD (Office Allemand d'Échanges Universitaires)",
    country: "Allemagne",
    flag: "🇩🇪",
    type: "complete",
    levels: ["Master", "Doctorat"],
    fields: ["Sciences", "Ingénierie", "Sciences Humaines", "Arts"],
    deadline: "30 Octobre 2026",
    amount: "850 – 1 200 €/mois",
    description:
      "Le DAAD est la plus grande organisation de financement des échanges académiques au monde. Ses bourses permettent à des étudiants du monde entier d'étudier ou de faire de la recherche dans les universités allemandes.",
    requirements: [
      "Diplôme universitaire avec de très bons résultats",
      "Connaissance de l'anglais ou de l'allemand (selon le programme)",
      "Lettre de motivation convaincante",
      "Lettres de recommandation académiques",
    ],
    applicationUrl: "https://www.daad.de",
    urgent: false,
  },
  {
    id: "5",
    name: "Bourse du Gouvernement Coréen (KGSP)",
    provider: "National Institute for International Education",
    country: "Corée du Sud",
    flag: "🇰🇷",
    type: "complete",
    levels: ["Licence", "Master", "Doctorat"],
    fields: ["Toutes filières"],
    deadline: "28 Février 2027",
    amount: "900 000 KRW/mois (~670 €) + cours de coréen",
    description:
      "Le programme de bourse du gouvernement coréen (KGSP) est conçu pour attirer des étudiants étrangers de qualité en Corée du Sud. Il comprend les frais de scolarité, l'hébergement, une allocation mensuelle, un billet d'avion aller-retour, une assurance maladie et un cours de langue coréenne.",
    requirements: [
      "Âge : moins de 25 ans (Licence), 40 ans (Master/Doctorat)",
      "Moyenne académique de 80% minimum",
      "Ne pas être de nationalité coréenne",
      "Bonne santé physique et mentale",
    ],
    applicationUrl: "https://www.studyinkorea.go.kr",
    urgent: false,
  },
  {
    id: "6",
    name: "Erasmus Mundus Joint Master Degrees",
    provider: "Commission Européenne",
    country: "Europe (multi-pays)",
    flag: "🇪🇺",
    type: "exchange",
    levels: ["Master"],
    fields: ["Sciences", "Technologies", "Sciences Humaines", "Environnement"],
    deadline: "Varie selon le programme",
    amount: "1 400 €/mois + frais de scolarité",
    description:
      "Erasmus Mundus finance des Masters conjoints dans plusieurs universités européennes. Chaque programme est enseigné dans au moins 2 pays européens différents, offrant une expérience internationale unique. La bourse couvre entièrement les frais de déplacement, de visa, d'assurance et d'inscription.",
    requirements: [
      "Diplôme de Licence ou équivalent",
      "Maîtrise de l'anglais (B2 minimum)",
      "Dossier académique de très bon niveau",
      "Lettre de motivation et CV",
    ],
    applicationUrl: "https://www.eacea.ec.europa.eu/erasmus-plus",
    urgent: false,
  },
  {
    id: "7",
    name: "Bourse d'Excellence du Gouvernement Suisse",
    provider: "Confédération Suisse",
    country: "Suisse",
    flag: "🇨🇭",
    type: "complete",
    levels: ["Master", "Doctorat"],
    fields: ["Sciences", "Ingénierie", "Médecine", "Arts"],
    deadline: "15 Décembre 2026",
    amount: "1 920 CHF/mois (~1 980 €)",
    description:
      "Les Bourses d'excellence de la Confédération suisse permettent aux chercheurs et aux artistes étrangers de poursuivre leurs études ou recherches dans une université suisse. Ce programme promeut la coopération académique internationale.",
    requirements: [
      "Excellents résultats académiques",
      "Moins de 35 ans pour les étudiants en Master/Doctorat",
      "Acceptation par un professeur ou une institution suisse",
      "Dossier de candidature complet en anglais ou français",
    ],
    applicationUrl: "https://www.sbfi.admin.ch/sbfi/fr/home/formation/bourses.html",
    urgent: true,
  },
  {
    id: "8",
    name: "Bourse MTN Côte d'Ivoire — Excellence",
    provider: "Fondation MTN Côte d'Ivoire",
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    type: "partial",
    levels: ["Licence", "Master"],
    fields: ["Sciences", "Technologies", "Numérique"],
    deadline: "30 Juin 2027",
    amount: "500 000 FCFA/an",
    description:
      "La Fondation MTN CI soutient des étudiants ivoiriens méritants dans les filières scientifiques et technologiques. Cette bourse couvre une partie des frais de scolarité et est renouvelable chaque année sous conditions de résultats.",
    requirements: [
      "Être de nationalité ivoirienne",
      "Étudier dans une institution reconnue en Côte d'Ivoire ou à l'étranger",
      "Moyenne académique de 14/20 minimum",
      "Filière STEM uniquement",
    ],
    applicationUrl: "https://www.mtn.ci/fondation",
    urgent: false,
  },
];


export const universities: University[] = [
  {
    id: "1",
    name: "Université Paris-Saclay",
    country: "France",
    flag: "🇫🇷",
    ranking: 15,
    fields: ["Sciences", "Ingénierie", "Médecine", "Droit", "Économie"],
    tuition: "3 770 €/an (UE) · 3 770 €/an (hors UE depuis réforme)",
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
    id: "2",
    name: "Technische Universität Berlin",
    country: "Allemagne",
    flag: "🇩🇪",
    ranking: 154,
    fields: ["Ingénierie", "Informatique", "Architecture", "Sciences"],
    tuition: "350 €/semestre (frais de scolarité quasi nuls en Allemagne)",
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
    id: "3",
    name: "University of Edinburgh",
    country: "Royaume-Uni",
    flag: "🇬🇧",
    ranking: 27,
    fields: ["Médecine", "Sciences humaines", "Informatique", "Droit", "Sciences"],
    tuition: "26 000 – 34 000 £/an (étudiants internationaux)",
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
    id: "4",
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
    id: "5",
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
    id: "6",
    name: "ETH Zürich",
    country: "Suisse",
    flag: "🇨🇭",
    ranking: 7,
    fields: ["Sciences", "Ingénierie", "Architecture", "Mathématiques", "Informatique"],
    tuition: "730 CHF/semestre (~750 €) pour tous",
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


export function filterScholarships(
  items: Scholarship[],
  params: { type?: string; niveau?: string; q?: string }
): Scholarship[] {
  return items.filter((s) => {
    if (params.type && s.type !== params.type) return false;
    if (params.niveau && !s.levels.includes(params.niveau as Level)) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (
        !s.name.toLowerCase().includes(q) &&
        !s.provider.toLowerCase().includes(q) &&
        !s.country.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

export function filterUniversities(
  items: University[],
  params: { pays?: string; q?: string }
): University[] {
  return items.filter((u) => {
    if (params.pays && !u.country.toLowerCase().includes(params.pays.toLowerCase()))
      return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (
        !u.name.toLowerCase().includes(q) &&
        !u.country.toLowerCase().includes(q) &&
        !u.fields.some((f) => f.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });
}

export type CategoryInfo = {
  label: string;
  description: string;
  bg: string;
};

export const categoryInfo: Record<string, CategoryInfo> = {
  mastercard: {
    label: "Mastercard Foundation Scholars",
    description:
      "Le programme Mastercard Foundation Scholars offre des bourses entièrement financées à des jeunes africains talentueux mais économiquement défavorisés. Il couvre les frais de scolarité, le logement, les billets d'avion et une allocation mensuelle dans 29 universités partenaires à travers le monde.",
    bg: "linear-gradient(135deg, #eb001b 0%, #f79e1b 100%)",
  },
  chevening: {
    label: "Chevening Scholarships",
    description:
      "Les bourses Chevening sont le programme international du gouvernement britannique, financé par le Foreign, Commonwealth & Development Office. Elles permettent à des leaders émergents du monde entier de poursuivre un master au Royaume-Uni, tous frais pris en charge.",
    bg: "linear-gradient(135deg, #012169 0%, #C8102E 100%)",
  },
  commonwealth: {
    label: "Commonwealth Scholarships",
    description:
      "Les bourses Commonwealth sont financées par le gouvernement du Royaume-Uni et destinées aux citoyens des pays membres du Commonwealth. Elles couvrent des études de master et de doctorat dans des universités britanniques.",
    bg: "linear-gradient(135deg, #003087 0%, #7B2D8B 100%)",
  },
  erasmus: {
    label: "Erasmus+",
    description:
      "Erasmus+ est le programme de l'Union Européenne pour l'éducation, la formation, la jeunesse et le sport. Il finance des mobilités académiques et des bourses de master dans des universités européennes pour des étudiants du monde entier.",
    bg: "linear-gradient(135deg, #003399 0%, #FFCC00 100%)",
  },
  daad: {
    label: "Bourses DAAD",
    description:
      "Le DAAD (Deutscher Akademischer Austauschdienst) est la plus grande organisation allemande d'échanges académiques. Ses bourses permettent à des étudiants étrangers de poursuivre des études de master ou de doctorat en Allemagne.",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #4a4e69 100%)",
  },
  gates: {
    label: "Gates Cambridge Scholarships",
    description:
      "Les bourses Gates Cambridge sont financées par la Fondation Bill & Melinda Gates pour permettre à des étudiants brillants hors du Royaume-Uni de poursuivre un master ou un doctorat à l'Université de Cambridge.",
    bg: "linear-gradient(135deg, #6B3FA0 0%, #3A1078 100%)",
  },
  fulbright: {
    label: "Programme Fulbright",
    description:
      "Le programme Fulbright est le programme phare d'échanges éducatifs du gouvernement américain. Fondé en 1946, il finance des études de master et de doctorat aux États-Unis pour des étudiants du monde entier.",
    bg: "linear-gradient(135deg, #1B4F9C 0%, #3C6EB4 100%)",
  },
  "aga-khan": {
    label: "Aga Khan Foundation Scholarships",
    description:
      "Les bourses de la Fondation Aga Khan sont destinées aux étudiants issus de pays en développement. Elles financent des études de master dans des universités de premier plan, en privilégiant les candidats qui n'ont pas d'autres sources de financement.",
    bg: "linear-gradient(135deg, #145A32 0%, #8B6914 100%)",
  },
};

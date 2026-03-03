import Link from "next/link";
import Image from "next/image";
import { Heart, Target, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Gratuit, toujours",
    desc: "Mibegnon est et restera 100 % gratuit pour chaque élève ivoirien. Aucun abonnement, aucune commission. On est là pour toi, pas pour ton argent.",
    color: "text-[var(--orange)]",
    bg: "bg-[var(--orange)]/10",
  },
  {
    icon: Target,
    title: "Des opportunités vraies",
    desc: "Chaque bourse et chaque université référencée est vérifiée. On ne liste que des opportunités accessibles et adaptées aux élèves ivoiriens.",
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
  },
  {
    icon: Users,
    title: "Fait pour toi",
    desc: "On connaît les défis que vivent les élèves de Côte d'Ivoire. Mibegnon est conçu avec eux, pour eux, en langue qu'on aime tous pour un peu bader.",
    color: "text-[var(--orange)]",
    bg: "bg-[var(--orange)]/10",
  },
  {
    icon: Sparkles,
    title: "L'excellence est possible",
    desc: "Peu importe d'où tu viens, ton intelligence et ton travail méritent une chance. On est là pour que aucun talent ne soit gâché par manque d'information.",
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
  },
];

export default function AProposPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-[var(--primary)] px-6 py-16 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            Notre mission
          </p>
          <h1 className="text-4xl font-bold">
            Chaque élève ivoirien mérite sa chance
          </h1>
          <p className="mt-4 text-white/75 text-lg leading-relaxed">
            Mibegnon est né d&apos;une conviction simple : l&apos;information sur les bourses
            ne devrait pas être réservée à ceux qui ont des contacts ou de l&apos;argent.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
            Pourquoi Mibegnon ?
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              En Côte d&apos;Ivoire, des milliers d&apos;élèves brillants ratent chaque année
              des opportunités de bourses, non pas parce qu&apos;ils ne sont pas qualifiés,
              mais parce qu&apos;ils n&apos;en ont jamais entendu parler, ou trop tard.
            </p>
            <p>
              L&apos;information existe, mais elle est éparpillée, en anglais, difficile à
              comprendre, ou accessible seulement à ceux qui ont les bons contacts.
              C&apos;est injuste. Et c&apos;est ce qu&apos;on veut changer.
            </p>
            <p>
              <strong className="text-[var(--primary)]">Mibegnon</strong>, qui signifie
              &ldquo;je vais réussir&rdquo; en Senoufo, rassemble toutes ces opportunités
              en un seul endroit, gratuitement, pour que chaque élève de Côte d&apos;Ivoire
              puisse trouver sa voie vers l&apos;excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/20 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--primary)] text-center mb-10">
            Ce en quoi on croit
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc, color, bg }) => (
              <Card key={title} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className={`h-10 w-10 rounded-full ${bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={color} />
                  </div>
                  <h3 className="font-bold text-[var(--primary)] mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8 text-center">
            Le fondateur
          </h2>
          <Card className="border-slate-200 overflow-hidden">
            <CardContent className="pt-0 pb-0 p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Photo */}
                <div className="relative h-56 sm:h-auto sm:w-48 shrink-0">
                  <Image
                    src="/massa.jpg"
                    alt="Massa Coulibaly, fondateur de Mibegnon"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Bio */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-[var(--primary)]">Massa Coulibaly</p>
                    <p className="text-sm text-[var(--orange)] font-medium mb-3">Fondateur de Mibegnon</p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      Étudiant ivoirien en <strong>Master of Information Management and Systems</strong> à l&apos;Université de Californie, Berkeley, et diplômé de Carnegie Mellon University en Information Systems, Massa est ingénieur full-stack, data scientist et entrepreneur.
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Co-fondateur d&apos;<strong>Afya Health Information Systems</strong>, finaliste du Big Ideas Berkeley et accepté dans l&apos;accélérateur AHCI2, il construit des solutions technologiques pour l&apos;Afrique.
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Mibegnon est né d&apos;une conviction personnelle : l&apos;accès à l&apos;information ne devrait jamais être un privilège. Chaque élève ivoirien mérite sa chance.
                    </p>
                  </div>

                  <Link
                    href="https://www.linkedin.com/in/massa-coulibaly-a25a53135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-[var(--primary)] hover:underline w-fit"
                  >
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-sm bg-[#0077B5] text-white text-[9px] font-bold">in</span>
                    LinkedIn
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-secondary/20 px-6 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-2xl font-bold text-[var(--primary)]">Ça va aller, on est ensemble. 🇨🇮</p>
          <p className="mt-3 text-slate-500">
            Pour toute question, contacte-nous à{" "}
            <a
              href="mailto:contact@mibegnon.com"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              contact@mibegnon.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

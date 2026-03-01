import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Search, Send, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ScholarshipCard } from "@/components/scholarship-card";

export default async function HomePage() {
  const featuredScholarships = await prisma.scholarship.findMany({
    where: { isActive: true, isTranslated: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center">
        <Image
          src="/hero.jpeg"
          alt="Élève ivoirien levant la main en classe"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/90 via-[var(--primary)]/60 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <div className="max-w-xl">
            <Badge className="mb-5 bg-[var(--orange)] text-white hover:bg-[var(--orange)] border-0">
              Akwaba ! Gratuit pour tous les élèves ivoiriens
            </Badge>
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
              Ton avenir <br />
              <span className="text-[var(--gold)]">commence ici.</span>
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-md">
              Des centaines de bourses et d&apos;universités du monde entier,
              accessibles gratuitement à chaque élève de Côte d&apos;Ivoire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8"
              >
                <Link href="/bourses">Explorer les bourses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/20 border border-white text-white hover:bg-white/30 font-semibold px-8"
              >
                <Link href="/universites">Voir les universités</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured scholarships ── */}
      <section className="bg-secondary/20 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-[var(--primary)]">
            Bourses disponibles maintenant
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Des opportunités vérifiées qui t&apos;attendent. Ne laisse pas passer ta chance.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {featuredScholarships.map((s, i) => (
              <ScholarshipCard key={s.id} scholarship={s} featured={i === 1} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 px-8"
            >
              <Link href="/bourses">Voir toutes les bourses →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Trois étapes simples pour transformer tes ambitions en réalité.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: 1,
                icon: User,
                title: "Crée ton profil",
                desc: "Remplis ton profil en quelques minutes avec tes informations académiques et tes ambitions.",
              },
              {
                step: 2,
                icon: Search,
                title: "Découvre les opportunités",
                desc: "Explore des centaines de bourses et universités qui correspondent à ton profil.",
              },
              {
                step: 3,
                icon: Send,
                title: "Postule facilement",
                desc: "Soumets tes candidatures directement via notre plateforme et suis leur progression.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <Card key={step} className="border border-slate-200 shadow-sm text-left">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-sm">
                      {step}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--orange)] text-[var(--orange)]">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-bold text-[var(--primary)]">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="bg-secondary/20 px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
    
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            Prêt à commencer ton voyage vers l&apos;excellence ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Rejoins des milliers d&apos;étudiants ivoiriens qui ont déjà trouvé leur bourse
            d&apos;études grâce à Mibegnon.
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--primary)]/70 italic">
            Ça va aller, on est ensemble. 🇨🇮
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-semibold px-8"
            >
              <Link href="/inscription">Créer mon compte gratuitement</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 font-semibold px-8"
            >
              <Link href="/bourses">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

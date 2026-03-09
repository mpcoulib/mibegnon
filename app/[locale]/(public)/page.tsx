import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Search, Send } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ScholarshipCard } from "@/components/scholarship-card";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600; // revalidate cached page every hour

export default async function HomePage() {
  const t = await getTranslations("home");

  let featuredScholarships: { id: string; name: string; provider: string; country: string; academicLevels: string[]; deadline: Date | null; isFullFunding: boolean; category: string | null }[] = [];
  try {
    featuredScholarships = await prisma.scholarship.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, name: true, provider: true, country: true, academicLevels: true, deadline: true, isFullFunding: true, category: true },
    });
  } catch {
    // DB unreachable (e.g. Supabase project paused) — page still renders without featured scholarships
  }

  const steps = [
    { step: 1, icon: User, title: t("step1Title"), desc: t("step1Desc") },
    { step: 2, icon: Search, title: t("step2Title"), desc: t("step2Desc") },
    { step: 3, icon: Send, title: t("step3Title"), desc: t("step3Desc") },
  ];

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
              {t("badge")}
            </Badge>
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
              {t("heroTitle")} <br />
              <span className="text-[var(--gold)]">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-md">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8"
              >
                <Link href="/bourses">{t("exploreScholarships")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/20 border border-white text-white hover:bg-white/30 font-semibold px-8"
              >
                <Link href="/universites">{t("viewUniversities")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured scholarships ── */}
      <section className="bg-secondary/20 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-[var(--primary)]">
            {t("availableNow")}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            {t("availableSubtitle")}
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
              <Link href="/bourses">{t("viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            {t("howItWorks")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("howItWorksSubtitle")}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map(({ step, icon: Icon, title, desc }) => (
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
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("ctaSubtitle")}
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--primary)]/70 italic">
            {t("ctaTagline")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-semibold px-8"
            >
              <Link href="/inscription">{t("createAccount")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 font-semibold px-8"
            >
              <Link href="/bourses">{t("learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

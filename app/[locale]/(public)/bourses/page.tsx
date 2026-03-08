import { Suspense } from "react";
import { ScholarshipCard } from "@/components/scholarship-card";
import { BoursesFilters } from "@/components/bourses-filters";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { categoryInfo } from "@/lib/category-info";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600; // revalidate cached page every hour

export default async function BoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; niveau?: string; q?: string; category?: string }>;
}) {
  const t = await getTranslations("bourses");
  const params = await searchParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isActive: true,
    ivoirianEligible: true,
    isTranslated: true,
    ...(params.type === "funded" ? { isFullFunding: true } : {}),
    ...(params.type === "partial" ? { isFullFunding: false } : {}),
    ...(params.niveau ? { academicLevels: { has: params.niveau } } : {}),
    ...(params.category ? { category: params.category } : {}),
    ...(params.q
      ? {
          OR: [
            { name: { contains: params.q, mode: "insensitive" } },
            { provider: { contains: params.q, mode: "insensitive" } },
            { country: { contains: params.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  let raw: { id: string; name: string; provider: string; country: string; academicLevels: string[]; deadline: Date | null; isFullFunding: boolean; category: string | null }[] = [];
  try {
    raw = await prisma.scholarship.findMany({
      where,
      select: { id: true, name: true, provider: true, country: true, academicLevels: true, deadline: true, isFullFunding: true, category: true },
    });
  } catch (err) {
    console.error("DB error on /bourses:", err);
  }

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const tagged = shuffle(raw.filter((s) => s.category !== null));
  const untagged = shuffle(raw.filter((s) => s.category === null));
  const scholarships = [...tagged, ...untagged];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let savedIds: string[] = [];
  if (user) {
    try {
      const saved = await prisma.savedScholarship.findMany({
        where: { userId: user.id },
        select: { scholarshipId: true },
      });
      savedIds = saved.map((s: { scholarshipId: string }) => s.scholarshipId);
    } catch {
      // DB unreachable — continue without saved IDs
    }
  }

  const tCommon = await getTranslations("common");

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="bg-[var(--primary)] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">
            {t("badge")}
          </p>
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-white/70">
            {t("count", { count: scholarships.length })}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <Suspense fallback={<div className="h-24 rounded-xl bg-slate-100 animate-pulse" />}>
          <BoursesFilters />
        </Suspense>

        {params.category && categoryInfo[params.category] && (
          <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div
              className="px-6 py-4 text-white"
              style={{ background: categoryInfo[params.category].bg }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">
                {t("program")}
              </p>
              <h2 className="text-lg font-bold">{categoryInfo[params.category].label}</h2>
            </div>
            <div className="bg-white px-6 py-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {categoryInfo[params.category].description}
              </p>
            </div>
          </div>
        )}

        <p className="mt-6 mb-4 text-sm text-slate-500">
          {t("found", { count: scholarships.length })}
        </p>

        {scholarships.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} isSaved={savedIds.includes(s.id)} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-3 font-semibold text-slate-700">{tCommon("noResults")}</p>
            <p className="mt-1 text-sm text-slate-500">{tCommon("noResultsHint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

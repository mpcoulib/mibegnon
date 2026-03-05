import { UniversityCard } from "@/components/university-card";
import { UniversitesFilters } from "@/components/universites-filters";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export default async function UniversitesPage({
  searchParams,
}: {
  searchParams: Promise<{ pays?: string; q?: string }>;
}) {
  const t = await getTranslations("universites");
  const tCommon = await getTranslations("common");
  const params = await searchParams;

  const where: object = {
    isActive: true,
    ...(params.pays ? { country: params.pays } : {}),
    ...(params.q
      ? {
          OR: [
            { name: { contains: params.q, mode: "insensitive" } },
            { country: { contains: params.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  let universities: Awaited<ReturnType<typeof prisma.university.findMany>> = [];
  try {
    universities = await prisma.university.findMany({
      where,
      orderBy: { ranking: "asc" },
    });
  } catch {
    // DB unreachable — page still renders with empty list
  }

  return (
    <div className="flex flex-col">
      <section className="bg-[var(--primary)] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">
            {t("badge")}
          </p>
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-white/70">
            {t("subtitle", { count: universities.length })}
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <Suspense fallback={<div className="h-24 rounded-xl bg-slate-100 animate-pulse" />}>
          <UniversitesFilters />
        </Suspense>

        <p className="mt-6 mb-4 text-sm text-slate-500">
          {t("found", { count: universities.length })}
        </p>

        {universities.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((u) => (
              <UniversityCard key={u.id} university={u} />
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

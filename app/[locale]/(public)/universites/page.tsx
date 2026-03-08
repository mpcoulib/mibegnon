import { UniversityCard } from "@/components/university-card";
import { UniversitesFilters } from "@/components/universites-filters";
import { universities as allUniversities } from "@/lib/mock-data";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600; // revalidate cached page every hour

export default async function UniversitesPage({
  searchParams,
}: {
  searchParams: Promise<{ pays?: string; q?: string }>;
}) {
  const t = await getTranslations("universites");
  const tCommon = await getTranslations("common");
  const params = await searchParams;

  let universities = allUniversities;
  if (params.pays) {
    universities = universities.filter((u) => u.country === params.pays);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    universities = universities.filter(
      (u) => u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q)
    );
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

import { Suspense } from "react";
import { UniversityCard } from "@/components/university-card";
import { UniversitesFilters } from "@/components/universites-filters";
import { universities, filterUniversities } from "@/lib/mock-data";

export default async function UniversitesPage({
  searchParams,
}: {
  searchParams: Promise<{ pays?: string; q?: string }>;
}) {
  const params = await searchParams;
  const results = filterUniversities(universities, params);

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="bg-[var(--primary)] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">
            Destinations
          </p>
          <h1 className="text-4xl font-bold">Universités mondiales</h1>
          <p className="mt-2 text-white/70">
            {universities.length} universités référencées — Europe, Amérique, Asie, Afrique
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Filters */}
        <Suspense fallback={<div className="h-24 rounded-xl bg-slate-100 animate-pulse" />}>
          <UniversitesFilters />
        </Suspense>

        {/* Results count */}
        <p className="mt-6 mb-4 text-sm text-slate-500">
          {results.length} université{results.length > 1 ? "s" : ""} trouvée
          {results.length > 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((u) => (
              <UniversityCard key={u.id} university={u} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-3 font-semibold text-slate-700">Ijioh ! Aucun résultat dêh...</p>
            <p className="mt-1 text-sm text-slate-500">
              Essaie de modifier tes filtres ou de changer ta recherche. Ça va aller !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

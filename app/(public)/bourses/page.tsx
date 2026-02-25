import { Suspense } from "react";
import { ScholarshipCard } from "@/components/scholarship-card";
import { BoursesFilters } from "@/components/bourses-filters";
import { scholarships, filterScholarships } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function BoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; niveau?: string; q?: string }>;
}) {
  const params = await searchParams;
  const results = filterScholarships(scholarships, params);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let savedIds: string[] = [];
  if (user) {
    const saved = await prisma.savedScholarship.findMany({
      where: { userId: user.id },
      select: { scholarshipId: true },
    });
    savedIds = saved.map((s: { scholarshipId: string }) => s.scholarshipId);
  }

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="bg-[var(--primary)] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">
            Opportunités
          </p>
          <h1 className="text-4xl font-bold">Toutes les bourses</h1>
          <p className="mt-2 text-white/70">
            {scholarships.length} bourses disponibles, filtrées pour les élèves ivoiriens
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Filters */}
        <Suspense fallback={<div className="h-24 rounded-xl bg-slate-100 animate-pulse" />}>
          <BoursesFilters />
        </Suspense>

        {/* Results count */}
        <p className="mt-6 mb-4 text-sm text-slate-500">
          {results.length} bourse{results.length > 1 ? "s" : ""} trouvée
          {results.length > 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} isSaved={savedIds.includes(s.id)} />
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

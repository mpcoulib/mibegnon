import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Trophy, BookOpen, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { universities } from "@/lib/mock-data";
import { getTranslations } from "next-intl/server";

export default async function UniversiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("universiteDetail");

  const university = universities.find((u) => u.id === id);
  if (!university) notFound();
  const u = university;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-[var(--primary)] px-6 pt-6 pb-14 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/universites"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            {t("backToAll")}
          </Link>
          {u.ranking && (
            <div className="flex items-center gap-1.5 mb-3">
              <Trophy size={14} className="text-[var(--gold)]" />
              <span className="text-sm font-medium text-[var(--gold)]">
                {t("ranking", { rank: u.ranking })}
              </span>
            </div>
          )}
          <h1 className="text-3xl font-bold leading-snug max-w-3xl">
            {u.flag} {u.name}
          </h1>
          <p className="mt-2 text-white/70">{u.country}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-6xl px-6 -mt-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Left: details ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">{t("country")}</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin size={13} className="text-[var(--orange)]" />
                  {u.country}
                </p>
              </div>
              {u.ranking && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t("qsRanking")}</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-1">
                    <Trophy size={13} className="text-[var(--gold)]" />
                    #{u.ranking}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 mb-1">{t("tuition")}</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <DollarSign size={13} className="text-[var(--orange)]" />
                  {u.tuition.split("·")[0].trim()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3">{t("about")}</h2>
              <p className="text-slate-600 leading-relaxed">{u.description}</p>
            </div>

            {/* Fields */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-[var(--orange)]" />
                {t("fields")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {u.fields.map((field) => (
                  <Badge key={field} variant="secondary" className="text-xs">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3">{t("programs")}</h2>
              <ul className="space-y-2">
                {u.programs.map((prog, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 h-4 w-4 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {prog}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: sidebar ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
                {t("practicalInfo")}
              </p>

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t("country")}</span>
                  <span className="font-semibold text-slate-800">
                    {u.flag} {u.country}
                  </span>
                </div>
                {u.ranking && (
                  <div className="flex justify-between">
                    <span>{t("qsRanking")}</span>
                    <span className="font-semibold text-[var(--gold)]">#{u.ranking}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="shrink-0">{t("tuition")}</span>
                  <span className="font-semibold text-slate-800 text-right text-xs">
                    {u.tuition}
                  </span>
                </div>
              </div>

              <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                <a href={u.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  {t("officialSite")}
                  <ExternalLink size={14} />
                </a>
              </Button>

              <Button asChild variant="outline" className="mt-3 w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
                <Link href="/bourses">{t("viewScholarships")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-secondary/30 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-[var(--primary)]">{t("findScholarship")}</p>
        <Button asChild className="mt-4 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Link href="/bourses">{t("exploreScholarships")}</Link>
        </Button>
      </div>
    </div>
  );
}

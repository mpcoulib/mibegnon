import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, GraduationCap, CalendarDays, Banknote, ExternalLink, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/save-button";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // revalidate cached page every hour

const countryFlags: Record<string, string> = {
  "France": "🇫🇷", "Germany": "🇩🇪", "United Kingdom": "🇬🇧", "UK": "🇬🇧",
  "USA": "🇺🇸", "United States": "🇺🇸", "Canada": "🇨🇦", "Australia": "🇦🇺",
  "Japan": "🇯🇵", "China": "🇨🇳", "South Korea": "🇰🇷", "Korea": "🇰🇷",
  "Turkey": "🇹🇷", "Türkiye": "🇹🇷", "Switzerland": "🇨🇭",
  "Netherlands": "🇳🇱", "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
  "Belgium": "🇧🇪", "Italy": "🇮🇹", "Spain": "🇪🇸", "Portugal": "🇵🇹",
  "India": "🇮🇳", "Brazil": "🇧🇷", "South Africa": "🇿🇦",
  "Nigeria": "🇳🇬", "Ghana": "🇬🇭", "Kenya": "🇰🇪", "Rwanda": "🇷🇼",
  "Senegal": "🇸🇳", "Côte d'Ivoire": "🇨🇮", "Ivory Coast": "🇨🇮",
  "Morocco": "🇲🇦", "Egypt": "🇪🇬", "Ethiopia": "🇪🇹", "Cameroon": "🇨🇲",
  "Saudi Arabia": "🇸🇦", "UAE": "🇦🇪", "Lebanon": "🇱🇧",
  "Thailand": "🇹🇭", "Malaysia": "🇲🇾", "Singapore": "🇸🇬",
  "Indonesia": "🇮🇩", "New Zealand": "🇳🇿", "Greece": "🇬🇷",
  "Azerbaijan": "🇦🇿", "Latvia": "🇱🇻", "Romania": "🇷🇴",
  "International": "🌍",
};

function getFlag(country: string): string {
  return countryFlags[country] ?? "🌍";
}

export default async function BourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("bourseDetail");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();

  const s = await prisma.scholarship.findUnique({ where: { id } });
  if (!s) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isSaved = false;
  if (user) {
    const saved = await prisma.savedScholarship.findUnique({
      where: { userId_scholarshipId: { userId: user.id, scholarshipId: id } },
    });
    isSaved = !!saved;
  }

  const flag = getFlag(s.country);
  const levels = s.academicLevels
    .map((l) => {
      try {
        return tCommon(`levels.${l}` as Parameters<typeof tCommon>[0]);
      } catch {
        return l;
      }
    })
    .join(", ");

  const deadline = s.deadline
    ? new Date(s.deadline).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })
    : tCommon("deadlineUnknown");

  const amount = s.isFullFunding
    ? tCommon("fullFunding")
    : s.amount
    ? `${s.amount.toLocaleString()} ${s.currency}`
    : null;

  return (
    <div className="flex flex-col">
      {/* Nav breadcrumb */}
      <div className="bg-[var(--primary)] px-6 pt-6 pb-14 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/bourses"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            {t("backToAll")}
          </Link>
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <Badge className="bg-white/20 text-white border-0">
              {s.isFullFunding ? tCommon("fullFunding") : tCommon("scholarship")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold leading-snug max-w-3xl">{s.name}</h1>
          <p className="mt-2 text-white/70">{s.provider}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-6xl px-6 -mt-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Left: details ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">{tCommon("country")}</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin size={13} className="text-[var(--orange)]" />
                  {flag} {s.country}
                </p>
              </div>
              {levels && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{tCommon("level")}</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-1">
                    <GraduationCap size={13} className="text-[var(--orange)]" />
                    {levels}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 mb-1">{tCommon("deadline")}</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <CalendarDays size={13} className="text-[var(--orange)]" />
                  {deadline}
                </p>
              </div>
              {amount && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t("amount")}</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-1">
                    <Banknote size={13} className="text-[var(--orange)]" />
                    {amount}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3">{t("about")}</h2>
              <p className="text-slate-600 leading-relaxed">{s.description}</p>
            </div>

            {/* Fields */}
            {s.fields.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[var(--primary)] mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-[var(--orange)]" />
                  {t("fields")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {s.fields.map((field) => (
                    <Badge key={field} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {s.requirements && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[var(--primary)] mb-3">{t("requirements")}</h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {s.requirements}
                </p>
              </div>
            )}
          </div>

          {/* ── Right: sidebar CTA ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
                {t("apply")}
              </p>

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{tCommon("deadline")}</span>
                  <span className="font-semibold text-slate-800">{deadline}</span>
                </div>
                {amount && (
                  <div className="flex justify-between">
                    <span>{t("amount")}</span>
                    <span className="font-semibold text-slate-800">{amount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t("type")}</span>
                  <span className="font-semibold text-slate-800">
                    {s.isFullFunding ? tCommon("fullFunding") : tCommon("scholarship")}
                  </span>
                </div>
              </div>

              {s.link ? (
                <>
                  <Button asChild className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      {t("applyNow")}
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                  <p className="mt-4 text-center text-xs text-slate-400">{t("applyDisclaimer")}</p>
                </>
              ) : (
                <p className="text-center text-sm text-slate-500 py-2">{t("noLink")}</p>
              )}

              <div className="mt-3 flex items-center gap-2">
                <SaveButton scholarshipId={s.id} isSaved={isSaved} />
                <span className="text-xs text-slate-400">
                  {isSaved ? t("saved") : t("save")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-secondary/30 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-[var(--primary)]">{t("exploreMore")}</p>
        <Button asChild className="mt-4 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Link href="/bourses">{t("viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
}

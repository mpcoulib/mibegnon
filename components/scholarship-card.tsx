import Link from "next/link";
import { MapPin, GraduationCap, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/save-button";
import type { Scholarship } from "@prisma/client";

type ScholarshipCardData = Pick<Scholarship, "id" | "name" | "provider" | "country" | "academicLevels" | "deadline" | "isFullFunding" | "category">;
import { categoryInfo } from "@/lib/category-info";
import { Globe2 } from "lucide-react";
import { getCountryPath } from "@/lib/country-map";
import { useTranslations } from "next-intl";

const countryFlags: Record<string, string> = {
  "France": "🇫��", "Germany": "🇩🇪", "Allemagne": "🇩🇪",
  "United Kingdom": "🇬🇧", "Royaume-Uni": "🇬🇧", "UK": "🇬🇧",
  "USA": "🇺🇸", "United States": "🇺🇸", "États-Unis": "🇺🇸",
  "Canada": "🇨🇦", "Australia": "🇦🇺", "Japan": "🇯🇵",
  "China": "🇨🇳", "South Korea": "🇰🇷", "Korea": "🇰🇷",
  "Turkey": "🇹🇷", "Türkiye": "🇹🇷", "Switzerland": "🇨🇭", "Suisse": "🇨🇭",
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

function isUrgent(date: Date | null): boolean {
  if (!date) return false;
  const diff = new Date(date).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

export function ScholarshipCard({
  scholarship: s,
  featured = false,
  isSaved = false,
}: {
  scholarship: ScholarshipCardData;
  featured?: boolean;
  isSaved?: boolean;
}) {
  const t = useTranslations("bourses");
  const tCommon = useTranslations("common");

  const countryPath = getCountryPath(s.country);
  const flag = getFlag(s.country);
  const urgent = isUrgent(s.deadline);
  const levels = s.academicLevels
    .map((l) => {
      try {
        return tCommon(`levels.${l}` as Parameters<typeof tCommon>[0]);
      } catch {
        return l;
      }
    })
    .join(", ");
  const cat = s.category ? categoryInfo[s.category] : null;

  const deadlineText = s.category === "mastercard" && !s.deadline
    ? tCommon("deadlineByUniversity")
    : `${tCommon("deadline")} : ${
        s.deadline
          ? new Date(s.deadline).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
          : tCommon("deadlineUnknown")
      }`;

  return (
    <Card
      className={`relative overflow-hidden transition-shadow hover:shadow-md ${
        featured
          ? "border-[var(--primary)] shadow-md scale-[1.01]"
          : "border-slate-200 shadow-sm"
      }`}
    >
      {countryPath && (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 130"
          className="absolute top-0 right-0 w-36 h-24 opacity-[0.06] pointer-events-none select-none text-slate-800"
        >
          <path d={countryPath} fill="currentColor" />
        </svg>
      )}
      {flag === "🌍"
        ? <Globe2 size={22} className="absolute top-3 right-3 text-slate-400" />
        : <span className="absolute top-3 right-3 text-2xl">{flag}</span>
      }

      {cat && (
        <Link
          href={`/bourses?category=${s.category}`}
          className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm truncate max-w-[55%]"
          style={{ background: cat.bg }}
          title={cat.label}
        >
          {s.category === "mastercard" && (
            <span className="flex items-center shrink-0">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#eb001b] opacity-90" />
              <span className="-ml-1 inline-block h-2.5 w-2.5 rounded-full bg-[#f79e1b] opacity-90" />
            </span>
          )}
          {cat.label}
        </Link>
      )}

      <CardContent className={`pt-5 pb-6 pr-12 ${cat ? "mt-6" : ""}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-[var(--primary)] border-[var(--primary)] text-xs">
            {s.isFullFunding ? tCommon("fullFunding") : tCommon("scholarship")}
          </Badge>
          {urgent && (
            <Badge className="bg-[var(--orange)] text-white border-0 text-xs">
              {tCommon("closingSoon")}
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-[var(--primary)] leading-snug">{s.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{s.provider}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--orange)]/10 shrink-0">
              <MapPin size={13} className="text-[var(--orange)]" />
            </span>
            {s.country}
          </li>
          {levels && (
            <li className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--orange)]/10 shrink-0">
                <GraduationCap size={13} className="text-[var(--orange)]" />
              </span>
              {levels}
            </li>
          )}
          <li className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--orange)]/10 shrink-0">
              <CalendarDays size={13} className="text-[var(--orange)]" />
            </span>
            {deadlineText}
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className={`flex-1 ${
              featured
                ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                : "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
            }`}
          >
            <Link href={`/bourses/${s.id}`}>{t("viewDetails")}</Link>
          </Button>
          <SaveButton scholarshipId={s.id} isSaved={isSaved} />
        </div>
      </CardContent>
    </Card>
  );
}

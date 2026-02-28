import Link from "next/link";
import { MapPin, GraduationCap, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/save-button";
import type { Scholarship } from "@prisma/client";
import { categoryInfo } from "@/lib/category-info";

const levelLabels: Record<string, string> = {
  BACHELOR: "Licence", MASTER: "Master", DOCTORAT: "Doctorat",
  FELLOWSHIP: "Fellowship", SECONDARY: "Secondaire",
};

const countryFlags: Record<string, string> = {
  "France": "🇫🇷", "Germany": "🇩🇪", "Allemagne": "🇩🇪",
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

function formatDeadline(date: Date | null): string {
  if (!date) return "Non précisée";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
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
  scholarship: Scholarship;
  featured?: boolean;
  isSaved?: boolean;
}) {
  const flag = getFlag(s.country);
  const urgent = isUrgent(s.deadline);
  const levels = s.academicLevels.map((l) => levelLabels[l] ?? l).join(", ");
  const cat = s.category ? categoryInfo[s.category] : null;

  return (
    <Card
      className={`relative overflow-hidden transition-shadow hover:shadow-md ${
        featured
          ? "border-[var(--primary)] shadow-md scale-[1.01]"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <span className="absolute top-3 right-3 text-2xl">{flag}</span>

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
          <Badge
            variant="outline"
            className="text-[var(--primary)] border-[var(--primary)] text-xs"
          >
            {s.isFullFunding ? "Entièrement financée" : "Bourse"}
          </Badge>
          {urgent && (
            <Badge className="bg-[var(--orange)] text-white border-0 text-xs">
              Clôture bientôt
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-[var(--primary)] leading-snug">{s.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{s.provider}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <MapPin size={14} className="text-[var(--orange)] shrink-0" />
            {s.country}
          </li>
          {levels && (
            <li className="flex items-center gap-2">
              <GraduationCap size={14} className="text-[var(--orange)] shrink-0" />
              {levels}
            </li>
          )}
          <li className="flex items-center gap-2">
            <CalendarDays size={14} className="text-[var(--orange)] shrink-0" />
            {s.category === "mastercard" && !s.deadline
              ? "Date limite selon l'université"
              : `Date limite : ${formatDeadline(s.deadline)}`}
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
            <Link href={`/bourses/${s.id}`}>Voir les détails</Link>
          </Button>
          <SaveButton scholarshipId={s.id} isSaved={isSaved} />
        </div>
      </CardContent>
    </Card>
  );
}

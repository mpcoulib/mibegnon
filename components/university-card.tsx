import Link from "next/link";
import { MapPin, Trophy, BookOpen, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UniversityListing } from "@prisma/client";


const countryFlags: Record<string, string> = {
  "France": "🇫🇷", "Germany": "🇩🇪", "Allemagne": "🇩🇪",
  "United Kingdom": "🇬🇧", "Royaume-Uni": "🇬🇧", "UK": "🇬🇧",
  "USA": "🇺🇸", "United States": "🇺🇸", "Canada": "🇨🇦",
  "Australia": "🇦🇺", "Switzerland": "🇨🇭", "Suisse": "🇨🇭",
  "South Africa": "🇿🇦", "Afrique du Sud": "🇿🇦",
};

export function UniversityCard({ university: u }: { university: UniversityListing }) {
  const flag = countryFlags[u.country];

  return (
    <Card className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      {flag
        ? <span className="absolute top-3 right-3 text-2xl">{flag}</span>
        : <Globe2 size={22} className="absolute top-3 right-3 text-slate-400" />
      }

      <CardContent className="pt-5 pb-6 pr-12">
        {u.ranking && (
          <div className="flex items-center gap-1.5 mb-3">
            <Trophy size={13} className="text-[var(--gold)]" />
            <span className="text-xs font-semibold text-[var(--gold)]">
              QS #{u.ranking} mondial
            </span>
          </div>
        )}

        <h3 className="font-bold text-[var(--primary)] leading-snug">{u.name}</h3>

        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <MapPin size={14} className="text-[var(--orange)] shrink-0" />
            {u.country}
          </li>
          {u.fields.length > 0 && (
            <li className="flex items-start gap-2">
              <BookOpen size={14} className="text-[var(--orange)] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{u.fields.slice(0, 3).join(", ")}</span>
            </li>
          )}
        </ul>

        <Button
          asChild
          size="sm"
          className="mt-5 w-full bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
        >
          <Link href={`/universites/${u.id}`}>Voir l&apos;université</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

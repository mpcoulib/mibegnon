import Link from "next/link";
import { MapPin, GraduationCap, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/save-button";
import type { Scholarship } from "@/lib/mock-data";

const typeLabel: Record<string, string> = {
  complete: "Bourse complète",
  partial: "Aide partielle",
  exchange: "Programme d'échange",
};

export function ScholarshipCard({
  scholarship: s,
  featured = false,
  isSaved = false,
}: {
  scholarship: Scholarship;
  featured?: boolean;
  isSaved?: boolean;
}) {
  return (
    <Card
      className={`relative overflow-hidden transition-shadow hover:shadow-md ${
        featured
          ? "border-[var(--primary)] shadow-md scale-[1.01]"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <span className="absolute top-3 right-3 text-2xl">{s.flag}</span>

      <CardContent className="pt-5 pb-6 pr-12">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="outline"
            className="text-[var(--primary)] border-[var(--primary)] text-xs"
          >
            {typeLabel[s.type]}
          </Badge>
          {s.urgent && (
            <Badge className="bg-[var(--orange)] text-white border-0 text-xs">
              toi tu connais oub!
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
          <li className="flex items-center gap-2">
            <GraduationCap size={14} className="text-[var(--orange)] shrink-0" />
            {s.levels.join(", ")}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays size={14} className="text-[var(--orange)] shrink-0" />
            Date limite : {s.deadline}
          </li>
        </ul>

        <Button
          asChild
          size="sm"
          className={`mt-5 w-full ${
            featured
              ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
              : "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
          }`}
        >
          <Link href={`/bourses/${s.id}`}>Voir les détails</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

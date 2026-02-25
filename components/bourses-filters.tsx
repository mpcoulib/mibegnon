"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

const types = [
  { value: "", label: "Toutes" },
  { value: "funded", label: "Entièrement financées" },
  { value: "partial", label: "Partielles" },
];

const levels = [
  { value: "", label: "Tous niveaux" },
  { value: "BACHELOR", label: "Licence" },
  { value: "MASTER", label: "Master" },
  { value: "DOCTORAT", label: "Doctorat" },
];

export function BoursesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "";
  const currentNiveau = searchParams.get("niveau") || "";
  const currentQ = searchParams.get("q") || "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Rechercher une bourse, un pays…"
          defaultValue={currentQ}
          onChange={(e) => update("q", e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Type filter */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => update("type", t.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                currentType === t.value
                  ? "bg-[var(--primary)] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level filter */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Niveau
        </p>
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l.value}
              onClick={() => update("niveau", l.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                currentNiveau === l.value
                  ? "bg-[var(--primary)] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function CandidaturesPage() {
  const t = await getTranslations("candidatures");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">{t("title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("subtitle")}</p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <ClipboardList size={36} className="mx-auto text-slate-300 mb-3" />
        <p className="font-medium text-slate-600">{t("emptyTitle")}</p>
        <p className="mt-1 text-sm text-slate-400">{t("emptyDesc")}</p>
        <Button asChild size="sm" className="mt-5 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Link href="/bourses">{t("findScholarship")}</Link>
        </Button>
      </div>
    </div>
  );
}

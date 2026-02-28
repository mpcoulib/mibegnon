import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CandidaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Mes candidatures</h1>
        <p className="mt-1 text-sm text-slate-500">
          Suis la progression de tes candidatures.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <ClipboardList size={36} className="mx-auto text-slate-300 mb-3" />
        <p className="font-medium text-slate-600">Pas encore de candidature dêh</p>
        <p className="mt-1 text-sm text-slate-400">
          Postule à une bourse et on s&apos;occupera de tout suivre pour toi. On est ensemble !
        </p>
        <Button
          asChild
          size="sm"
          className="mt-5 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
        >
          <Link href="/bourses">Trouver une bourse</Link>
        </Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavorisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Mes favoris</h1>
        <p className="mt-1 text-sm text-slate-500">
          Les bourses que tu as sauvegardées.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <Bookmark size={36} className="mx-auto text-slate-300 mb-3" />
        <p className="font-medium text-slate-600">Ijioh ! Aucune bourse sauvegardée encore</p>
        <p className="mt-1 text-sm text-slate-400">
          Explore les bourses et clique sur ❤ pour les sauvegarder ici. Ça va aller dêh !
        </p>
        <Button
          asChild
          size="sm"
          className="mt-5 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
        >
          <Link href="/bourses">Explorer les bourses</Link>
        </Button>
      </div>
    </div>
  );
}

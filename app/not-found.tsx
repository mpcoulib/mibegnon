import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <p className="text-6xl mb-4">😅</p>
      <h1 className="text-3xl font-bold text-[var(--primary)]">
        Ijioh ! Cette page a fraya en brousse conhan hein
      </h1>
      <p className="mt-3 text-slate-500 max-w-sm">
        On dirait que cette page n&apos;existe pas — ou elle a pris la clé des champs. Ça va aller tchai !
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 rounded-full px-8">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
        <Button asChild variant="outline" className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-full px-8">
          <Link href="/bourses">Voir les bourses</Link>
        </Button>
      </div>
    </div>
  );
}

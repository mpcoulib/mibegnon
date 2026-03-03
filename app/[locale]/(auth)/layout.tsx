import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("authLayout");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <svg viewBox="0 0 32 36" fill="none" className="h-7 w-7 text-[var(--gold)]" aria-hidden="true">
            <path d="M2 2H30V22Q30 34 16 34Q2 34 2 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="8" y="25" fontSize="14" fontWeight="700" fill="currentColor" fontFamily="Georgia, serif">m</text>
          </svg>
          <span className="font-serif text-lg font-bold text-[var(--primary)]">mibegnon</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-slate-400">
        {t("footer", { year: new Date().getFullYear() })}
      </footer>
    </div>
  );
}

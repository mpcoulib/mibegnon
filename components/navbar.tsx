"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/[locale]/(auth)/actions";
import { useTranslations, useLocale } from "next-intl";
import type { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const name = user?.user_metadata?.full_name ?? user?.email ?? "";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  const switchLocale = (newLocale: string) => {
    const strippedPath = pathname.startsWith(`/${locale}`)
      ? pathname.slice(`/${locale}`.length) || "/"
      : pathname;
    const newPath = newLocale === "fr" ? strippedPath : `/${newLocale}${strippedPath}`;
    router.push(newPath);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/bourses", label: t("scholarships") },
    { href: "/universites", label: t("universities") },
    { href: "/soumettre", label: t("submit") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--primary)]/20 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 32 36" fill="none" className="h-8 w-8 text-[var(--gold)]" aria-hidden="true">
            <path d="M2 2H30V22Q30 34 16 34Q2 34 2 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="8" y="25" fontSize="14" fontWeight="700" fill="currentColor" fontFamily="Georgia, serif">m</text>
          </svg>
          <span className="font-serif text-xl font-bold text-[var(--primary)]">mibegnon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--primary)] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Language switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 border border-slate-200 rounded-full px-2 py-1">
            <button
              onClick={() => switchLocale("fr")}
              className={`px-1.5 py-0.5 rounded-full transition-colors ${locale === "fr" ? "bg-[var(--primary)] text-white" : "hover:text-[var(--primary)]"}`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={`px-1.5 py-0.5 rounded-full transition-colors ${locale === "en" ? "bg-[var(--primary)] text-white" : "hover:text-[var(--primary)]"}`}
            >
              EN
            </button>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                  {initials}
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {name.split(" ")[0]}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-10 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-1.5 z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard size={14} /> {t("dashboard")}
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} /> {t("logout")}
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/connexion">{t("login")}</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-[var(--primary)] hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t("menu")}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--primary)]/20 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            {/* Language switcher mobile */}
            <div className="flex items-center gap-2 px-3 py-1">
              <span className="text-xs text-slate-400">Language:</span>
              <button
                onClick={() => { switchLocale("fr"); setIsOpen(false); }}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${locale === "fr" ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-slate-200 text-slate-500"}`}
              >
                FR
              </button>
              <button
                onClick={() => { switchLocale("en"); setIsOpen(false); }}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${locale === "en" ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-slate-200 text-slate-500"}`}
              >
                EN
              </button>
            </div>

            {user ? (
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <LayoutDashboard size={14} /> {t("dashboard")}
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={14} /> {t("logout")}
                  </button>
                </form>
              </div>
            ) : (
              <Button asChild size="sm" className="w-full">
                <Link href="/connexion" onClick={() => setIsOpen(false)}>
                  {t("login")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

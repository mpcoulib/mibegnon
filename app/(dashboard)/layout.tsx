import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";
import { LayoutDashboard, Bookmark, ClipboardList, User, LogOut } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/favoris", label: "Mes favoris", icon: Bookmark },
  { href: "/dashboard/candidatures", label: "Candidatures", icon: ClipboardList },
  { href: "/dashboard/profil", label: "Mon profil", icon: User },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const name = user.user_metadata?.full_name ?? user.email ?? "Utilisateur";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 32 36" fill="none" className="h-7 w-7 text-[var(--gold)]" aria-hidden="true">
            <path d="M2 2H30V22Q30 34 16 34Q2 34 2 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="8" y="25" fontSize="14" fontWeight="700" fill="currentColor" fontFamily="Georgia, serif">m</text>
          </svg>
          <span className="font-serif text-lg font-bold text-[var(--primary)]">mibegnon</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600 hidden sm:block">{name}</span>
          <div className="h-8 w-8 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-slate-200 bg-white px-3 py-6">
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-secondary/50 hover:text-[var(--primary)] transition-colors"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Sign out */}
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Se déconnecter
            </button>
          </form>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-8 max-w-5xl w-full">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white flex items-center justify-around px-2 py-2 z-50">
        {sidebarLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-slate-500 hover:text-[var(--primary)] transition-colors"
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Bookmark, ClipboardList, ArrowRight, GraduationCap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "là";

  const stats = [
    {
      label: "Bourses sauvegardées",
      value: 0,
      icon: Bookmark,
      href: "/dashboard/favoris",
      color: "text-[var(--gold)]",
      bg: "bg-[var(--gold)]/10",
    },
    {
      label: "Candidatures en cours",
      value: 0,
      icon: ClipboardList,
      href: "/dashboard/candidatures",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">
          Akwaba, {firstName} ! 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          On est ensemble — voici ton espace Mibegnon.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md transition-shadow border-slate-200">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-1 text-3xl font-bold text-[var(--primary)]">{value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full ${bg} flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
          Explorer
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-3">
                    <GraduationCap size={20} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Toutes les bourses</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Explore et sauvegarde des bourses qui te correspondent.
                  </p>
                </div>
              </div>
              <Button asChild size="sm" className="mt-4 w-full border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/10">
                <Link href="/bourses" className="flex items-center gap-2">
                  Voir les bourses <ArrowRight size={14} />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-3">
                    <Globe size={20} className="text-[var(--gold)]" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Universités mondiales</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Découvre les universités qui acceptent les étudiants ivoiriens.
                  </p>
                </div>
              </div>
              <Button asChild size="sm" className="mt-4 w-full border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/10">
                <Link href="/universites" className="flex items-center gap-2">
                  Voir les universités <ArrowRight size={14} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Empty state — saved scholarships */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
          Mes bourses sauvegardées
        </h2>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <Bookmark size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="font-medium text-slate-600">Ijioh ! Aucune bourse sauvegardée encore</p>
          <p className="mt-1 text-sm text-slate-400">
            Explore les bourses et clique sur ❤ pour les sauvegarder ici. Ça va aller dêh !
          </p>
          <Button asChild size="sm" className="mt-5 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
            <Link href="/bourses">Explorer les bourses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

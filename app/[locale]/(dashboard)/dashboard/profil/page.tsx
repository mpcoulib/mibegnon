import { createClient } from "@/lib/supabase/server";
import { User, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default async function ProfilPage() {
  const t = await getTranslations("profil");
  const locale = await getLocale();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const name = user?.user_metadata?.full_name ?? "—";
  const email = user?.email ?? "—";
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";
  const initials =
    name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--primary)]">{t("title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("subtitle")}</p>
      </div>

      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[var(--primary)] text-white text-xl font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-800">{name}</p>
              <p className="text-sm text-slate-500">{t("badge")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="pt-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <User size={16} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{t("fullName")}</p>
              <p className="text-sm font-medium text-slate-700">{name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{t("email")}</p>
              <p className="text-sm font-medium text-slate-700">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{t("memberSince")}</p>
              <p className="text-sm font-medium text-slate-700">{createdAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-center text-slate-400">{t("editComingSoon")}</p>
    </div>
  );
}

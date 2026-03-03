import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { forgotPassword } from "../actions";
import { getTranslations } from "next-intl/server";

export default async function MotDePasseOubliePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const t = await getTranslations("forgotPassword");
  const { error, success } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[var(--primary)] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          {t("backToLogin")}
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--primary)]">{t("title")}</h1>
          <p className="mt-1 text-sm text-slate-500">{t("subtitle")}</p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form action={forgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="toi@exemple.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

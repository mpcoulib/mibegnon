import Link from "next/link";
import { signIn } from "../actions";
import { getTranslations } from "next-intl/server";

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const t = await getTranslations("connexion");
  const { error, success } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10">
        <div className="text-center mb-8">
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

        <form action={signIn} className="space-y-4">
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">
                {t("passwordLabel")}
              </label>
              <Link href="/mot-de-passe-oublie" className="text-xs text-[var(--primary)] hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors mt-2"
          >
            {t("submit")}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">{t("or")}</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <p className="text-center text-sm text-slate-500">
          {t("noAccount")}{" "}
          <Link href="/inscription" className="font-semibold text-[var(--primary)] hover:underline">
            {t("createAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}

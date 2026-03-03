import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--primary)]/20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="text-lg font-bold text-[var(--primary)]">Mibegnon</p>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Explorer */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("explore")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/bourses" className="hover:text-[var(--primary)] transition-colors">
                  {t("allScholarships")}
                </Link>
              </li>
              <li>
                <Link href="/universites" className="hover:text-[var(--primary)] transition-colors">
                  {t("globalUniversities")}
                </Link>
              </li>
              <li>
                <Link href="/bourses?type=complete" className="hover:text-[var(--primary)] transition-colors">
                  {t("fullFunding")}
                </Link>
              </li>
              <li>
                <Link href="/bourses?pays=france" className="hover:text-[var(--primary)] transition-colors">
                  {t("studyInFrance")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("myAccount")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/connexion" className="hover:text-[var(--primary)] transition-colors">
                  {t("login")}
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-[var(--primary)] transition-colors">
                  {t("createAccount")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--primary)] transition-colors">
                  {t("myApplications")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/favoris" className="hover:text-[var(--primary)] transition-colors">
                  {t("myFavorites")}
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("about")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/a-propos" className="hover:text-[var(--primary)] transition-colors">
                  {t("ourMission")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-[var(--primary)] transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="hover:text-[var(--primary)] transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Mibegnon. {t("rights")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}

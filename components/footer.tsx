import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--primary)]/20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* 4-column grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="text-lg font-bold text-[var(--primary)]">Mibegnon</p>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Des centaines d&apos;opportunités pour chaque élève ivoirien.
              Gratuit, toujours. Ça va aller — on est ensemble.
            </p>
          </div>

          {/* Explorer */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Explorer
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/bourses" className="hover:text-[var(--primary)] transition-colors">
                  Toutes les bourses
                </Link>
              </li>
              <li>
                <Link href="/universites" className="hover:text-[var(--primary)] transition-colors">
                  Universités mondiales
                </Link>
              </li>
              <li>
                <Link href="/bourses?type=complete" className="hover:text-[var(--primary)] transition-colors">
                  Bourses complètes
                </Link>
              </li>
              <li>
                <Link href="/bourses?pays=france" className="hover:text-[var(--primary)] transition-colors">
                  Études en France
                </Link>
              </li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Mon compte
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/connexion" className="hover:text-[var(--primary)] transition-colors">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-[var(--primary)] transition-colors">
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--primary)] transition-colors">
                  Mes candidatures
                </Link>
              </li>
              <li>
                <Link href="/dashboard/favoris" className="hover:text-[var(--primary)] transition-colors">
                  Mes favoris
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              À propos
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/a-propos" className="hover:text-[var(--primary)] transition-colors">
                  Notre mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-[var(--primary)] transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="hover:text-[var(--primary)] transition-colors">
                  CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Mibegnon. Tous droits réservés.</p>
          <p>
            Fait avec ❤️ pour les élèves de{" "}
            <span className="text-[var(--orange)] font-medium">Côte d&apos;Ivoire</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function ConfidentialitePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-[var(--primary)] px-6 py-16 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            Légal
          </p>
          <h1 className="text-4xl font-bold">Politique de confidentialité</h1>
          <p className="mt-3 text-white/70 text-sm">Dernière mise à jour : février 2026</p>
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl prose prose-slate prose-headings:text-[var(--primary)] prose-headings:font-bold prose-a:text-[var(--primary)]">
          <h2>1. Données collectées</h2>
          <p>
            Mibegnon collecte uniquement les données nécessaires au fonctionnement du service :
          </p>
          <ul>
            <li><strong>Lors de l&apos;inscription :</strong> nom complet, adresse email, mot de passe (hashé).</li>
            <li><strong>Lors de l&apos;utilisation :</strong> bourses sauvegardées, candidatures suivies.</li>
            <li><strong>Automatiquement :</strong> données de navigation anonymes (pages visitées, durée de session) à des fins d&apos;amélioration du service.</li>
          </ul>

          <h2>2. Utilisation des données</h2>
          <p>Tes données sont utilisées exclusivement pour :</p>
          <ul>
            <li>Te permettre d&apos;accéder à ton compte et à tes favoris</li>
            <li>Améliorer les fonctionnalités de la plateforme</li>
            <li>T&apos;envoyer des notifications importantes (avec ton accord)</li>
          </ul>
          <p>
            Mibegnon <strong>ne vend jamais</strong> tes données à des tiers et ne les utilise pas à des fins publicitaires.
          </p>

          <h2>3. Stockage et sécurité</h2>
          <p>
            Tes données sont stockées de manière sécurisée via <strong>Supabase</strong>, hébergé sur des serveurs conformes aux normes européennes (RGPD). Les mots de passe sont hachés et ne sont jamais accessibles en clair.
          </p>

          <h2>4. Tes droits</h2>
          <p>Tu as le droit de :</p>
          <ul>
            <li>Accéder à toutes tes données personnelles</li>
            <li>Demander la correction ou la suppression de tes données</li>
            <li>Exporter tes données</li>
            <li>Te désinscrire à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, écris-nous à{" "}
            <a href="mailto:contact@mibegnon.com">contact@mibegnon.com</a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Mibegnon utilise uniquement des cookies essentiels pour maintenir ta session active. Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.
          </p>

          <h2>6. Contact</h2>
          <p>
            Pour toute question relative à la confidentialité :{" "}
            <a href="mailto:contact@mibegnon.com">contact@mibegnon.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}

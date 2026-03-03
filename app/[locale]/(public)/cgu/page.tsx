export default function CguPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-[var(--primary)] px-6 py-16 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            Légal
          </p>
          <h1 className="text-4xl font-bold">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="mt-3 text-white/70 text-sm">Dernière mise à jour : février 2026</p>
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl prose prose-slate prose-headings:text-[var(--primary)] prose-headings:font-bold prose-a:text-[var(--primary)]">
          <h2>1. Présentation du service</h2>
          <p>
            Mibegnon est une plateforme gratuite qui recense des bourses d&apos;études et des universités mondiales à destination des élèves de Côte d&apos;Ivoire. L&apos;accès au service est libre et sans frais.
          </p>

          <h2>2. Inscription et compte utilisateur</h2>
          <p>
            La création d&apos;un compte est facultative mais recommandée pour sauvegarder des bourses et suivre des candidatures. Tu t&apos;engages à fournir des informations exactes lors de l&apos;inscription et à garder ton mot de passe confidentiel.
          </p>

          <h2>3. Utilisation du service</h2>
          <p>En utilisant Mibegnon, tu t&apos;engages à :</p>
          <ul>
            <li>Ne pas utiliser la plateforme à des fins frauduleuses ou illégales</li>
            <li>Ne pas tenter de pirater, de surcharger ou de perturber le service</li>
            <li>Ne pas créer plusieurs comptes pour contourner d&apos;éventuelles restrictions</li>
          </ul>

          <h2>4. Exactitude des informations</h2>
          <p>
            Mibegnon s&apos;efforce de fournir des informations précises et à jour sur les bourses et universités. Cependant, nous ne pouvons garantir l&apos;exactitude de toutes les données. <strong>Vérifie toujours les informations directement auprès de l&apos;organisme concerné avant de postuler.</strong>
          </p>

          <h2>5. Gratuité</h2>
          <p>
            Mibegnon est et restera <strong>gratuit pour les élèves ivoiriens</strong>. Nous ne prenons aucune commission sur les candidatures et ne demandons aucun paiement pour accéder aux informations.
          </p>

          <h2>6. Propriété intellectuelle</h2>
          <p>
            Le contenu de Mibegnon (textes, design, logo) est protégé. Les informations sur les bourses et universités sont issues de sources publiques.
          </p>

          <h2>7. Suspension de compte</h2>
          <p>
            Mibegnon se réserve le droit de suspendre un compte en cas d&apos;utilisation abusive ou de violation des présentes CGU.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Ces CGU peuvent être modifiées à tout moment. En continuant à utiliser le service après une modification, tu acceptes les nouvelles conditions.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question :{" "}
            <a href="mailto:contact@mibegnon.com">contact@mibegnon.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}

import { Mail, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-[var(--primary)] px-6 py-16 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="text-4xl font-bold">Nous contacter</h1>
          <p className="mt-3 text-white/75">
            Une question, une suggestion, un bug ? On t&apos;écoute dêh.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 text-center">
            <CardContent className="pt-8 pb-7">
              <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-bold text-[var(--primary)] mb-1">Email</h3>
              <p className="text-sm text-slate-500 mb-3">Pour toute question générale</p>
              <a
                href="mailto:contact@mibegnon.com"
                className="text-sm font-medium text-[var(--primary)] hover:underline"
              >
                contact@mibegnon.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-slate-200 text-center">
            <CardContent className="pt-8 pb-7">
              <div className="h-12 w-12 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={22} className="text-[var(--orange)]" />
              </div>
              <h3 className="font-bold text-[var(--primary)] mb-1">Signaler un problème</h3>
              <p className="text-sm text-slate-500 mb-3">Bug, lien cassé, bourse incorrecte</p>
              <a
                href="mailto:bug@mibegnon.com"
                className="text-sm font-medium text-[var(--primary)] hover:underline"
              >
                bug@mibegnon.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-slate-200 text-center sm:col-span-2 lg:col-span-1">
            <CardContent className="pt-8 pb-7">
              <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <Clock size={22} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-bold text-[var(--primary)] mb-1">Temps de réponse</h3>
              <p className="text-sm text-slate-500">
                On répond généralement sous <strong>48 h</strong>. Ça va aller — on est là !
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto max-w-xl mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-8 text-center">
          <p className="font-semibold text-slate-700">Tu veux proposer une bourse ou une université ?</p>
          <p className="mt-1 text-sm text-slate-500">
            Envoie-nous les détails à{" "}
            <a href="mailto:bourses@mibegnon.com" className="text-[var(--primary)] hover:underline font-medium">
              bourses@mibegnon.com
            </a>{" "}
            et on l&apos;étudiera avec plaisir.
          </p>
        </div>
      </section>
    </div>
  );
}

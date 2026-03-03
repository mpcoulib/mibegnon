import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { User } from "@supabase/supabase-js";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar user={user as User | null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

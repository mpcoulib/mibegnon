"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/connexion?error=${encodeURIComponent("Email ou mot de passe incorrect.")}`);
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (password !== confirm) {
    redirect(`/inscription?error=${encodeURIComponent("Les mots de passe ne correspondent pas.")}`);
  }

  if (password.length < 8) {
    redirect(`/inscription?error=${encodeURIComponent("Le mot de passe doit contenir au moins 8 caractères.")}`);
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    redirect(`/inscription?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/inscription?success=${encodeURIComponent("Akwaba dans la famille Mibegnon ! Vérifie ton email pour confirmer ton compte.")}`
  );
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    redirect(`/mot-de-passe-oublie?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/mot-de-passe-oublie?success=${encodeURIComponent("Email envoyé ! Vérifie ta boîte de réception.")}`
  );
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (password !== confirm) {
    redirect(`/auth/reset-password?error=${encodeURIComponent("Les mots de passe ne correspondent pas.")}`);
  }

  if (password.length < 8) {
    redirect(`/auth/reset-password?error=${encodeURIComponent("Le mot de passe doit contenir au moins 8 caractères.")}`);
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/connexion?success=${encodeURIComponent("Mot de passe mis à jour ! Tu peux te connecter.")}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

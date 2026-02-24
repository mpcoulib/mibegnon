"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function toggleBookmark(scholarshipId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const existing = await prisma.savedScholarship.findUnique({
    where: { userId_scholarshipId: { userId: user.id, scholarshipId } },
  });

  if (existing) {
    await prisma.savedScholarship.delete({ where: { id: existing.id } });
  } else {
    await prisma.savedScholarship.create({
      data: { userId: user.id, scholarshipId },
    });
  }

  revalidatePath("/bourses");
  revalidatePath(`/bourses/${scholarshipId}`);
  revalidatePath("/dashboard/favoris");
}

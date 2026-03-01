"use server";
import { prisma } from "@/lib/prisma";

export async function submitScholarship(formData: FormData) {
  const name = formData.get("name") as string;
  const provider = formData.get("provider") as string;
  const country = formData.get("country") as string;
  const link = formData.get("link") as string;
  const description = formData.get("description") as string;
  const isFullFunding = formData.get("isFullFunding") === "true";
  const submitterEmail = formData.get("submitterEmail") as string;
  const submitterNote = formData.get("submitterNote") as string;
  const academicLevels = formData.getAll("academicLevels") as string[];
  const deadlineStr = formData.get("deadline") as string;
  const deadline = deadlineStr ? new Date(deadlineStr) : null;

  if (!name || !provider || !country || !link || !description) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  await prisma.scholarshipSubmission.create({
    data: { name, provider, country, link, description,
            isFullFunding, academicLevels, deadline,
            submitterEmail: submitterEmail || null,
            submitterNote: submitterNote || null },
  });

  return { success: true };
}

"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleBookmark } from "@/lib/actions/bookmarks";

export function SaveButton({
  scholarshipId,
  isSaved: initial,
}: {
  scholarshipId: string;
  isSaved: boolean;
}) {
  const [saved, setSaved] = useState(initial);
  const [isPending, start] = useTransition();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setSaved((prev) => !prev);
    start(() => toggleBookmark(scholarshipId));
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`shrink-0 p-2 rounded-lg border transition-all ${
        saved
          ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-slate-200 bg-white text-slate-400 hover:text-red-400 hover:border-red-200"
      }`}
      aria-label={saved ? "Retirer des favoris" : "Sauvegarder"}
    >
      <Heart size={15} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}

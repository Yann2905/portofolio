"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteSkillButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const del = async () => {
    if (!confirm("Supprimer cette compétence ?")) return;
    setLoading(true);
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      toast.success("Compétence supprimée");
      router.refresh();
    } else {
      toast.error("Échec de la suppression");
    }
  };

  return (
    <button
      onClick={del}
      disabled={loading}
      className="tap rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 disabled:opacity-50"
      title="Supprimer"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}

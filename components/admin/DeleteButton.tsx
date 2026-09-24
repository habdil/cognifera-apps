"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  endpoint,
  label,
}: {
  endpoint: string;
  label: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        toast.error(result?.message || "Gagal menghapus.");
        setDeleting(false);
        return;
      }

      toast.success("Berhasil dihapus.");
      setOpen(false);
      setDeleting(false);
      router.refresh();
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 border border-red-200 hover:border-red-400 text-red-600 px-3 py-1.5 text-xs font-medium transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Hapus
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-none">
          <DialogHeader>
            <DialogTitle>Hapus permanen?</DialogTitle>
            <DialogDescription>
              Anda akan menghapus {label}. Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => setOpen(false)}
              disabled={deleting}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              className="rounded-none"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

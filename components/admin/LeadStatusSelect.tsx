"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "new", label: "Baru" },
  { value: "contacted", label: "Dihubungi" },
  { value: "closed", label: "Selesai" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "border-blue-200 bg-blue-50 text-blue-700",
  contacted: "border-amber-200 bg-amber-50 text-amber-700",
  closed: "border-green-200 bg-green-50 text-green-700",
};

export function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: string;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        toast.error(result?.message || "Gagal memperbarui status.");
      } else {
        router.refresh();
      }
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={updating}
      className={`text-[11px] font-medium border px-2 py-1 tracking-wide cursor-pointer outline-none ${
        STATUS_STYLES[status] ?? "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense-in-depth behind the middleware guard.
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <AdminSidebar adminName={session.name} />
      <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
    </div>
  );
}

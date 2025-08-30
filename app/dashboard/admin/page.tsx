import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";

export default function AdminDashboard() {
  return (
    <DashboardWrapper 
      title="Dashboard Admin Cognifera" 
      requiredRole="ADMIN_COGNIFERA"
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dashboard Admin Cognifera
          </h2>
          <p className="text-gray-600">
            Selamat datang di dashboard Admin Cognifera!
            Halaman ini akan dikembangkan lebih lanjut.
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
}
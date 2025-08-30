import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";

export default function AuthorJournalDashboard() {
  return (
    <DashboardWrapper 
      title="Dashboard Author Journal" 
      requiredRole="AUTHOR_JOURNAL"
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dashboard Author Journal
          </h2>
          <p className="text-gray-600 mb-4">
            Selamat datang di dashboard Author Journal!
          </p>
          <p className="text-gray-500">
            Halaman ini akan dikembangkan lebih lanjut.
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
}
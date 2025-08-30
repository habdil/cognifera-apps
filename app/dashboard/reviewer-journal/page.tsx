import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";

export default function ReviewerJournalDashboard() {
  return (
    <DashboardWrapper 
      title="Dashboard Reviewer Journal" 
      requiredRole="REVIEWER_JOURNAL"
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dashboard Reviewer Journal
          </h2>
          <p className="text-gray-600">
            Selamat datang di dashboard Reviewer Journal!
            Halaman ini akan dikembangkan lebih lanjut.
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
}
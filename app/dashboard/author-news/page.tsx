import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";

export default function AuthorNewsDashboard() {
  return (
    <DashboardWrapper 
      title="Dashboard Author News" 
      requiredRole="AUTHOR_NEWS"
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dashboard Author News
          </h2>
          <p className="text-gray-600">
            Selamat datang di dashboard Author News!
            Halaman ini akan dikembangkan lebih lanjut.
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
}
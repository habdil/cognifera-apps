import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Cognifera",
  description: "Cognifera Dashboard - Manage your content and settings",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
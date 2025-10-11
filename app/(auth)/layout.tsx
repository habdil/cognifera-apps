import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Cognifera",
  description: "Login, Register, and account management for Cognifera",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Auth-specific layout - no navbar/footer, just clean auth pages */}
      {children}
    </div>
  );
}
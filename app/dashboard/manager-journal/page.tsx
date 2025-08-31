"use client";

import { useState, useEffect } from "react";
import { JournalStats } from "@/components/manager-journal/JournalStats";
import { JournalList } from "@/components/manager-journal/JournalList"; 
import { JournalEditor } from "@/components/manager-journal/JournalEditor";
import JournalContentManager from "@/components/manager-journal/JournalContentManager";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { BarChart3, FileText, Edit3, Settings, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser, verifyToken, type User as AuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

type ViewType = "dashboard" | "content" | "submissions" | "settings";

export default function ManagerJournalPage() {
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First check if there's a stored user
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Verify token and get fresh user data
          try {
            const verifiedUser = await verifyToken();
            setUser(verifiedUser);
          } catch (error) {
            console.error('Token verification failed:', error);
            // If verification fails, redirect to login
            router.push('/');
          }
        } else {
          // No user found, redirect to login
          router.push('/');
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <BarChart3 className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Content Management",
      href: "#",
      icon: (
        <Edit3 className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Submissions",
      href: "#",
      icon: (
        <FileText className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleLinkClick = (label: string) => {
    switch (label) {
      case "Dashboard":
        setCurrentView("dashboard");
        break;
      case "Content Management":
        setCurrentView("content");
        break;
      case "Submissions":
        setCurrentView("submissions");
        break;
      case "Settings":
        setCurrentView("settings");
        break;
      default:
        setCurrentView("dashboard");
    }
  };

  const getViewFromLabel = (label: string): ViewType => {
    switch (label) {
      case "Dashboard":
        return "dashboard";
      case "Content Management":
        return "content";
      case "Submissions":
        return "submissions";
      case "Settings":
        return "settings";
      default:
        return "dashboard";
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout berhasil", {
        description: "Anda telah berhasil keluar dari sistem",
        duration: 3000,
      });
      // Small delay to show the toast before redirect
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout gagal", {
        description: "Terjadi kesalahan saat logout, namun Anda tetap akan diarahkan ke halaman utama",
        duration: 4000,
      });
      // Even if logout API fails, clear local data and redirect
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <JournalStats />;
      case "content":
        return <JournalContentManager />;
      case "submissions":
        return <JournalList />;
      case "settings":
        return <SettingsView />;
      default:
        return <JournalStats />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--color-muted)]/30">
        <div className="text-center">
          <div className="text-lg font-medium text-[var(--color-foreground)]">Loading...</div>
          <div className="text-sm text-[var(--color-muted-foreground)]">Verifying authentication</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col md:flex-row bg-[var(--color-muted)]/30 w-full flex-1 mx-auto overflow-hidden", "h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link} 
                  className={currentView === getViewFromLabel(link.label) ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 hover:text-white" : ""}
                  onClick={() => handleLinkClick(link.label)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <SidebarLink
              link={{
                label: user?.fullName || user?.name || "Loading...",
                href: "#",
                icon: (
                  <div className="h-7 w-7 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                    <User className="text-white h-4 w-4" />
                  </div>
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: (
                  <LogOut className="h-5 w-5 text-red-600" />
                ),
              }}
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-6 bg-white flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <div className="font-normal flex space-x-3 items-center text-sm py-1 relative z-20">
      {/* Cognifera Logo */}
      <div className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Cognifera Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="font-medium text-[var(--color-foreground)]">
        <div className="text-lg font-bold">Cognifera</div>
        <div className="text-xs text-[var(--color-muted-foreground)]">Journal Manager</div>
      </div>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Cognifera Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
    </div>
  );
};

function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Settings</h1>
        <p className="text-[var(--color-muted-foreground)]">Configure journal management system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                Default Journal Category
              </label>
              <select className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                <option value="computer-science">Computer Science</option>
                <option value="environmental-science">Environmental Science</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                Auto-publish After Approval
              </label>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-[var(--color-muted-foreground)]">
                  Automatically publish journals after approval
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-foreground)]">Email notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-foreground)]">New submission alerts</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-foreground)]">Review reminders</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
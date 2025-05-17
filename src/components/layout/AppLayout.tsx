import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { UserProfileMenu } from "@/components/user";
import { MobileNavExtension } from "./MobileNavExtension";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <MobileNav />
          <MobileNavExtension />
          <div className="hidden md:block ml-auto">
            <UserProfileMenu />
          </div>
        </div>
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

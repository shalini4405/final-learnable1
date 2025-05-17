
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { UserProfileMenu } from "@/components/user";
import { MobileNavExtension } from "./MobileNavExtension";

export function AppLayout() {
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

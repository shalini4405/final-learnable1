
import { UserProfileMenu, DarkModeToggle } from "@/components/user";

export const MobileNavExtension = () => {
  return (
    <div className="flex items-center gap-2 md:hidden ml-auto">
      <DarkModeToggle />
      <UserProfileMenu />
    </div>
  );
};

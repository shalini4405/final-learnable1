
import { UserProfileMenu } from "@/components/user";

export const MobileNavExtension = () => {
  return (
    <div className="flex items-center md:hidden ml-auto">
      <UserProfileMenu />
    </div>
  );
};


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  LogOut, 
  Settings, 
  Sun, 
  Moon 
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import UserProfileEditDialog from "./UserProfileEditDialog";

const UserProfileMenu: React.FC = () => {
  const { user, isDarkMode, toggleDarkMode, logout } = useUser();
  const navigate = useNavigate();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  
  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
        <User className="mr-2 h-4 w-4" /> Login
      </Button>
    );
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                {isDarkMode ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <UserProfileEditDialog 
        isOpen={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      />
    </>
  );
};

export default UserProfileMenu;

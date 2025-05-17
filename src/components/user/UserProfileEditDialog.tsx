
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

interface UserProfileEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileEditDialog: React.FC<UserProfileEditDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { user, updateUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUser({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated."
    });
    
    onClose();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex justify-center mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>{user ? getInitials(user.name) : "?"}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <Input
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileEditDialog;

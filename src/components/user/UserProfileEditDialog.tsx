
import React, { useState, useRef } from "react";
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
import { Camera } from "lucide-react";

interface UserProfileEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileEditDialog: React.FC<UserProfileEditDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { user, updateUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  
  const [previewImage, setPreviewImage] = useState<string | undefined>(user?.avatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If a file was selected, use the base64 data as the avatar
    const avatarData = previewImage;
    
    updateUser({
      name: formData.name,
      email: formData.email,
      avatar: avatarData,
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
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 cursor-pointer group-hover:opacity-75 transition-opacity" onClick={triggerFileInput}>
                <AvatarImage src={previewImage} alt={formData.name} />
                <AvatarFallback>{user ? getInitials(user.name) : "?"}</AvatarFallback>
              </Avatar>
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={triggerFileInput}
              >
                <div className="bg-black/30 rounded-full p-2">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Click to upload a profile picture
            </p>
          </div>
          
          <div className="grid gap-4">
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

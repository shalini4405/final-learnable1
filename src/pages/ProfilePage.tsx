import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import StreakPointsCard from "@/components/user/StreakPointsCard";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  points: number;
  streak: number;
  isLoggedIn: boolean;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  image: string;
  earnedOn: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  
  // Mock badges
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "badge-1",
      title: "React Master",
      description: "Completed the React course with a score of 90% or higher",
      image: "/placeholder.svg",
      earnedOn: "2023-06-15"
    },
    {
      id: "badge-2",
      title: "JavaScript Fundamentals",
      description: "Successfully completed the JavaScript Fundamentals course",
      image: "/placeholder.svg",
      earnedOn: "2023-05-20"
    }
  ]);
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        bio: parsedUser.bio || "Web developer passionate about learning new technologies",
        avatar: parsedUser.avatar || "/placeholder.svg",
        points: parsedUser.points || 45,
        streak: parsedUser.streak || 3
      });
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        bio: parsedUser.bio || "Web developer passionate about learning new technologies",
      });
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      // Update user information
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        bio: formData.bio
      };
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-80">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-2">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Bio</h4>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
              
              <div className="py-2">
                <StreakPointsCard points={user.points} streak={user.streak} compact={true} />
              </div>
              
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="badges">Skill Badges</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                {isEditing ? (
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
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
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="submit">Save Changes</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                ) : (
                  <CardContent className="pt-6">
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium">Name</dt>
                        <dd className="text-gray-700 mt-1">{user.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium">Email</dt>
                        <dd className="text-gray-700 mt-1">{user.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium">Bio</dt>
                        <dd className="text-gray-700 mt-1">{user.bio}</dd>
                      </div>
                    </dl>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map(badge => (
                  <Card key={badge.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{badge.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Earned on {formatDate(badge.earnedOn)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No courses enrolled yet</h3>
                    <p className="text-gray-600 mt-2">
                      Start learning by enrolling in a course
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/courses">Browse Courses</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

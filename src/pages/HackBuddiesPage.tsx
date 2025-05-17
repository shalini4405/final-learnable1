
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink, MapPin, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { upcomingHackathons } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HackBuddiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const filteredHackathons = upcomingHackathons.filter(hackathon => 
    hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hackathon.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mock team members for demonstration
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Tailwind"],
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sam Rivera",
      role: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB"],
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Taylor Kim",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "User Research"],
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HackBuddies</h1>
        <p className="text-gray-600 mt-2">
          Find upcoming hackathons and connect with potential teammates.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          placeholder="Search hackathons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          Filter by Location
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Hackathons</TabsTrigger>
          <TabsTrigger value="teammates">Find Teammates</TabsTrigger>
          <TabsTrigger value="myteams">My Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map((hackathon) => (
              <Card key={hackathon.id}>
                <CardHeader>
                  <CardTitle>{hackathon.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>Virtual Event</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{hackathon.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Web Development</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">AI/ML</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Open Source</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Find Team
                  </Button>
                  <Button size="sm" asChild>
                    <a href={hackathon.registrationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Register <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="teammates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="myteams" className="mt-4">
          <div className="bg-blue-50 rounded-lg p-6 text-center space-y-4">
            <h3 className="text-xl font-medium">Your Teams Will Appear Here</h3>
            <p className="text-gray-600">Join a hackathon team or create your own to get started</p>
            <Button variant="outline">Create a Team</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-primary/5 rounded-lg p-6 mt-4">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">Organizing a Hackathon?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add your hackathon to our platform to reach passionate developers ready to participate.
          </p>
          <Button>
            Submit a Hackathon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HackBuddiesPage;

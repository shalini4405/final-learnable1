
import { Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingHackathons } from "@/data/mockData";

const HackBuddiesPage = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HackBuddies</h1>
        <p className="text-gray-600 mt-2">
          Find upcoming hackathons and connect with potential teammates.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingHackathons.map((hackathon) => (
          <Card key={hackathon.id}>
            <CardHeader>
              <CardTitle>{hackathon.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{hackathon.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href={hackathon.registrationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Register <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-primary/5 rounded-lg p-6 mt-4">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">Organizing a Hackathon?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add your hackathon to our platform to reach passionate developers ready to participate.
          </p>
          <Button variant="outline">
            Submit a Hackathon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HackBuddiesPage;

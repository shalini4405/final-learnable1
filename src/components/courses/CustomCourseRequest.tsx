import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface CustomCourseRequestProps {
  onRequestComplete?: (roadmap: any) => void;
}

const CustomCourseRequest = ({ onRequestComplete }: CustomCourseRequestProps) => {
  const [request, setRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!request.trim()) {
      toast({
        title: "Please enter your request",
        description: "Describe what you'd like to learn",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate AI response for now
      // In a real implementation, this would call your backend API
      const mockResponse = {
        title: "Custom Learning Path",
        description: request,
        milestones: [
          {
            id: 1,
            title: "Getting Started",
            description: "Foundation concepts and setup",
            resources: [
              { 
                title: "Introduction Guide",
                type: "documentation",
                url: "https://example.com/guide"
              }
            ],
            timeEstimate: "1-2 weeks"
          },
          {
            id: 2,
            title: "Core Concepts",
            description: "Essential principles and practices",
            resources: [
              {
                title: "Core Concepts Tutorial",
                type: "video",
                url: "https://example.com/tutorial"
              }
            ],
            timeEstimate: "2-3 weeks"
          }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onRequestComplete) {
        onRequestComplete(mockResponse);
      }

      toast({
        title: "Custom roadmap created!",
        description: "Your personalized learning path is ready",
      });
    } catch (error) {
      toast({
        title: "Error creating roadmap",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Request Custom Learning Path</CardTitle>
          <CardDescription>
            Describe what you'd like to learn and we'll create a personalized roadmap for you
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Textarea
            placeholder="I want to learn..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Roadmap...
              </>
            ) : (
              'Generate Custom Roadmap'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CustomCourseRequest; 
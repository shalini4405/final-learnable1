import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, Brain, History } from "lucide-react";

const AiRecommendations = () => {
  const [interests, setInterests] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetRecommendation = async () => {
    if (!interests || !learningStyle) {
      toast({
        title: "Missing information",
        description: "Please provide both interests and learning style",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/recommendations/learning-path?interests=${encodeURIComponent(interests)}&learningStyle=${encodeURIComponent(learningStyle)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json();
      setRecommendation(data);
      
      toast({
        title: "Success!",
        description: "Your personalized learning recommendation is ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI recommendation. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Learning Recommendations
          </CardTitle>
          <CardDescription>
            Get personalized learning recommendations powered by AI
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Interests</label>
            <Textarea
              placeholder="e.g., web development, machine learning, UI/UX design"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Learning Style</label>
            <Input
              placeholder="e.g., visual, hands-on, reading"
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full"
            onClick={handleGetRecommendation}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recommendation...
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Get Learning Recommendation
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {recommendation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Your Personalized Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {JSON.stringify(JSON.parse(recommendation), null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiRecommendations; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const interests = [
  { id: 'frontend', label: 'Frontend Development' },
  { id: 'backend', label: 'Backend Development' },
  { id: 'fullstack', label: 'Full Stack Development' },
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'mobile', label: 'Mobile Development' },
  { id: 'devops', label: 'DevOps' },
  { id: 'ai-ml', label: 'AI/Machine Learning' },
  { id: 'data-science', label: 'Data Science' },
];

const experienceLevels = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const CustomizationPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user?.interests || []);
  const [selectedLevel, setSelectedLevel] = useState<string>(user?.experienceLevel || 'beginner');

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "Please select at least one interest",
        variant: "destructive",
      });
      return;
    }

    // Update user preferences
    updateUser({
      interests: selectedInterests,
      experienceLevel: selectedLevel as 'beginner' | 'intermediate' | 'advanced',
      hasCompletedCustomization: true,
    });

    toast({
      title: "Preferences saved!",
      description: "Your learning journey has been customized.",
    });

    // Navigate to roadmaps main page
    navigate('/roadmaps');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Customize Your Learning Journey</CardTitle>
          <CardDescription>
            Help us personalize your experience by selecting your interests and experience level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">What are you interested in learning?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedInterests([...selectedInterests, interest.id]);
                      } else {
                        setSelectedInterests(selectedInterests.filter(i => i !== interest.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={interest.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {interest.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">What's your experience level?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {experienceLevels.map((level) => (
                <div
                  key={level.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedLevel === level.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <h4 className="font-medium">{level.label}</h4>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Start My Learning Journey
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomizationPage; 
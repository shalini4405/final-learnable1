import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Calendar, Clock, Code, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import CustomCourseRequest from "@/components/courses/CustomCourseRequest";

const RoadmapPage = () => {
  const [query, setQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState('roadmaps');
  const { user } = useUser();
  const [generatedRoadmap, setGeneratedRoadmap] = useState<null | {
    title: string;
    description: string;
    milestones: Array<{
      id: number;
      title: string;
      description: string;
      resources: Array<{ title: string; type: string; url: string }>;
      timeEstimate: string;
    }>;
  }>(null);
  
  const { toast } = useToast();
  
  // Calculate roadmap progress based on user's completed milestones
  const calculateRoadmapProgress = (roadmapId: number) => {
    if (!user) return 0;
    
    // In a real app, this would check the user's actual completed milestones
    // For now, return 0 for new users
    return 0;
  };
  
  const sampleRoadmaps = [
    {
      id: 1,
      title: "Frontend Developer Path",
      description: "Master modern frontend development with React, TypeScript, and more",
      milestones: 8,
      totalHours: 120,
      progress: calculateRoadmapProgress(1)
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      description: "Comprehensive path to becoming a full stack developer",
      milestones: 12,
      totalHours: 200,
      progress: calculateRoadmapProgress(2)
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description: "Learn design principles and tools for creating exceptional user experiences",
      milestones: 7,
      totalHours: 90,
      progress: calculateRoadmapProgress(3)
    }
  ];
  
  const handleContinueRoadmap = async (roadmap: typeof sampleRoadmaps[0]) => {
    setGenerating(true);
    
    // Generate prompt based on user's interests and experience level
    const prompt = `Create a detailed learning roadmap for ${roadmap.title} 
    tailored for a ${user?.experienceLevel || 'beginner'} developer 
    with interests in ${user?.interests?.join(', ')}. 
    Include specific milestones and resources.`;

    try {
      // Simulate AI generation (in a real app, this would call an AI service)
      const newRoadmap = {
        title: roadmap.title,
        description: roadmap.description,
        milestones: [
          {
            id: 1,
            title: "Foundation Concepts",
            description: `Essential ${roadmap.title} concepts for ${user?.experienceLevel} level`,
            resources: [
              { 
                title: "Getting Started Guide", 
                type: "documentation",
                url: "#" 
              },
              { 
                title: "Interactive Tutorial", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "2-3 weeks"
          },
          {
            id: 2,
            title: "Building Real Projects",
            description: "Apply your knowledge through practical projects",
            resources: [
              { 
                title: "Project Workshop", 
                type: "video",
                url: "#" 
              },
              { 
                title: "Best Practices Guide", 
                type: "article",
                url: "#" 
              }
            ],
            timeEstimate: "3-4 weeks"
          },
          {
            id: 3,
            title: "Advanced Concepts",
            description: "Master advanced techniques and patterns",
            resources: [
              { 
                title: "Advanced Topics Deep Dive", 
                type: "documentation",
                url: "#" 
              },
              { 
                title: "Expert Interviews", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "4-5 weeks"
          }
        ]
      };
      
      setGeneratedRoadmap(newRoadmap);
      setGenerating(false);
      setCurrentTab('view');
      
      toast({
        title: "Roadmap generated!",
        description: "Your personalized learning path is ready",
      });
    } catch (error) {
      setGenerating(false);
      toast({
        title: "Error generating roadmap",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  
  const handleCustomRoadmapComplete = (roadmap: any) => {
    setGeneratedRoadmap(roadmap);
    setCurrentTab('view');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Career Roadmaps</h1>
        <p className="text-gray-600 mt-2">
          AI-powered custom roadmaps to help you achieve your career goals
        </p>
      </div>
      
      <Tabs defaultValue="roadmaps" onValueChange={setCurrentTab} value={currentTab}>
        <TabsList>
          <TabsTrigger value="roadmaps">My Roadmaps</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          {generatedRoadmap && <TabsTrigger value="view">View Generated</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="roadmaps" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleRoadmaps.map((roadmap) => (
              <Card key={roadmap.id}>
                <CardHeader className="pb-3">
                  <CardTitle>{roadmap.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {roadmap.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{roadmap.milestones} milestones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{roadmap.totalHours} hours</span>
                    </div>
                  </div>
                  {roadmap.progress > 0 ? (
                    <div className="space-y-1">
                      <div className="text-sm flex justify-between">
                        <span>Progress</span>
                        <span className="font-medium">{roadmap.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${roadmap.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleContinueRoadmap(roadmap)}
                      disabled={generating}
                    >
                      {generating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="generate" className="mt-6">
          <CustomCourseRequest onRequestComplete={handleCustomRoadmapComplete} />
        </TabsContent>
        
        {generatedRoadmap && (
          <TabsContent value="view" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{generatedRoadmap.title}</CardTitle>
                <CardDescription>{generatedRoadmap.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {generatedRoadmap.milestones.map((milestone) => (
                    <div key={milestone.id} className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                      
                      <div className="grid gap-4">
                        {milestone.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {resource.type === 'documentation' ? (
                              <FileText className="h-5 w-5 text-gray-500 mr-3" />
                            ) : resource.type === 'video' ? (
                              <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                            ) : (
                              <Code className="h-5 w-5 text-gray-500 mr-3" />
                            )}
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-gray-500 capitalize">
                                {resource.type}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        Estimated time: {milestone.timeEstimate}
                      </div>
                      
                      {milestone.id !== generatedRoadmap.milestones.length && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RoadmapPage;

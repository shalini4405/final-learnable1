
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Calendar, Clock, Code, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const RoadmapPage = () => {
  const [query, setQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState('roadmaps');
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
  
  const sampleRoadmaps = [
    {
      id: 1,
      title: "Frontend Developer Path",
      description: "Master modern frontend development with React, TypeScript, and more",
      milestones: 8,
      totalHours: 120,
      progress: 25
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      description: "Comprehensive path to becoming a full stack developer",
      milestones: 12,
      totalHours: 200,
      progress: 10
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description: "Learn design principles and tools for creating exceptional user experiences",
      milestones: 7,
      totalHours: 90,
      progress: 0
    }
  ];
  
  const handleGenerateRoadmap = () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a description",
        description: "Tell us what kind of roadmap you'd like to generate",
        variant: "destructive",
      });
      return;
    }
    
    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newRoadmap = {
        title: `${query} Roadmap`,
        description: `A customized learning path for ${query}`,
        milestones: [
          {
            id: 1,
            title: "Getting Started",
            description: "Learn the fundamentals and set up your environment",
            resources: [
              { 
                title: "Introduction to the field", 
                type: "article",
                url: "#" 
              },
              { 
                title: "Setting up your workspace", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "1-2 weeks"
          },
          {
            id: 2,
            title: "Core Concepts",
            description: "Master the essential theories and practices",
            resources: [
              { 
                title: "Core principles deep dive", 
                type: "documentation",
                url: "#" 
              },
              { 
                title: "Practical exercises", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "2-3 weeks"
          },
          {
            id: 3,
            title: "Advanced Topics",
            description: "Deepen your knowledge with specialized topics",
            resources: [
              { 
                title: "Advanced techniques", 
                type: "article",
                url: "#" 
              },
              { 
                title: "Case studies", 
                type: "documentation",
                url: "#" 
              }
            ],
            timeEstimate: "3-4 weeks"
          }
        ]
      };
      
      setGeneratedRoadmap(newRoadmap);
      setGenerating(false);
      
      toast({
        title: "Roadmap generated!",
        description: "Your personalized learning path is ready",
      });
    }, 2000);
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
                    <div className="text-sm text-gray-500">Not started yet</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate a Custom Roadmap</CardTitle>
              <CardDescription>
                Describe your goals and our AI will create a personalized learning path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="query" className="text-sm font-medium">
                  What do you want to learn?
                </label>
                <Textarea
                  id="query"
                  placeholder="e.g., I want to become a machine learning engineer with a focus on NLP"
                  className="min-h-[120px]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleGenerateRoadmap} 
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Roadmap</>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Example Prompts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50"
                onClick={() => setQuery("I want to learn frontend development with React and TypeScript")}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <p className="text-sm">I want to learn frontend development with React and TypeScript</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50"
                onClick={() => setQuery("Help me build a career path for UX/UI design")}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="text-sm">Help me build a career path for UX/UI design</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {generatedRoadmap && (
          <TabsContent value="view" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{generatedRoadmap.title}</CardTitle>
                <CardDescription>
                  {generatedRoadmap.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {generatedRoadmap.milestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-4 space-y-3">
                      <div>
                        <h3 className="font-medium">Milestone {milestone.id}: {milestone.title}</h3>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Resources:</h4>
                        <ul className="space-y-2">
                          {milestone.resources.map((resource, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              {resource.type === 'video' && (
                                <div className="mt-0.5 text-red-500 bg-red-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 9 5 3-5 3Z"/><circle cx="12" cy="12" r="10"/></svg>
                                </div>
                              )}
                              {resource.type === 'article' && (
                                <div className="mt-0.5 text-blue-500 bg-blue-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                </div>
                              )}
                              {resource.type === 'documentation' && (
                                <div className="mt-0.5 text-green-500 bg-green-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                </div>
                              )}
                              <a href={resource.url} className="text-primary hover:underline">
                                {resource.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {milestone.timeEstimate}
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentTab('generate')}>
                  Regenerate
                </Button>
                <Button>
                  Save Roadmap
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RoadmapPage;

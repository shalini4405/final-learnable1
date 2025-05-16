
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React with this comprehensive guide",
    type: "article",
    link: "https://reactjs.org/docs/getting-started.html",
    tags: ["react", "frontend", "beginner"],
  },
  {
    id: 2,
    title: "Modern JavaScript Tutorial",
    description: "A modern JavaScript tutorial from the basics to advanced topics",
    type: "documentation",
    link: "https://javascript.info/",
    tags: ["javascript", "frontend", "all-levels"],
  },
  {
    id: 3,
    title: "Building a REST API with Spring Boot",
    description: "Step-by-step video tutorial on creating RESTful APIs",
    type: "video",
    link: "https://www.youtube.com/watch?v=5GNpYjSVLIc",
    tags: ["spring-boot", "java", "backend", "intermediate"],
  },
  {
    id: 4,
    title: "Tailwind CSS Crash Course",
    description: "Learn Tailwind CSS in under an hour",
    type: "video",
    link: "https://www.youtube.com/watch?v=UBOj6rqRUME",
    tags: ["css", "tailwind", "frontend", "beginner"],
  },
  {
    id: 5,
    title: "Introduction to Database Design",
    description: "Learn the fundamentals of database design and normalization",
    type: "documentation",
    link: "https://www.sqlshack.com/database-design/",
    tags: ["database", "sql", "backend", "beginner"],
  },
  {
    id: 6,
    title: "Git & GitHub for Beginners",
    description: "Master version control with Git and GitHub",
    type: "article",
    link: "https://www.freecodecamp.org/news/git-and-github-for-beginners/",
    tags: ["git", "tools", "all-levels"],
  },
];

const ResourceCard = ({ resource }: { resource: typeof resources[0] }) => {
  const getIcon = () => {
    switch (resource.type) {
      case "article":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "documentation":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-lg">{resource.title}</CardTitle>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button variant="outline" size="sm" asChild className="w-full mt-2">
          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Open Resource
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    if (activeTab === "all") {
      return matchesSearch;
    }
    
    return resource.type === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <p className="text-gray-600 mt-2">
          Discover the best resources to enhance your learning journey
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <Separator className="my-4" />
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No resources found matching your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPage;

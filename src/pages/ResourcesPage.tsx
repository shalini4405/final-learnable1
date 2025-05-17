
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, Link as LinkIcon, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Expanded resource data with more learning materials
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
  // New resources added
  {
    id: 7,
    title: "FREE Resources to Learn DevOps 🔥",
    description: "Collection of free resources to learn DevOps",
    type: "documentation",
    link: "https://linuxjourney.com",
    tags: ["devops", "linux", "beginner"],
    sections: [
      { name: "Linux", link: "https://linuxjourney.com" },
      { name: "Bash", link: "https://explainshell.com" },
      { name: "Git", link: "https://learngitbranching.js.org" },
      { name: "Docker", link: "https://docker.com/get-started" },
      { name: "Kubernetes", link: "https://kubernetes.io/docs" },
      { name: "CI/CD", link: "https://freecodecamp.org/news/what-is-ci-cd/" },
      { name: "Monitoring", link: "https://prometheus.io/docs" }
    ]
  },
  {
    id: 8,
    title: "FREE Resources to Learn Web Development 🔥",
    description: "Collection of free resources to learn web development",
    type: "documentation",
    link: "https://developer.mozilla.org/en-US/docs/Web",
    tags: ["web", "frontend", "backend", "beginner"],
    sections: [
      { name: "HTML", link: "https://www.w3schools.com/html/" },
      { name: "CSS", link: "https://web.dev/learn/css/" },
      { name: "JavaScript", link: "https://javascript.info/" },
      { name: "React", link: "https://react.dev/" },
      { name: "Node.js", link: "https://nodejs.dev/learn" },
      { name: "APIs", link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs" },
      { name: "Responsive Design", link: "https://web.dev/learn/design/" }
    ]
  },
  {
    id: 9,
    title: "FREE Resources to Learn Data Science 🔥",
    description: "Collection of free resources to learn data science",
    type: "documentation",
    link: "https://www.kaggle.com/learn",
    tags: ["data-science", "python", "intermediate"],
    sections: [
      { name: "Python", link: "https://docs.python.org/3/tutorial/" },
      { name: "NumPy", link: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
      { name: "Pandas", link: "https://pandas.pydata.org/docs/getting_started/index.html" },
      { name: "Data Visualization", link: "https://matplotlib.org/stable/tutorials/index.html" },
      { name: "Machine Learning", link: "https://www.coursera.org/learn/machine-learning" },
      { name: "Statistics", link: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "SQL", link: "https://sqlzoo.net/" }
    ]
  },
  {
    id: 10,
    title: "FREE Resources to Learn Cloud Computing 🔥",
    description: "Collection of free resources to learn cloud computing",
    type: "documentation",
    link: "https://docs.aws.amazon.com/",
    tags: ["cloud", "aws", "azure", "gcp", "intermediate"],
    sections: [
      { name: "AWS", link: "https://aws.amazon.com/getting-started/" },
      { name: "Azure", link: "https://learn.microsoft.com/en-us/azure/" },
      { name: "GCP", link: "https://cloud.google.com/docs" },
      { name: "Cloud Architecture", link: "https://aws.amazon.com/architecture/" },
      { name: "Serverless", link: "https://www.serverless.com/blog/category/guides-and-tutorials/" },
      { name: "Containers", link: "https://www.docker.com/get-started/" },
      { name: "Microservices", link: "https://microservices.io/patterns/index.html" }
    ]
  }
];

// Enhanced ResourceCard component to handle sectioned resources
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
        
        {resource.sections ? (
          <div className="mt-3 space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Topics:</h4>
            <ul className="space-y-1">
              {resource.sections.map((section, idx) => (
                <li key={idx} className="text-sm">
                  <span className="text-primary">🔹</span>{" "}
                  <a 
                    href={section.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Button variant="outline" size="sm" asChild className="w-full mt-2">
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Open Resource
            </a>
          </Button>
        )}
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

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, GraduationCap, Building2, Globe2 } from "lucide-react";
import { CertificateCourse } from "@/types";

// Sample certificate courses data
const sampleCertificateCourses: CertificateCourse[] = [
  {
    id: "1",
    title: "CS50: Introduction to Computer Science",
    provider: {
      name: "Harvard University",
      type: "university",
      logo: "/images/harvard-logo.png"
    },
    description: "An introduction to computer science and programming with Python, SQL, and JavaScript.",
    duration: "12 weeks",
    level: "Beginner",
    enrollmentUrl: "https://www.edx.org/course/cs50",
    topics: ["Computer Science", "Programming", "Web Development"],
    rating: 4.8,
    totalEnrolled: 3200000,
    isFree: true,
    language: "English",
    skills: ["Python", "JavaScript", "SQL", "Problem Solving"]
  },
  {
    id: "2",
    title: "Machine Learning",
    provider: {
      name: "Stanford University",
      type: "university",
      logo: "/images/stanford-logo.png"
    },
    description: "Learn about machine learning, data mining, and statistical pattern recognition.",
    duration: "11 weeks",
    level: "Intermediate",
    enrollmentUrl: "https://www.coursera.org/learn/machine-learning",
    topics: ["Machine Learning", "AI", "Data Science"],
    rating: 4.9,
    totalEnrolled: 4500000,
    isFree: true,
    language: "English",
    skills: ["Python", "Machine Learning", "Data Analysis"]
  },
  {
    id: "3",
    title: "Google Project Management",
    provider: {
      name: "Google",
      type: "company",
      logo: "/images/google-logo.png"
    },
    description: "Start your career in project management with a Professional Certificate from Google.",
    duration: "6 months",
    level: "Beginner",
    enrollmentUrl: "https://www.coursera.org/professional-certificates/google-project-management",
    topics: ["Project Management", "Agile", "Scrum"],
    rating: 4.7,
    totalEnrolled: 1500000,
    isFree: true,
    language: "English",
    skills: ["Project Management", "Leadership", "Problem Solving"]
  }
];

const CertificateCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<'all' | 'university' | 'company'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filteredCourses = sampleCertificateCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesProvider = selectedProvider === 'all' || course.provider.type === selectedProvider;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesProvider && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Free Certificate Courses</h2>
        <p className="text-gray-600">
          Earn recognized certificates from top universities and companies, completely free!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          
          <select
            className="border rounded-md px-3 py-2"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as any)}
          >
            <option value="all">All Providers</option>
            <option value="university">Universities</option>
            <option value="company">Companies</option>
          </select>
          
          <select
            className="border rounded-md px-3 py-2"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as any)}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {course.provider.type === 'university' ? (
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                ) : (
                  <Building2 className="h-5 w-5 text-green-500" />
                )}
                <span className="text-sm font-medium text-gray-600">
                  {course.provider.name}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{course.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{(course.totalEnrolled / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-4 w-4 text-gray-500" />
                    <span>{course.language}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={course.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                  Enroll Now (Free)
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CertificateCourses; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Trophy, DollarSign, ArrowRight, Briefcase } from "lucide-react";
import { careerPaths, courseResources } from "@/data/mockData";
import { Course, CareerPath, Resource } from "@/types";
import { Button } from "@/components/ui/button";

interface CareerPathsAndResourcesProps {
  course: Course;
  category: string;
}

export const CareerPathsAndResources: React.FC<CareerPathsAndResourcesProps> = ({
  course,
  category
}) => {
  // Get career paths that require this course
  const relevantCareerPaths = careerPaths[category as keyof typeof careerPaths] || [];
  const filteredPaths = relevantCareerPaths.filter(
    path => path.requiredCourses.includes(course.id)
  );

  // Get resources for the category, fallback to business if category not found
  const categoryResources = courseResources[category as keyof typeof courseResources] || 
    courseResources.business || [];

  return (
    <div className="space-y-6">
      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPaths.map((path, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium text-lg">{path.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">{path.averageSalary}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {path.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {categoryResources.map((resource, index) => (
              <li key={index}>
                <Button variant="outline" className="w-full justify-start text-left">
                  <span className="truncate">{resource.title}</span>
                  <span className="ml-auto text-xs text-gray-500">{resource.type}</span>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}; 
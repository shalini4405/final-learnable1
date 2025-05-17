import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Trophy, DollarSign } from "lucide-react";
import { careerPaths, courseResources } from "@/data/mockData";
import { Course } from "@/types";

interface CareerPathsAndResourcesProps {
  course: Course;
  category: "business" | "science" | "mathematics" | "speaking";
}

export function CareerPathsAndResources({ course, category }: CareerPathsAndResourcesProps) {
  const relevantCareerPaths = careerPaths[category]?.filter(
    path => path.requiredCourses.includes(course.id)
  );

  const resources = courseResources[category];

  return (
    <div className="space-y-6">
      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relevantCareerPaths?.map((path, index) => (
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
            <BookOpen className="w-5 h-5 text-primary" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources?.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {resource.title}
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </h3>
                    <Badge className="mt-1">{resource.type}</Badge>
                    <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
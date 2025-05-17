import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Award } from "lucide-react";
import { freeCertifications } from "@/data/freeResources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FreeCertifications = () => {
  const categories = Object.keys(freeCertifications);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Free Certifications</h2>
        <p className="text-gray-600 mt-2">
          Access high-quality certification courses from leading providers at no cost.
        </p>
      </div>

      <Tabs defaultValue={categories[0]} className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freeCertifications[category].map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-1">
                          By {course.provider}
                        </CardDescription>
                      </div>
                      {course.certificate && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        View Course
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FreeCertifications; 

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

const CourseContent = ({ course }: { course: Course }) => {
  // This component displays the course content directly within the app
  return (
    <div className="space-y-4">
      <div className="bg-primary/5 p-4 rounded-lg">
        <h3 className="text-lg font-medium">Course Overview</h3>
        <p className="mt-2">{course.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium">What you'll learn:</h4>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Fundamental concepts and principles</li>
            <li>Practical skills and techniques</li>
            <li>Industry best practices</li>
            <li>Real-world application scenarios</li>
          </ul>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Course Materials</h3>
        <div className="grid gap-3">
          {[1, 2, 3].map((lesson) => (
            <Card key={lesson} className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Lesson {lesson}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {course.title} - Module {lesson}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Start Lesson
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("for-you");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Different views based on tab selection
  const getCoursesByTab = (): Course[] => {
    switch(currentTab) {
      case "beginner":
        return filteredCourses.filter(course => course.level === "Beginner");
      case "intermediate":
        return filteredCourses.filter(course => course.level === "Intermediate");
      case "advanced":
        return filteredCourses.filter(course => course.level === "Advanced");
      case "for-you":
      default:
        return filteredCourses;
    }
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-gray-600 mt-2">
          Improve your design skills through interactive, hands-on professional courses.
        </p>
      </div>
      
      {selectedCourse ? (
        <div className="space-y-6">
          <Button 
            variant="outline" 
            onClick={handleBackToList} 
            className="mb-4"
          >
            ← Back to Course List
          </Button>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/10 text-primary font-medium">
              {selectedCourse.shortCode}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                selectedCourse.level === "Beginner" 
                  ? "bg-green-100 text-green-800" 
                  : selectedCourse.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}>
                {selectedCourse.level}
              </span>
            </div>
          </div>

          <CourseContent course={selectedCourse} />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs 
              defaultValue="for-you" 
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCoursesByTab().map((course) => (
              <Card 
                key={course.id}
                className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/10 text-primary font-medium">
                      {course.shortCode}
                    </div>
                    <span className={`skill-level-badge ${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.totalHours} hours
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {getCoursesByTab().length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;

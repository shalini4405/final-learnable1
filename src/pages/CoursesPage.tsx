
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("for-you");
  
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
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-gray-600 mt-2">
          Improve your design skills through interactive, hands-on professional courses.
        </p>
      </div>
      
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
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/10 text-primary font-medium">
                {course.shortCode}
              </div>
              <span className={`skill-level-badge ${course.level.toLowerCase()}`}>
                {course.level}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{course.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="progress-indicator">
                <div 
                  className="progress-bar bg-primary" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">
                {course.totalHours} hours
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {getCoursesByTab().length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;

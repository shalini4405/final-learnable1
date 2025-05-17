import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, GraduationCap, Building2, Globe2, Search } from "lucide-react";
import { freeCertificateCourses } from '@/data/freeCertificates';
import { CertificateCourse } from '@/types';

const FreeCertificateCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = Object.keys(freeCertificateCourses);
  const allCourses = Object.values(freeCertificateCourses).flat();

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                          Object.entries(freeCertificateCourses).find(([cat, courses]) => 
                            courses.includes(course) && cat === selectedCategory);
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={course.provider.logo}
                  alt={course.provider.name}
                  className="h-8 w-8 object-contain"
                />
                <div>
                  <span className="text-sm font-medium">{course.provider.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {course.provider.type}
                  </Badge>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{(course.totalEnrolled / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                  {course.topics.length > 3 && (
                    <Badge variant="outline">+{course.topics.length - 3}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                asChild
              >
                <a href={course.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
              {course.certificateUrl && (
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FreeCertificateCourses; 
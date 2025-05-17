import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, CheckCircle } from "lucide-react";
import { Course } from "@/types";

interface CourseProgressProps {
  course: Course;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ course }) => {
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [todayMinutes, setTodayMinutes] = useState<number>(0);

  useEffect(() => {
    // Load progress data from localStorage
    const savedProgress = localStorage.getItem(`course_${course.id}_progress`);
    const savedTimeSpent = localStorage.getItem(`course_${course.id}_total_time`);
    const savedCompletedLessons = localStorage.getItem(`course_${course.id}_completed_lessons`);

    if (savedProgress) setProgress(parseInt(savedProgress));
    if (savedTimeSpent) setTimeSpent(parseInt(savedTimeSpent));
    if (savedCompletedLessons) setCompletedLessons(JSON.parse(savedCompletedLessons));

    if (course.endDate) {
      const end = new Date(course.endDate);
      const now = new Date();
      const diffTime = Math.abs(end.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    }

    // Calculate today's progress
    const today = new Date().toISOString().split('T')[0];
    const todayProgress = course.dailyProgress?.find(p => p.date === today);
    setTodayMinutes(todayProgress?.minutesSpent || 0);
  }, [course]);

  // Calculate estimated time remaining
  const estimatedTimeRemaining = Math.max(0, course.totalHours * 60 - timeSpent);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Course Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Completed Lessons</span>
            </div>
            <span>{completedLessons.length}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>Time Remaining</span>
            </div>
            <span>
              {Math.floor(estimatedTimeRemaining / 60)}h {estimatedTimeRemaining % 60}m
            </span>
          </div>
        </div>

        {progress === 100 && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            🎉 Congratulations! You've completed this course.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseProgress; 
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target } from "lucide-react";
import { Course } from "@/types";

interface CourseProgressProps {
  course: Course;
}

const CourseProgress = ({ course }: CourseProgressProps) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [todayMinutes, setTodayMinutes] = useState<number>(0);

  useEffect(() => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Course Timeline</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {course.startDate && formatDate(course.startDate)} - {course.endDate && formatDate(course.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{daysLeft} days remaining</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Daily Target</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{course.dailyTargetMinutes} minutes per day</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Today's Progress</span>
            <span>{todayMinutes} / {course.dailyTargetMinutes} min</span>
          </div>
          <Progress 
            value={(todayMinutes / (course.dailyTargetMinutes || 1)) * 100} 
            className="h-2"
          />
        </div>
      </div>
    </Card>
  );
};

export default CourseProgress; 
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target } from "lucide-react";
import { Course } from "@/types";
import { format, differenceInDays, addDays } from 'date-fns';

interface TimeManagementProps {
  course: Course;
  onUpdateTimeTarget?: (minutes: number) => void;
}

const TimeManagement = ({ course, onUpdateTimeTarget }: TimeManagementProps) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);

  useEffect(() => {
    if (course.startDate && course.endDate) {
      const end = new Date(course.endDate);
      const now = new Date();
      setDaysLeft(Math.max(0, differenceInDays(end, now)));
    }

    // Calculate today's progress
    const today = new Date().toISOString().split('T')[0];
    const todayProgress = course.dailyProgress?.find(p => p.date === today);
    setTodayMinutes(todayProgress?.minutesSpent || 0);
  }, [course]);

  const calculateDailyProgress = () => {
    const targetMinutes = course.dailyTargetMinutes || 60;
    return Math.min(100, (todayMinutes / targetMinutes) * 100);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Time Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily Target */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Daily Target</span>
            </div>
            <span className="font-medium">{course.dailyTargetMinutes || 60} mins</span>
          </div>
          <Progress value={calculateDailyProgress()} className="h-2" />
          <p className="text-sm text-gray-500">
            Today's progress: {todayMinutes} mins
          </p>
        </div>

        {/* Course Timeline */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">Course Timeline</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Start Date:</span>
              <span>{course.startDate ? format(new Date(course.startDate), 'MMM d, yyyy') : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">End Date:</span>
              <span>{course.endDate ? format(new Date(course.endDate), 'MMM d, yyyy') : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Days Left:</span>
              <span className="font-medium">{daysLeft} days</span>
            </div>
          </div>
        </div>

        {/* Time Statistics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">Time Statistics</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Hours Required:</span>
              <span>{course.totalHours || 0} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Completed Hours:</span>
              <span>{course.completedHours || 0} hours</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeManagement; 
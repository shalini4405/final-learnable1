import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target } from "lucide-react";
import { Course } from "@/types";
import { format, differenceInDays, addDays } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface TimeManagementProps {
  course: Course;
}

const TimeManagement: React.FC<TimeManagementProps> = ({ course }) => {
  const { toast } = useToast();
  const [isStudying, setIsStudying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (course.startDate && course.endDate) {
      const end = new Date(course.endDate);
      const now = new Date();
      setDaysLeft(Math.max(0, differenceInDays(end, now)));
    }

    // Load today's study time
    const today = new Date().toISOString().split('T')[0];
    const savedTime = localStorage.getItem(`course_${course.id}_study_time_${today}`);
    if (savedTime) {
      setTodayMinutes(parseInt(savedTime));
    }

    // Check for any ongoing session
    const savedSession = localStorage.getItem(`course_${course.id}_ongoing_session`);
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setIsStudying(true);
      setStartTime(new Date(session.startTime));
    }
  }, [course.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isStudying && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setSessionTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStudying, startTime]);

  const handleStartStudying = () => {
    const now = new Date();
    setIsStudying(true);
    setStartTime(now);
    setSessionTime(0);

    // Save session start
    localStorage.setItem(`course_${course.id}_ongoing_session`, JSON.stringify({
      startTime: now.toISOString()
    }));

    toast({
      title: "Study Session Started",
      description: "Your study time is now being tracked."
    });
  };

  const handleStopStudying = () => {
    if (!startTime) return;

    const now = new Date();
    const sessionMinutes = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    
    // Update today's total
    const today = now.toISOString().split('T')[0];
    const newTotal = todayMinutes + sessionMinutes;
    setTodayMinutes(newTotal);
    localStorage.setItem(`course_${course.id}_study_time_${today}`, newTotal.toString());

    // Update total course time
    const totalTime = parseInt(localStorage.getItem(`course_${course.id}_total_time`) || '0');
    localStorage.setItem(`course_${course.id}_total_time`, (totalTime + sessionMinutes).toString());

    // Clear session
    setIsStudying(false);
    setStartTime(null);
    setSessionTime(0);
    localStorage.removeItem(`course_${course.id}_ongoing_session`);

    toast({
      title: "Study Session Completed",
      description: `You studied for ${sessionMinutes} minutes. Great job!`
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

        {isStudying ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">
                {formatTime(sessionTime)}
              </div>
              <div className="text-sm text-gray-500">Current Session</div>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleStopStudying}
            >
              End Session
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full"
            onClick={handleStartStudying}
          >
            Start Studying
          </Button>
        )}

        {todayMinutes >= course.dailyTargetMinutes && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            🎯 You've reached your daily study goal!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeManagement; 
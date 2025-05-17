
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface TimeTrackerProps {
  courseId: string;
  lessonId: number;
  onTimeUpdate: (seconds: number) => void;
}

const TimeTracker = ({ courseId, lessonId, onTimeUpdate }: TimeTrackerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Load saved time from localStorage when component mounts
  useEffect(() => {
    const savedTime = localStorage.getItem(`course_${courseId}_lesson_${lessonId}_time`);
    if (savedTime) {
      setSeconds(parseInt(savedTime));
    }
  }, [courseId, lessonId]);

  // Save time to localStorage whenever it changes
  useEffect(() => {
    if (seconds > 0) {
      localStorage.setItem(`course_${courseId}_lesson_${lessonId}_time`, seconds.toString());
      onTimeUpdate(seconds);
    }
  }, [seconds, courseId, lessonId, onTimeUpdate]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      toast({
        title: "Timer started",
        description: "Your learning time is now being tracked"
      });
    } else {
      toast({
        title: "Timer paused",
        description: `You've spent ${formatTime(seconds)} on this lesson`
      });
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <span className="font-medium">Learning Time:</span> 
            <span className="text-lg font-semibold">{formatTime(seconds)}</span>
          </div>
          <button
            onClick={toggleTimer}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              isActive ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {isActive ? "Pause" : "Start"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTracker;

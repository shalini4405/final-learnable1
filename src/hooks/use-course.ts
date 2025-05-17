import { useState, useEffect } from 'react';
import { Course } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

interface CourseState {
  progress: number;
  timeSpent: number;
  completedLessons: number[];
  currentLesson: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useCourse = (course: Course) => {
  const { toast } = useToast();
  const { user, updateUser } = useUser();
  const [state, setState] = useState<CourseState>({
    progress: 0,
    timeSpent: 0,
    completedLessons: [],
    currentLesson: null,
    isLoading: true,
    error: null
  });

  // Load course state from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`course_${course.id}_progress`);
      const savedTimeSpent = localStorage.getItem(`course_${course.id}_total_time`);
      const savedCompletedLessons = localStorage.getItem(`course_${course.id}_completed_lessons`);
      const savedCurrentLesson = localStorage.getItem(`course_${course.id}_current_lesson`);

      setState({
        progress: savedProgress ? parseInt(savedProgress) : 0,
        timeSpent: savedTimeSpent ? parseInt(savedTimeSpent) : 0,
        completedLessons: savedCompletedLessons ? JSON.parse(savedCompletedLessons) : [],
        currentLesson: savedCurrentLesson ? parseInt(savedCurrentLesson) : null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load course progress'
      }));
      
      toast({
        title: "Error",
        description: "Failed to load course progress. Please try again.",
        variant: "destructive"
      });
    }
  }, [course.id, toast]);

  // Update course progress
  const updateProgress = (newProgress: number) => {
    try {
      setState(prev => ({ ...prev, progress: newProgress }));
      localStorage.setItem(`course_${course.id}_progress`, newProgress.toString());

      // Update user's course progress if enrolled
      if (user) {
        const updatedUser = {
          ...user,
          coursesEnrolled: user.coursesEnrolled.includes(course.id)
            ? user.coursesEnrolled
            : [...user.coursesEnrolled, course.id]
        };
        updateUser(updatedUser);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Complete a lesson
  const completeLesson = (lessonId: number) => {
    try {
      const newCompletedLessons = [...state.completedLessons, lessonId];
      setState(prev => ({ ...prev, completedLessons: newCompletedLessons }));
      localStorage.setItem(`course_${course.id}_completed_lessons`, JSON.stringify(newCompletedLessons));
      localStorage.setItem(`course_${course.id}_lesson_${lessonId}_quiz`, 'completed');

      // Calculate new progress
      const totalLessons = course.totalLessons || 1;
      const newProgress = Math.round((newCompletedLessons.length / totalLessons) * 100);
      updateProgress(newProgress);

      toast({
        title: "Lesson Completed",
        description: "Your progress has been saved."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark lesson as completed. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Set current lesson
  const setCurrentLesson = (lessonId: number | null) => {
    try {
      setState(prev => ({ ...prev, currentLesson: lessonId }));
      if (lessonId) {
        localStorage.setItem(`course_${course.id}_current_lesson`, lessonId.toString());
      } else {
        localStorage.removeItem(`course_${course.id}_current_lesson`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update current lesson. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update time spent
  const updateTimeSpent = (minutes: number) => {
    try {
      const newTotal = state.timeSpent + minutes;
      setState(prev => ({ ...prev, timeSpent: newTotal }));
      localStorage.setItem(`course_${course.id}_total_time`, newTotal.toString());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update study time. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Reset course progress
  const resetProgress = () => {
    try {
      setState({
        progress: 0,
        timeSpent: 0,
        completedLessons: [],
        currentLesson: null,
        isLoading: false,
        error: null
      });

      localStorage.removeItem(`course_${course.id}_progress`);
      localStorage.removeItem(`course_${course.id}_total_time`);
      localStorage.removeItem(`course_${course.id}_completed_lessons`);
      localStorage.removeItem(`course_${course.id}_current_lesson`);

      // Remove all lesson quiz completions
      for (let i = 1; i <= (course.totalLessons || 0); i++) {
        localStorage.removeItem(`course_${course.id}_lesson_${i}_quiz`);
      }

      toast({
        title: "Progress Reset",
        description: "Your course progress has been reset."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset course progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    ...state,
    updateProgress,
    completeLesson,
    setCurrentLesson,
    updateTimeSpent,
    resetProgress
  };
}; 
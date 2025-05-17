import { useState, useEffect } from "react";
import { FileText, BookOpen, FileVideo } from "lucide-react";
import { Card } from "@/components/ui/card";
import TimeTracker from "./TimeTracker";
import Quiz, { QuizQuestion } from "./Quiz";
import { useUser } from "@/contexts/UserContext";
import PaymentPrompt from "./PaymentPrompt";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Course } from "@/types";

interface LessonContentProps {
  course: Course;
  lessonId: number;
  title: string;
  content: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  resources: {
    title: string;
    type: "video" | "article" | "documentation";
    content: string;
    url?: string;
  }[];
  quizQuestions: QuizQuestion[];
}

const VideoPlayer = ({ url, title }: { url: string; title: string }) => {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Invalid video URL. Please check the URL and try again.
      </div>
    );
  }

  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </AspectRatio>
  );
};

const LessonContent = ({ course, lessonId, title, content, level, resources, quizQuestions }: LessonContentProps) => {
  const { user } = useUser();
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [hasAccess, setHasAccess] = useState(user.isLevelAccessible(level.toLowerCase()));

  // Get level price based on level name
  const getLevelPrice = (level: string): number => {
    if (level.toLowerCase() === "beginner") return 0;
    return 49; // ₹49 for all other levels
  };
  
  // Check if quiz was already completed
  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem(`course_${course.id}_lesson_${lessonId}_progress`);
    if (savedProgress) {
      setTimeSpent(parseInt(savedProgress));
    }

    const quizStatus = localStorage.getItem(`course_${course.id}_lesson_${lessonId}_quiz`);
    if (quizStatus === "completed") {
      setQuizCompleted(true);
    }
    
    // Check if the user has access to this level
    setHasAccess(user.isLevelAccessible(level.toLowerCase()));
  }, [course.id, lessonId, level, user.isLevelAccessible]);

  const updateDailyProgress = (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    const currentProgress = course.dailyProgress || [];
    const todayIndex = currentProgress.findIndex(p => p.date === today);

    if (todayIndex === -1) {
      currentProgress.push({ date: today, minutesSpent: minutes });
    } else {
      currentProgress[todayIndex].minutesSpent += minutes;
    }

    // Update course in localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const courseIndex = courses.findIndex((c: Course) => c.id === course.id);
    if (courseIndex !== -1) {
      courses[courseIndex].dailyProgress = currentProgress;
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  };

  const handleTimeUpdate = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    setTimeSpent(seconds);
    localStorage.setItem(`course_${course.id}_lesson_${lessonId}_progress`, seconds.toString());
    updateDailyProgress(minutes);
  };

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizScore(score);
    localStorage.setItem(`course_${course.id}_lesson_${lessonId}_quiz`, "completed");
    
    // Mark the level as completed if the score is high enough (e.g., > 70%)
    if (score > 70) {
      user.updateLevelStatus(level.toLowerCase(), { completed: true });
    }
  };

  const getIconForResourceType = (type: "video" | "article" | "documentation") => {
    switch (type) {
      case "video":
        return <FileVideo className="h-5 w-5 text-blue-500" />;
      case "article":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "documentation":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  // If user doesn't have access to this level, show payment prompt
  if (!hasAccess && level.toLowerCase() !== "beginner") {
    return (
      <div className="max-w-md mx-auto my-8">
        <PaymentPrompt 
          level={level} 
          price={getLevelPrice(level)} 
          onAccessGranted={handleAccessGranted} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TimeTracker onTimeUpdate={handleTimeUpdate} />

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-none" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-3">
              {resource.type === "video" ? (
                <FileVideo className="w-5 h-5 mt-1" />
              ) : resource.type === "article" ? (
                <FileText className="w-5 h-5 mt-1" />
              ) : (
                <BookOpen className="w-5 h-5 mt-1" />
              )}
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: resource.content }} className="text-sm text-gray-600 mt-1" />
                {resource.url && resource.type === "video" && (
                  <div className="mt-3">
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        src={resource.url}
                        title={resource.title}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!quizCompleted && (
        <Quiz
          courseId={course.id}
          lessonId={lessonId}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default LessonContent;

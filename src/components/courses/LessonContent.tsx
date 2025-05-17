
import { useState, useEffect } from "react";
import { FileText, BookOpen, FileVideo } from "lucide-react";
import { Card } from "@/components/ui/card";
import TimeTracker from "./TimeTracker";
import Quiz, { QuizQuestion } from "./Quiz";

interface LessonContentProps {
  courseId: string;
  lessonId: number;
  title: string;
  content: string;
  resources: {
    title: string;
    type: "video" | "article" | "documentation";
    content: string;
  }[];
  quizQuestions: QuizQuestion[];
}

const LessonContent = ({ 
  courseId, 
  lessonId, 
  title, 
  content, 
  resources, 
  quizQuestions 
}: LessonContentProps) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Check if quiz was already completed
  useEffect(() => {
    const completed = localStorage.getItem(`course_${courseId}_lesson_${lessonId}_quiz`);
    const savedScore = localStorage.getItem(`course_${courseId}_lesson_${lessonId}_score`);
    
    if (completed === "completed" && savedScore) {
      setQuizCompleted(true);
      setQuizScore(parseInt(savedScore));
    }
  }, [courseId, lessonId]);

  const handleTimeUpdate = (seconds: number) => {
    setTimeSpent(seconds);
  };

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizScore(score);
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

  return (
    <div className="space-y-6">
      <TimeTracker 
        courseId={courseId} 
        lessonId={lessonId} 
        onTimeUpdate={handleTimeUpdate} 
      />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {resources.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Lesson Resources</h3>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3">
                  {getIconForResourceType(resource.type)}
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </div>
                </div>
                <div className="mt-3 pl-8 prose-sm">
                  <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {quizCompleted ? (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Quiz Completed</h3>
              <p className="text-sm text-gray-600">
                You scored {quizScore}% on this lesson's quiz
              </p>
              <button 
                className="text-sm text-primary font-medium mt-2"
                onClick={() => setQuizCompleted(false)}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Quiz 
          courseId={courseId} 
          lessonId={lessonId} 
          questions={quizQuestions} 
          onComplete={handleQuizComplete} 
        />
      )}
    </div>
  );
};

export default LessonContent;

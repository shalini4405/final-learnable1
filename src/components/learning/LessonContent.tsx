import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Course } from "@/types";

interface LessonContentProps {
  course: Course;
  lessonId: number;
  title: string;
  content: string;
  resources: Array<{
    title: string;
    type: 'video' | 'article' | 'documentation';
    content: string;
    url?: string;
  }>;
  quizQuestions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  level: string;
}

const LessonContent: React.FC<LessonContentProps> = ({
  course,
  lessonId,
  title,
  content,
  resources,
  quizQuestions,
  level
}) => {
  const { toast } = useToast();
  const { user, updateUser } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${course.id}_lesson_${lessonId}_progress`);
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }

    const quizStatus = localStorage.getItem(`course_${course.id}_lesson_${lessonId}_quiz`);
    if (quizStatus === 'completed') {
      setQuizCompleted(true);
    }
  }, [course.id, lessonId]);

  // Save progress
  useEffect(() => {
    localStorage.setItem(`course_${course.id}_lesson_${lessonId}_progress`, progress.toString());
  }, [progress, course.id, lessonId]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      const correctAnswers = selectedAnswers.filter(
        (answer, index) => answer === quizQuestions[index].correctAnswer
      ).length;
      const score = (correctAnswers / quizQuestions.length) * 100;

      // Update progress and mark quiz as completed
      setProgress(100);
      setQuizCompleted(true);
      localStorage.setItem(`course_${course.id}_lesson_${lessonId}_quiz`, 'completed');

      // Update user progress
      if (user) {
        const updatedUser = {
          ...user,
          coursesEnrolled: [...user.coursesEnrolled, course.id],
          completedLevels: [...user.completedLevels, `${course.id}_${lessonId}`]
        };
        updateUser(updatedUser);
      }

      // Show completion message
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score.toFixed(0)}% on this lesson's quiz.`
      });
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setProgress(75); // Mark content as read
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {!showQuiz ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
                <div className="grid gap-4">
                  {resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {resource.content}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button onClick={handleStartQuiz} disabled={quizCompleted}>
                  {quizCompleted ? 'Quiz Completed' : 'Take Quiz'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lesson Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </h3>
                <p className="text-gray-600 mb-4">{currentQuestion.question}</p>
                
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default LessonContent; 
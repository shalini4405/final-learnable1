
import { useState, useEffect } from "react";
import { FileText, Award } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import SkillBadge from "./SkillBadge";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  courseId: string;
  lessonId: number;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz = ({ courseId, lessonId, questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [courseName, setCourseName] = useState("Web Development");

  // Check if quiz was already completed
  useEffect(() => {
    const completed = localStorage.getItem(`course_${courseId}_lesson_${lessonId}_quiz`);
    const savedScore = localStorage.getItem(`course_${courseId}_lesson_${lessonId}_score`);
    
    if (completed === "completed" && savedScore) {
      setQuizCompleted(true);
      setScore(parseInt(savedScore));
    }
    
    // Mock course name (in a real app, you'd fetch this from a database)
    switch (courseId) {
      case "react":
        setCourseName("React Fundamentals");
        break;
      case "js":
        setCourseName("JavaScript Essentials");
        break;
      default:
        setCourseName("Web Development");
    }
  }, [courseId, lessonId]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
      onComplete(finalScore);

      // Save quiz completion to localStorage
      localStorage.setItem(`course_${courseId}_lesson_${lessonId}_quiz`, "completed");
      localStorage.setItem(`course_${courseId}_lesson_${lessonId}_score`, finalScore.toString());
      
      // Add course completion to localStorage if this is the last lesson
      // This is a mock implementation - in a real app, you'd check if this is the final lesson
      const isLastLesson = lessonId === 5; // Mock assumption
      if (isLastLesson && finalScore >= 70) {
        const completedCourses = JSON.parse(localStorage.getItem("completedCourses") || "[]");
        
        // Check if course already completed
        if (!completedCourses.includes(courseId)) {
          completedCourses.push(courseId);
          localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
          
          // Save badge information
          const badges = JSON.parse(localStorage.getItem("earnedBadges") || "[]");
          badges.push({
            id: `badge-${courseId}`,
            courseId: courseId,
            courseName: courseName,
            completionDate: new Date().toISOString(),
            score: finalScore
          });
          localStorage.setItem("earnedBadges", JSON.stringify(badges));
          
          // Show badge
          setShowBadge(true);
        }
      }
      
      toast({
        title: "Quiz completed!",
        description: `You scored ${finalScore}%`
      });
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowBadge(false);
  };

  if (questions.length === 0) {
    return <div>No quiz questions available</div>;
  }

  // Show the skill badge if earned
  if (showBadge) {
    return (
      <div className="mt-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-gray-600">
            You've earned a skill badge for completing this course with a score of {score}%
          </p>
        </div>
        
        <SkillBadge
          courseId={courseId}
          courseName={courseName}
          completionDate={new Date()}
          score={score}
        />
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleRetake}>Retake Quiz</Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quiz Results
          </CardTitle>
          <CardDescription>You've completed the quiz!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-4">{score}%</div>
            <p className="text-lg">
              You got {questions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length} out of {questions.length} questions correct
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleRetake} variant="outline">Retake Quiz</Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Complete all lessons to earn your certificate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Lesson Quiz
        </CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <RadioGroup value={selectedAnswers[currentQuestion]?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50">
                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                  <label htmlFor={`option-${idx}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;

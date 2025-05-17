import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Moon, Sun } from 'lucide-react';
import FlashCard from '@/components/learning/FlashCard';
import GameQuiz from '@/components/learning/GameQuiz';
import PowerUps from '@/components/learning/PowerUps';
import StatsAndAchievements from '@/components/learning/StatsAndAchievements';
import Leaderboard from '@/components/learning/Leaderboard';
import AddFlashCard from '@/components/learning/AddFlashCard';
import { useToast } from "@/components/ui/use-toast";
import { useLearning } from "@/contexts/LearningContext";
import { PowerUp } from '@/types/learning';

const LearningPage = () => {
  const { toast } = useToast();
  const { 
    isDarkMode,
    toggleDarkMode,
    stats,
    updateStats,
    unlockAchievement,
    updateLeaderboard,
    flashcards
  } = useLearning();

  const [showAddCard, setShowAddCard] = useState(false);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    { type: 'doublePoints', icon: '⚡', active: false },
    { type: 'extraLife', icon: '❤️', active: false },
    { type: 'timeFreeze', icon: '⌛', active: false, duration: 10 },
    { type: 'skipQuestion', icon: '⏭️', active: false },
    { type: 'fiftyFifty', icon: '½', active: false },
    { type: 'hint', icon: '💡', active: false },
    { type: 'extraTime', icon: '⏰', active: false, duration: 15 }
  ]);

  // Sample flashcards data
  const sampleFlashcards = [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces",
      category: "Frontend",
      hint: "Think about UI components",
      image: "https://example.com/react-logo.png"
    },
    {
      id: 2,
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript",
      category: "React Basics",
      hint: "It looks like HTML in JS"
    },
    {
      id: 3,
      question: "What is a React Component?",
      answer: "A reusable piece of UI that can contain its own logic and styling",
      category: "React Basics",
      hint: "Think about reusability"
    }
  ];

  // Sample quiz questions with different difficulties
  const quizQuestions = {
    easy: [
      {
        id: 1,
        question: "Which hook is used for side effects in React?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 0,
        points: 100,
        timeLimit: 30,
        category: "React Hooks",
        difficulty: "easy" as const,
        hint: "Think about actions that happen after rendering"
      }
    ],
    medium: [
      {
        id: 2,
        question: "What is the virtual DOM?",
        options: [
          "A direct copy of the real DOM",
          "A lightweight copy of the real DOM used for performance optimization",
          "A new web browser feature",
          "A JavaScript engine"
        ],
        correctAnswer: 1,
        points: 150,
        timeLimit: 45,
        category: "React Concepts",
        difficulty: "medium" as const,
        hint: "It's related to React's performance optimization"
      }
    ],
    hard: [
      {
        id: 3,
        question: "Explain React's reconciliation algorithm",
        options: [
          "It's the process of updating the virtual DOM and making the minimum necessary changes to the real DOM",
          "It's a way to merge multiple components",
          "It's the process of creating components",
          "It's a method to handle state updates"
        ],
        correctAnswer: 0,
        points: 200,
        timeLimit: 60,
        category: "Advanced React",
        difficulty: "hard" as const,
        hint: "Think about how React efficiently updates the DOM"
      }
    ]
  };

  const handlePowerUpUse = (type: PowerUp['type']) => {
    setPowerUps(current =>
      current.map(p =>
        p.type === type
          ? { ...p, active: true }
          : p
      )
    );

    // Apply power-up effects
    switch (type) {
      case 'doublePoints':
        toast({
          title: "Double Points Activated! 🎯",
          description: "Your points are doubled for the next question!"
        });
        break;
      case 'extraLife':
        toast({
          title: "Extra Life Gained! ❤️",
          description: "You've received an additional life!"
        });
        break;
      // Add other power-up effects
    }

    // Deactivate power-up after duration
    if (powerUps.find(p => p.type === type)?.duration) {
      setTimeout(() => {
        setPowerUps(current =>
          current.map(p =>
            p.type === type
              ? { ...p, active: false }
              : p
          )
        );
      }, (powerUps.find(p => p.type === type)?.duration || 0) * 1000);
    }
  };

  const handleQuizComplete = (score: number) => {
    // Update stats
    updateStats({
      quizzesTaken: stats.quizzesTaken + 1,
      averageScore: (stats.averageScore * stats.quizzesTaken + score) / (stats.quizzesTaken + 1)
    });

    // Check for achievements
    if (score === 100) {
      unlockAchievement('first_perfect');
    }

    // Update leaderboard
    updateLeaderboard({
      userId: 'current-user', // Replace with actual user ID
      username: 'Current User', // Replace with actual username
      score,
      rank: 1, // This would be calculated server-side in a real app
      achievements: 1,
    });

    toast({
      title: "Quiz Complete! 🎉",
      description: `You scored ${score} points!`,
    });
  };

  useEffect(() => {
    // Update study time every minute
    const timer = setInterval(() => {
      updateStats({
        totalStudyTime: stats.totalStudyTime + 1
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [stats.totalStudyTime]);

  return (
    <div className={`container mx-auto py-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interactive Learning</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Master concepts through flashcards and test your knowledge with quizzes
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="flashcards" className="space-y-4">
            <TabsList>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="quiz">Quiz Game</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="flashcards">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Study with Flashcards</CardTitle>
                      <CardDescription>
                        Flip cards to reveal answers and track your progress
                      </CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setShowAddCard(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Card
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {flashcards.length > 0 ? (
                    <FlashCard cards={flashcards} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No flashcards yet. Click "Add Card" to create your first flashcard!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Challenge</CardTitle>
                  <CardDescription>
                    Test your knowledge and earn points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <PowerUps
                      availablePowerUps={powerUps}
                      onUsePowerUp={(type) => {
                        setPowerUps(powerUps.map(p => 
                          p.type === type ? { ...p, active: true } : p
                        ));
                      }}
                    />
                    <GameQuiz 
                      questions={quizQuestions.medium} 
                      onComplete={handleQuizComplete}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <StatsAndAchievements />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Leaderboard />
        </div>
      </div>

      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <AddFlashCard onClose={() => setShowAddCard(false)} />
        </div>
      )}
    </div>
  );
};

export default LearningPage; 
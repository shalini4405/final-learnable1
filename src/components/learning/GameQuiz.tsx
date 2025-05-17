import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Trophy, Timer, Heart, Star, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit: number; // in seconds
}

interface GameQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const GameQuiz: React.FC<GameQuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    setTimeLeft(questions[currentIndex].timeLimit);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleWrongAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, gameOver]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || gameOver) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === questions[currentIndex].correctAnswer;
    
    if (isCorrect) {
      const streakBonus = Math.floor(streak / 3) * 50;
      const timeBonus = Math.floor(timeLeft / questions[currentIndex].timeLimit * 50);
      const questionPoints = questions[currentIndex].points + streakBonus + timeBonus;
      
      setScore((prev) => prev + questionPoints);
      setStreak((prev) => prev + 1);
      
      if (streak > 0 && streak % 3 === 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      handleWrongAnswer();
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentIndex === questions.length - 1 || lives <= 0) {
        setGameOver(true);
        onComplete(score);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleWrongAnswer = () => {
    setLives((prev) => prev - 1);
    setStreak(0);
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  if (gameOver) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-xl">Final Score: {score}</p>
        <Button onClick={() => onComplete(score)}>Continue Learning</Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="font-bold">{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg text-left transition-colors ${
                showFeedback
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Streak indicator */}
      {streak > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center"
        >
          <Star className="w-4 h-4 mr-1" />
          {streak} streak!
        </motion.div>
      )}
    </div>
  );
};

export default GameQuiz; 
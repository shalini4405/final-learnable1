import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Gift, Star, Timer, Trophy, Calendar } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useLearning } from '@/contexts/LearningContext';

const DailyChallenge = () => {
  const { toast } = useToast();
  const { updateStats, unlockAchievement } = useLearning();
  const [challenge, setChallenge] = useState<{
    title: string;
    description: string;
    reward: number;
    progress: number;
    timeLeft: number;
    type: 'quiz' | 'flashcard' | 'streak';
    completed: boolean;
  }>({
    title: '',
    description: '',
    reward: 0,
    progress: 0,
    timeLeft: 0,
    type: 'quiz',
    completed: false,
  });

  useEffect(() => {
    // Generate daily challenge based on current date
    const today = new Date();
    const challenges = [
      {
        title: 'Speed Run',
        description: 'Complete 3 quizzes in under 10 minutes',
        reward: 500,
        type: 'quiz' as const,
      },
      {
        title: 'Memory Challenge',
        description: 'Review 20 flashcards with 90% accuracy',
        reward: 400,
        type: 'flashcard' as const,
      },
      {
        title: 'Perfect Streak',
        description: 'Maintain a perfect answer streak for 15 questions',
        reward: 600,
        type: 'streak' as const,
      }
    ];

    // Use date to deterministically select challenge
    const challengeIndex = today.getDate() % challenges.length;
    const timeLeft = 24 - today.getHours();

    setChallenge({
      ...challenges[challengeIndex],
      progress: 0,
      timeLeft,
      completed: false,
    });
  }, []);

  const handleStartChallenge = () => {
    toast({
      title: '🎯 Challenge Accepted!',
      description: 'Good luck completing today\'s challenge!',
    });
  };

  const handleClaimReward = () => {
    updateStats({
      // Update relevant stats based on challenge type
    });
    unlockAchievement('daily_champion');
    toast({
      title: '🎉 Reward Claimed!',
      description: `You earned ${challenge.reward} points!`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Challenge
        </CardTitle>
        <CardDescription>
          Complete daily challenges to earn extra rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {challenge.type === 'quiz' && <Trophy className="w-5 h-5 text-yellow-500" />}
              {challenge.type === 'flashcard' && <Star className="w-5 h-5 text-purple-500" />}
              {challenge.type === 'streak' && <Timer className="w-5 h-5 text-blue-500" />}
              <h3 className="font-semibold">{challenge.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-pink-500" />
              <span className="font-bold">{challenge.reward} pts</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">{challenge.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <Timer className="w-4 h-4 inline mr-1" />
              {challenge.timeLeft} hours remaining
            </div>
            {challenge.completed ? (
              <Button onClick={handleClaimReward} className="bg-green-500 hover:bg-green-600">
                Claim Reward
              </Button>
            ) : (
              <Button onClick={handleStartChallenge}>
                Start Challenge
              </Button>
            )}
          </div>

          {/* Challenge tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-blue-600">
              💡 Tip: {challenge.type === 'quiz' 
                ? 'Use power-ups wisely to complete quizzes faster!' 
                : challenge.type === 'flashcard'
                ? 'Take your time to memorize each card properly.'
                : 'Stay focused and maintain your concentration!'}
            </p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge; 
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Trophy, Clock, Brain, Target, Flame, Award } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';

const StatsAndAchievements = () => {
  const { stats, achievements } = useLearning();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Learning Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={item} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Total Study Time
                </span>
                <span>{formatTime(stats.totalStudyTime)}</span>
              </div>
              <Progress value={Math.min((stats.totalStudyTime / 3600) * 100, 100)} />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Cards Reviewed
                </span>
                <span>{stats.flashcardsReviewed}</span>
              </div>
              <Progress value={Math.min((stats.flashcardsReviewed / 100) * 100, 100)} />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Average Score
                </span>
                <span>{stats.averageScore.toFixed(1)}%</span>
              </div>
              <Progress value={stats.averageScore} />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Day Streak
                </span>
                <span>{stats.streakDays} days</span>
              </div>
              <Progress value={(stats.streakDays / 30) * 100} />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={item}
                className={`p-4 rounded-lg border ${
                  achievement.earned
                    ? 'bg-primary/10 border-primary'
                    : 'bg-gray-100 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <div className="ml-auto">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsAndAchievements; 
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Trophy, Medal, Award } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Leaderboard = () => {
  const { leaderboard } = useLearning();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return <Award className="w-6 h-6 text-gray-400" />;
    }
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
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.userId}
              variants={item}
              className={`flex items-center p-4 rounded-lg ${
                index === 0
                  ? 'bg-yellow-50 border-yellow-200'
                  : index === 1
                  ? 'bg-gray-50 border-gray-200'
                  : index === 2
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-white border'
              } border`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(index + 1)}
                </div>
                <Avatar>
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>
                    {entry.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{entry.username}</div>
                  <div className="text-sm text-gray-500">
                    {entry.achievements} achievements
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{entry.score}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </motion.div>
          ))}

          {leaderboard.length === 0 && (
            <motion.div
              variants={item}
              className="text-center py-8 text-gray-500"
            >
              No entries yet. Be the first to make it to the leaderboard!
            </motion.div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard; 
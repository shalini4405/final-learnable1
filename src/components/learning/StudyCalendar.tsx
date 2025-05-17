import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, Flame } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';

const StudyCalendar = () => {
  const { stats } = useLearning();
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // Mock study data - in real app, this would come from backend
  const studyDays = new Set([
    1, 2, 3, 5, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 21
  ]);

  const getIntensityColor = (day: number) => {
    if (!studyDays.has(day)) return 'bg-gray-100';
    
    // Mock intensity based on study time
    const intensity = Math.floor(Math.random() * 4); // 0-3
    switch (intensity) {
      case 3:
        return 'bg-green-500';
      case 2:
        return 'bg-green-400';
      case 1:
        return 'bg-green-300';
      default:
        return 'bg-green-200';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { scale: 0 },
    show: { scale: 1 }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Study Streak Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current streak */}
          <div className="flex items-center gap-2 p-3 bg-orange-100 rounded-lg">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-medium">
              Current Streak: {stats.streakDays} days
            </span>
          </div>

          {/* Calendar grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-7 gap-2"
          >
            {/* Day labels */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {/* Offset for first day of month */}
            {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`offset-${i}`} />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();

              return (
                <motion.div
                  key={day}
                  variants={item}
                  className="relative"
                >
                  <div
                    className={`
                      aspect-square rounded-lg ${getIntensityColor(day)}
                      ${isToday ? 'ring-2 ring-blue-500' : ''}
                      flex items-center justify-center text-sm
                      ${studyDays.has(day) ? 'text-white' : 'text-gray-600'}
                    `}
                  >
                    {day}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded" />
              <span>No study</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded" />
              <span>Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Intense</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyCalendar; 
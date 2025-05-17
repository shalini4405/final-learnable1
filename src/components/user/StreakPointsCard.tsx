
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StreakPointsCardProps {
  points: number;
  streak: number;
  compact?: boolean;
}

const StreakPointsCard: React.FC<StreakPointsCardProps> = ({ points, streak, compact = false }) => {
  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      <CardContent className={`flex items-center gap-6 ${compact ? 'p-0' : 'p-4'}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className={`font-bold ${compact ? 'text-base' : 'text-xl'}`}>{points}</p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your total learning points</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <Flame className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className={`font-bold ${compact ? 'text-base' : 'text-xl'}`}>{streak}</p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your learning streak - days in a row!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default StreakPointsCard;

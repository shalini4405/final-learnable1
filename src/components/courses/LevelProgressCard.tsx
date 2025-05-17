
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Lock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface LevelProgressCardProps {
  level: "Beginner" | "Intermediate" | "Advanced";
  totalLessons: number;
  completedLessons: number;
  onClick: () => void;
}

const LevelProgressCard = ({
  level,
  totalLessons,
  completedLessons,
  onClick
}: LevelProgressCardProps) => {
  const { levelStatus, isLevelAccessible } = useUser();
  const hasAccess = isLevelAccessible(level.toLowerCase());
  const isPaid = levelStatus[level.toLowerCase()]?.paid;
  const isCompleted = levelStatus[level.toLowerCase()]?.completed;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
  
  return (
    <Card
      className={`p-4 border-l-4 cursor-pointer hover:shadow-md transition-all ${
        isCompleted ? "border-l-green-500" : 
        hasAccess ? "border-l-blue-500" : 
        "border-l-gray-300"
      }`}
      onClick={hasAccess ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{level}</h3>
            {level !== "Beginner" && (
              <Badge className={isPaid ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                {isPaid ? "Unlocked" : "₹49"}
              </Badge>
            )}
            {level === "Beginner" && (
              <Badge className="bg-blue-100 text-blue-800">Free</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
        
        {!hasAccess && (
          <div className="bg-gray-100 p-1.5 rounded-full">
            <Lock className="h-5 w-5 text-gray-500" />
          </div>
        )}
        
        {isCompleted && (
          <div className="bg-green-100 p-1.5 rounded-full">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        )}
      </div>
      
      <Progress
        value={progressPercentage}
        className="h-2 mt-3"
      />
    </Card>
  );
};

export default LevelProgressCard;

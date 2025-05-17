
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillBadgeProps {
  courseId: string;
  courseName: string;
  completionDate: Date;
  score: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  courseId,
  courseName,
  completionDate,
  score
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleShare = () => {
    // Mock share functionality
    alert(`Sharing ${courseName} certificate with score: ${score}%`);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert(`Downloading ${courseName} certificate (Score: ${score}%)`);
  };

  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <div className="bg-primary/10 p-6 text-center relative">
        <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-sm">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div className="inline-block bg-primary/20 rounded-full p-4 mb-4">
          <Award className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-xl font-bold">{courseName}</h2>
        <p className="text-gray-600 mt-1">Skill Badge Earned</p>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Score:</span>
            <span className="text-lg font-bold">{score}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Completed on:</span>
            <span>{formatDate(completionDate)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Certificate ID:</span>
            <span className="text-gray-600">{courseId}-{Date.now().toString().slice(-6)}</span>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button variant="outline" onClick={handleDownload} className="w-full">Download</Button>
            <Button onClick={handleShare} className="w-full">Share</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillBadge;

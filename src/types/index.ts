
export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  shortCode: string;
  icon: string;
  progress?: number;
  totalHours?: number;
  completedHours?: number;
  isRecommended?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  coursesEnrolled: string[];
  completedLevels: string[];
}

export interface Hackathon {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registrationUrl: string;
  description: string;
}

export interface Level {
  id: string;
  courseId: string;
  title: string;
  description: string;
  resources: Resource[];
  quiz: Quiz;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  type: "video" | "article" | "documentation";
  url: string;
}

export interface Quiz {
  id: string;
  levelId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

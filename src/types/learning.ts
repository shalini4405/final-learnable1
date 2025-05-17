export interface FlashCard {
  id: number;
  question: string;
  answer: string;
  category: string;
  hint?: string;
  image?: string;
  lastReviewed?: Date;
  nextReview?: Date;
  confidenceLevel?: number;
  reviewCount?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hint?: string;
  explanation?: string;
}

export interface PowerUp {
  type: 'doublePoints' | 'extraLife' | 'timeFreeze' | 'skipQuestion' | 'fiftyFifty' | 'hint' | 'extraTime';
  icon: string;
  duration?: number;
  active: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface LearningStats {
  totalStudyTime: number;
  flashcardsReviewed: number;
  quizzesTaken: number;
  averageScore: number;
  streakDays: number;
  weakCategories: string[];
  strongCategories: string[];
  lastStudySession: Date;
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  categories: string[];
  dailyGoal: number;
  weeklyGoal: number;
  progress: number;
  startDate: Date;
  endDate?: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  achievements: number;
} 
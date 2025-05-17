import React, { createContext, useContext, useState, useEffect } from 'react';
import { FlashCard, QuizQuestion, Achievement, LearningStats, StudyPlan, LeaderboardEntry } from '@/types/learning';

interface LearningContextType {
  // Flashcards
  flashcards: FlashCard[];
  addFlashcard: (card: Omit<FlashCard, 'id'>) => void;
  updateFlashcard: (id: number, card: Partial<FlashCard>) => void;
  deleteFlashcard: (id: number) => void;
  
  // Quiz
  quizQuestions: QuizQuestion[];
  currentDifficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  
  // Stats & Progress
  stats: LearningStats;
  updateStats: (newStats: Partial<LearningStats>) => void;
  
  // Study Plan
  studyPlan: StudyPlan | null;
  setStudyPlan: (plan: StudyPlan | null) => void;
  
  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  updateLeaderboard: (entry: LeaderboardEntry) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultStats: LearningStats = {
  totalStudyTime: 0,
  flashcardsReviewed: 0,
  quizzesTaken: 0,
  averageScore: 0,
  streakDays: 0,
  weakCategories: [],
  strongCategories: [],
  lastStudySession: new Date(),
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first_perfect',
    title: 'Perfect Score!',
    description: 'Get 100% on a quiz',
    icon: '🏆',
    condition: 'perfectScore',
    earned: false,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    condition: 'weekStreak',
    earned: false,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a quiz with more than 30 seconds left',
    icon: '⚡',
    condition: 'speedCompletion',
    earned: false,
  },
  {
    id: 'memory_master',
    title: 'Memory Master',
    description: 'Review 50 flashcards in one day',
    icon: '🧠',
    condition: 'flashcardMaster',
    earned: false,
  },
  {
    id: 'combo_king',
    title: 'Combo King',
    description: 'Achieve a 10x streak in quiz mode',
    icon: '👑',
    condition: 'comboStreak',
    earned: false,
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Study before 7 AM',
    icon: '🌅',
    condition: 'earlyStudy',
    earned: false,
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Study after 11 PM',
    icon: '🌙',
    condition: 'lateStudy',
    earned: false,
  },
  {
    id: 'weekend_warrior',
    title: 'Weekend Warrior',
    description: 'Study for 2 hours on a weekend',
    icon: '📚',
    condition: 'weekendStudy',
    earned: false,
  },
  {
    id: 'power_user',
    title: 'Power User',
    description: 'Use all power-ups in one quiz session',
    icon: '💪',
    condition: 'allPowerUps',
    earned: false,
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Reach top 3 on the leaderboard',
    icon: '🦋',
    condition: 'topThree',
    earned: false,
  }
];

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [stats, setStats] = useState<LearningStats>(defaultStats);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('learningData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFlashcards(parsed.flashcards || []);
      setStats(parsed.stats || defaultStats);
      setAchievements(parsed.achievements || defaultAchievements);
      setIsDarkMode(parsed.isDarkMode || false);
    }
  }, []);

  // Save data on changes
  useEffect(() => {
    const dataToSave = {
      flashcards,
      stats,
      achievements,
      isDarkMode,
    };
    localStorage.setItem('learningData', JSON.stringify(dataToSave));
  }, [flashcards, stats, achievements, isDarkMode]);

  // Flashcard functions
  const addFlashcard = (card: Omit<FlashCard, 'id'>) => {
    const newCard: FlashCard = {
      ...card,
      id: Date.now(),
      lastReviewed: new Date(),
      nextReview: new Date(),
      confidenceLevel: 0,
      reviewCount: 0,
    };
    setFlashcards([...flashcards, newCard]);
  };

  const updateFlashcard = (id: number, card: Partial<FlashCard>) => {
    setFlashcards(cards => 
      cards.map(c => c.id === id ? { ...c, ...card } : c)
    );
  };

  const deleteFlashcard = (id: number) => {
    setFlashcards(cards => cards.filter(c => c.id !== id));
  };

  // Stats functions
  const updateStats = (newStats: Partial<LearningStats>) => {
    setStats(current => ({ ...current, ...newStats }));
  };

  // Achievement functions
  const unlockAchievement = (id: string) => {
    setAchievements(current =>
      current.map(a =>
        a.id === id ? { ...a, earned: true, earnedDate: new Date() } : a
      )
    );
  };

  // Leaderboard functions
  const updateLeaderboard = (entry: LeaderboardEntry) => {
    setLeaderboard(current => {
      const filtered = current.filter(e => e.userId !== entry.userId);
      return [...filtered, entry].sort((a, b) => b.score - a.score);
    });
  };

  // Theme functions
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value: LearningContextType = {
    flashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    quizQuestions,
    currentDifficulty,
    setDifficulty: setCurrentDifficulty,
    stats,
    updateStats,
    studyPlan,
    setStudyPlan,
    achievements,
    unlockAchievement,
    leaderboard,
    updateLeaderboard,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export default LearningContext; 
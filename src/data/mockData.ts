
import { Course, User, Hackathon } from "@/types";

export const courses: Course[] = [
  {
    id: "1",
    shortCode: "UX",
    title: "UX Design Foundations",
    description: "Master the fundamentals of UX design.",
    level: "Beginner",
    icon: "UX",
    progress: 19,
    totalHours: 5,
    completedHours: 0,
    isRecommended: true
  },
  {
    id: "2",
    shortCode: "DT",
    title: "Design Terminology",
    description: "Introduction to design terminology.",
    level: "Beginner",
    icon: "DT",
    progress: 0,
    totalHours: 3,
    completedHours: 0
  },
  {
    id: "3",
    shortCode: "UI",
    title: "UI Components I",
    description: "Learn UI components usage.",
    level: "Intermediate",
    icon: "UI",
    progress: 0,
    totalHours: 2.5,
    completedHours: 0
  },
  {
    id: "4",
    shortCode: "FD",
    title: "Frontend Development",
    description: "Learn modern frontend development practices.",
    level: "Intermediate",
    icon: "FD",
    progress: 0,
    totalHours: 8,
    completedHours: 0
  },
  {
    id: "5",
    shortCode: "PD",
    title: "Product Design",
    description: "End-to-end product design process.",
    level: "Advanced",
    icon: "PD",
    progress: 0,
    totalHours: 10,
    completedHours: 0
  },
  {
    id: "6",
    shortCode: "DA",
    title: "Design Accessibility",
    description: "Create accessible designs for all users.",
    level: "Intermediate",
    icon: "DA",
    progress: 0,
    totalHours: 4,
    completedHours: 0
  }
];

export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  points: 45,
  coursesEnrolled: ["1", "3"],
  completedLevels: ["1-1"]
};

export const topUsers: User[] = [
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    points: 320,
    coursesEnrolled: ["1", "2", "4"],
    completedLevels: ["1-1", "1-2", "1-3", "2-1", "2-2", "4-1"]
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    points: 280,
    coursesEnrolled: ["1", "3", "5"],
    completedLevels: ["1-1", "1-2", "3-1", "3-2", "5-1"]
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    points: 240,
    coursesEnrolled: ["2", "4", "6"],
    completedLevels: ["2-1", "2-2", "4-1", "6-1"]
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    points: 210,
    coursesEnrolled: ["1", "2", "3"],
    completedLevels: ["1-1", "2-1", "3-1"]
  },
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    points: 45,
    coursesEnrolled: ["1", "3"],
    completedLevels: ["1-1"]
  }
];

export const upcomingHackathons: Hackathon[] = [
  {
    id: "1",
    name: "Web3 Hackathon",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    registrationUrl: "https://example.com/web3-hackathon",
    description: "Build innovative solutions using blockchain technology."
  },
  {
    id: "2",
    name: "AI for Good",
    startDate: "2025-06-28",
    endDate: "2025-06-30",
    registrationUrl: "https://example.com/ai-for-good",
    description: "Create AI solutions that address social challenges."
  },
  {
    id: "3",
    name: "UX Design Challenge",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    registrationUrl: "https://example.com/ux-challenge",
    description: "Design user-centric interfaces for complex problems."
  }
];

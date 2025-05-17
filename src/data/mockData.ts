import { Course, User, Hackathon } from "@/types";

export const courses: Course[] = [
  {
    id: "1",
    shortCode: "UX",
    title: "UX Design Foundations",
    description: "Master the fundamentals of UX design.",
    level: "Beginner",
    icon: "UX",
    progress: 0,
    totalHours: 5,
    completedHours: 0,
    isRecommended: true,
    dailyTargetMinutes: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    dailyProgress: []
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
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
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
  },
  {
    id: "ls1",
    shortCode: "MB",
    title: "Molecular Biology Fundamentals",
    description: "Learn the basics of molecular biology, DNA structure, and cellular processes.",
    level: "Beginner",
    icon: "DNA",
    progress: 0,
    totalHours: 8,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "ls2",
    shortCode: "GN",
    title: "Genetics and Inheritance",
    description: "Explore genetic principles, inheritance patterns, and gene expression.",
    level: "Intermediate",
    icon: "GN",
    progress: 0,
    totalHours: 10,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "ls3",
    shortCode: "BC",
    title: "Biochemistry Advanced",
    description: "Advanced study of biochemical processes and cellular metabolism.",
    level: "Advanced",
    icon: "BC",
    progress: 0,
    totalHours: 12,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "m1",
    shortCode: "CA",
    title: "Calculus Fundamentals",
    description: "Master the basics of differential and integral calculus.",
    level: "Beginner",
    icon: "CA",
    progress: 0,
    totalHours: 6,
    completedHours: 0,
    dailyTargetMinutes: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "m2",
    shortCode: "LA",
    title: "Linear Algebra",
    description: "Study vectors, matrices, and linear transformations.",
    level: "Intermediate",
    icon: "LA",
    progress: 0,
    totalHours: 8,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "m3",
    shortCode: "ST",
    title: "Statistics and Probability",
    description: "Learn statistical analysis, probability theory, and data interpretation.",
    level: "Intermediate",
    icon: "ST",
    progress: 0,
    totalHours: 7,
    completedHours: 0,
    dailyTargetMinutes: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "m4",
    shortCode: "DE",
    title: "Differential Equations",
    description: "Advanced study of differential equations and their applications.",
    level: "Advanced",
    icon: "DE",
    progress: 0,
    totalHours: 10,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: []
  },
  {
    id: "b1",
    shortCode: "FM",
    title: "Financial Management Basics",
    description: "Learn fundamental concepts of financial management and accounting.",
    level: "Beginner",
    icon: "FM",
    progress: 0,
    totalHours: 8,
    completedHours: 0,
    dailyTargetMinutes: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Financial Analyst", "Account Manager", "Investment Banker"]
  },
  {
    id: "b2",
    shortCode: "IM",
    title: "Investment Management",
    description: "Master investment strategies, portfolio management, and market analysis.",
    level: "Intermediate",
    icon: "IM",
    progress: 0,
    totalHours: 10,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Portfolio Manager", "Investment Advisor", "Hedge Fund Manager"]
  },
  {
    id: "b3",
    shortCode: "BA",
    title: "Business Analytics",
    description: "Learn data-driven decision making and business intelligence tools.",
    level: "Intermediate",
    icon: "BA",
    progress: 0,
    totalHours: 12,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Business Analyst", "Data Scientist", "Strategy Consultant"]
  },
  {
    id: "b4",
    shortCode: "CF",
    title: "Corporate Finance Advanced",
    description: "Advanced topics in corporate finance, mergers, and acquisitions.",
    level: "Advanced",
    icon: "CF",
    progress: 0,
    totalHours: 15,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Corporate Finance Manager", "M&A Specialist", "CFO"]
  },
  {
    id: "ps1",
    shortCode: "PS",
    title: "Public Speaking Fundamentals",
    description: "Master the basics of effective public speaking and presentation skills.",
    level: "Beginner",
    icon: "PS",
    progress: 0,
    totalHours: 6,
    completedHours: 0,
    dailyTargetMinutes: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Corporate Trainer", "Motivational Speaker", "Communication Specialist"]
  },
  {
    id: "ps2",
    shortCode: "BP",
    title: "Business Presentations",
    description: "Learn to create and deliver impactful business presentations.",
    level: "Intermediate",
    icon: "BP",
    progress: 0,
    totalHours: 8,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["Executive Coach", "Sales Trainer", "Corporate Communications Manager"]
  },
  {
    id: "ps3",
    shortCode: "SP",
    title: "Storytelling for Professionals",
    description: "Advanced techniques for using storytelling in business and public speaking.",
    level: "Advanced",
    icon: "SP",
    progress: 0,
    totalHours: 10,
    completedHours: 0,
    dailyTargetMinutes: 90,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    dailyProgress: [],
    careerPaths: ["TED Speaker", "Leadership Coach", "Public Speaking Consultant"]
  }
];

export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  points: 0,
  streak: 0,
  lastActive: new Date().toISOString(),
  coursesEnrolled: [],
  completedLevels: []
};

export const topUsers: User[] = [
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    points: 320,
    streak: 14,
    lastActive: new Date().toISOString(),
    coursesEnrolled: ["1", "2", "4"],
    completedLevels: ["1-1", "1-2", "1-3", "2-1", "2-2", "4-1"]
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    points: 280,
    streak: 7,
    lastActive: new Date().toISOString(),
    coursesEnrolled: ["1", "3", "5"],
    completedLevels: ["1-1", "1-2", "3-1", "3-2", "5-1"]
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    points: 240,
    streak: 5,
    lastActive: new Date().toISOString(),
    coursesEnrolled: ["2", "4", "6"],
    completedLevels: ["2-1", "2-2", "4-1", "6-1"]
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    points: 210,
    streak: 2,
    lastActive: new Date().toISOString(),
    coursesEnrolled: ["1", "2", "3"],
    completedLevels: ["1-1", "2-1", "3-1"]
  },
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    points: 45,
    streak: 3,
    lastActive: new Date().toISOString(),
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

export const courseResources = {
  business: [
    {
      title: "Financial Times",
      type: "Publication",
      url: "https://www.ft.com",
      description: "Leading global business publication"
    },
    {
      title: "Bloomberg Market Concepts",
      type: "Certification",
      url: "https://www.bloomberg.com/professional/product/bloomberg-market-concepts/",
      description: "Self-paced e-learning course"
    }
  ],
  science: [
    {
      title: "Nature Journal",
      type: "Publication",
      url: "https://www.nature.com",
      description: "Leading scientific journal"
    },
    {
      title: "Khan Academy Science",
      type: "Learning Platform",
      url: "https://www.khanacademy.org/science",
      description: "Free science education resources"
    }
  ],
  mathematics: [
    {
      title: "Wolfram Alpha",
      type: "Tool",
      url: "https://www.wolframalpha.com",
      description: "Computational knowledge engine"
    },
    {
      title: "3Blue1Brown",
      type: "Video Channel",
      url: "https://www.3blue1brown.com",
      description: "Visual, in-depth math concepts"
    }
  ],
  speaking: [
    {
      title: "Toastmasters International",
      type: "Organization",
      url: "https://www.toastmasters.org",
      description: "Global organization for improving public speaking and leadership skills"
    },
    {
      title: "TED Masterclass",
      type: "Course Platform",
      url: "https://masterclass.ted.com",
      description: "Learn the art of public speaking from world-class speakers"
    },
    {
      title: "Public Speaking Lab",
      type: "Practice Platform",
      url: "https://www.publicspeakinglab.com",
      description: "Virtual platform for practicing and receiving feedback on speeches"
    },
    {
      title: "National Speech & Debate Association",
      type: "Organization",
      url: "https://www.speechanddebate.org",
      description: "Resources for competitive speaking and debate"
    },
    {
      title: "VirtualSpeech",
      type: "VR Platform",
      url: "https://virtualspeech.com",
      description: "Practice public speaking in VR environments with real-time feedback"
    },
    {
      title: "Rhetoric: The Art of Persuasive Speaking",
      type: "Online Course",
      url: "https://www.coursera.org/learn/rhetoric-art-persuasive-speaking",
      description: "University-level course on rhetorical techniques and persuasive speaking"
    }
  ]
};

export const careerPaths = {
  business: [
    {
      title: "Financial Analyst",
      description: "Analyze financial data and make recommendations for business decisions.",
      requiredCourses: ["b1", "b2", "b3"],
      averageSalary: "$65,000 - $95,000",
      skills: ["Financial Analysis", "Excel", "Data Visualization", "Risk Assessment"]
    },
    {
      title: "Investment Banker",
      description: "Help organizations raise capital and execute financial transactions.",
      requiredCourses: ["b1", "b2", "b4"],
      averageSalary: "$85,000 - $150,000",
      skills: ["Financial Modeling", "Valuation", "Deal Structure", "Negotiation"]
    },
    {
      title: "Business Analyst",
      description: "Analyze business processes and recommend improvements.",
      requiredCourses: ["b1", "b3"],
      averageSalary: "$60,000 - $90,000",
      skills: ["Process Analysis", "Data Analysis", "Project Management", "Communication"]
    }
  ],
  science: [
    {
      title: "Research Scientist",
      description: "Conduct research in life sciences and develop new methodologies.",
      requiredCourses: ["ls1", "ls2", "ls3"],
      averageSalary: "$70,000 - $120,000",
      skills: ["Research Methods", "Lab Techniques", "Data Analysis", "Scientific Writing"]
    },
    {
      title: "Biostatistician",
      description: "Apply statistical techniques to biological and medical research.",
      requiredCourses: ["ls1", "m3"],
      averageSalary: "$75,000 - $110,000",
      skills: ["Statistical Analysis", "R Programming", "Research Design", "Data Modeling"]
    }
  ],
  speaking: [
    {
      title: "Corporate Trainer",
      description: "Train employees and executives in communication and leadership skills.",
      requiredCourses: ["ps1", "ps2"],
      averageSalary: "$60,000 - $100,000",
      skills: ["Public Speaking", "Training Design", "Facilitation", "Adult Learning"]
    },
    {
      title: "Executive Coach",
      description: "Coach executives in leadership communication and presentation skills.",
      requiredCourses: ["ps2", "ps3"],
      averageSalary: "$90,000 - $200,000",
      skills: ["Executive Communication", "Leadership Development", "Coaching", "Strategic Planning"]
    },
    {
      title: "Public Speaking Consultant",
      description: "Help professionals improve their public speaking and presentation abilities.",
      requiredCourses: ["ps1", "ps2", "ps3"],
      averageSalary: "$75,000 - $150,000",
      skills: ["Speech Writing", "Presentation Design", "Voice Coaching", "Stage Presence"]
    },
    {
      title: "TEDx Speaker Coach",
      description: "Help speakers prepare and deliver impactful TEDx talks.",
      requiredCourses: ["ps2", "ps3"],
      averageSalary: "$80,000 - $150,000",
      skills: ["Speech Writing", "Presentation Design", "Speaker Training", "Event Management"]
    },
    {
      title: "Political Speech Writer",
      description: "Write compelling speeches for political figures and campaigns.",
      requiredCourses: ["ps1", "ps3"],
      averageSalary: "$70,000 - $120,000",
      skills: ["Speech Writing", "Political Communication", "Research", "Storytelling"]
    },
    {
      title: "Debate Coach",
      description: "Train students and professionals in competitive debate and public speaking.",
      requiredCourses: ["ps1", "ps2"],
      averageSalary: "$45,000 - $85,000",
      skills: ["Debate Strategy", "Argument Construction", "Critical Thinking", "Competition Prep"]
    }
  ]
};

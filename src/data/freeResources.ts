import { Resource } from "@/types";

export const freeResources: { [key: string]: Resource[] } = {
  "Web Development": [
    {
      id: "mdn-1",
      title: "MDN Web Docs",
      type: "documentation",
      url: "https://developer.mozilla.org/",
      content: "Comprehensive web development documentation by Mozilla"
    },
    {
      id: "w3schools-1",
      title: "W3Schools Tutorials",
      type: "documentation",
      url: "https://www.w3schools.com/",
      content: "Interactive tutorials for web technologies"
    },
    {
      id: "freecodecamp-1",
      title: "freeCodeCamp",
      type: "article",
      url: "https://www.freecodecamp.org/",
      content: "Free coding tutorials and certification"
    },
    {
      id: "javascript-info",
      title: "JavaScript.info",
      type: "documentation",
      url: "https://javascript.info/",
      content: "Modern JavaScript Tutorial"
    },
    {
      id: "css-tricks",
      title: "CSS-Tricks",
      type: "article",
      url: "https://css-tricks.com/",
      content: "Tips, tricks, and techniques on using CSS"
    },
    {
      id: "traversy-web",
      title: "Traversy Media - Web Dev Crash Courses",
      type: "video",
      url: "https://www.youtube.com/c/TraversyMedia",
      content: "High-quality web development tutorials and crash courses"
    },
    {
      id: "net-ninja-web",
      title: "The Net Ninja - Web Tutorials",
      type: "video",
      url: "https://www.youtube.com/c/TheNetNinja",
      content: "Step-by-step web development tutorials"
    }
  ],
  "UI/UX Design": [
    {
      id: "figma-1",
      title: "Figma Resources",
      type: "documentation",
      url: "https://www.figma.com/resources/",
      content: "Free design resources and tutorials from Figma"
    },
    {
      id: "ux-tools-1",
      title: "UX Tools",
      type: "article",
      url: "https://uxtools.co/",
      content: "Free UX design tools and resources"
    },
    {
      id: "material-1",
      title: "Material Design Guidelines",
      type: "documentation",
      url: "https://material.io/design",
      content: "Google's Material Design documentation"
    },
    {
      id: "dribbble-learn",
      title: "Dribbble Learning",
      type: "article",
      url: "https://dribbble.com/learn",
      content: "Design tutorials and inspiration"
    },
    {
      id: "ux-collective",
      title: "UX Collective",
      type: "article",
      url: "https://uxdesign.cc/",
      content: "Curated stories on user experience"
    },
    {
      id: "figma-yt",
      title: "Figma YouTube Channel",
      type: "video",
      url: "https://www.youtube.com/@Figma",
      content: "Official Figma tutorials and design tips"
    },
    {
      id: "uxtools-yt",
      title: "DesignCourse - UI/UX Tutorials",
      type: "video",
      url: "https://www.youtube.com/@DesignCourse",
      content: "Modern UI/UX design tutorials and tips"
    }
  ],
  "Programming": [
    {
      id: "github-learn",
      title: "GitHub Learning Lab",
      type: "documentation",
      url: "https://lab.github.com/",
      content: "Interactive courses on Git and GitHub"
    },
    {
      id: "leetcode-free",
      title: "LeetCode Free Problems",
      type: "article",
      url: "https://leetcode.com/problemset/all/?difficulty=EASY",
      content: "Practice coding with free problems"
    },
    {
      id: "coursera-free",
      title: "Coursera Free Courses",
      type: "video",
      url: "https://www.coursera.org/courses?query=free",
      content: "Free courses from top universities"
    },
    {
      id: "codecademy",
      title: "Codecademy",
      type: "video",
      url: "https://www.codecademy.com/",
      content: "Interactive programming courses"
    },
    {
      id: "edx-cs50",
      title: "Harvard CS50",
      type: "video",
      url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
      content: "Harvard's intro to computer science"
    },
    {
      id: "fireship",
      title: "Fireship",
      type: "video",
      url: "https://www.youtube.com/@Fireship",
      content: "Quick, practical programming tutorials and tech explanations"
    },
    {
      id: "tech-with-tim",
      title: "Tech With Tim",
      type: "video",
      url: "https://www.youtube.com/@TechWithTim",
      content: "Python programming tutorials and projects"
    }
  ],
  "Educational Channels": [
    {
      id: "freecodecamp-yt",
      title: "freeCodeCamp",
      type: "video",
      url: "https://www.youtube.com/@freecodecamp",
      content: "Full courses on programming and computer science"
    },
    {
      id: "academind",
      title: "Academind",
      type: "video",
      url: "https://www.youtube.com/@academind",
      content: "In-depth programming courses and tutorials"
    },
    {
      id: "web-dev-simplified",
      title: "Web Dev Simplified",
      type: "video",
      url: "https://www.youtube.com/@WebDevSimplified",
      content: "Simplified web development concepts and tutorials"
    },
    {
      id: "kevin-powell",
      title: "Kevin Powell",
      type: "video",
      url: "https://www.youtube.com/@KevinPowell",
      content: "CSS tutorials and web design tips"
    },
    {
      id: "coding-train",
      title: "The Coding Train",
      type: "video",
      url: "https://www.youtube.com/@TheCodingTrain",
      content: "Creative coding tutorials and challenges"
    }
  ],
  "Design Tools": [
    {
      id: "canva-free",
      title: "Canva Free Resources",
      type: "documentation",
      url: "https://www.canva.com/learn/",
      content: "Free design tutorials and templates"
    },
    {
      id: "unsplash-1",
      title: "Unsplash",
      type: "article",
      url: "https://unsplash.com/",
      content: "Free high-quality stock photos"
    },
    {
      id: "icons8-1",
      title: "Icons8",
      type: "article",
      url: "https://icons8.com/",
      content: "Free icons and design resources"
    },
    {
      id: "coolors",
      title: "Coolors",
      type: "article",
      url: "https://coolors.co/",
      content: "Color schemes generator"
    },
    {
      id: "fontawesome",
      title: "Font Awesome",
      type: "documentation",
      url: "https://fontawesome.com/",
      content: "Vector icons and social logos"
    }
  ],
  "Data Science": [
    {
      id: "kaggle-learn",
      title: "Kaggle Learn",
      type: "documentation",
      url: "https://www.kaggle.com/learn",
      content: "Free courses on data science and machine learning"
    },
    {
      id: "google-ml",
      title: "Google Machine Learning",
      type: "video",
      url: "https://developers.google.com/machine-learning/crash-course",
      content: "Machine learning crash course"
    },
    {
      id: "fast-ai",
      title: "Fast.ai",
      type: "video",
      url: "https://www.fast.ai/",
      content: "Practical deep learning for coders"
    },
    {
      id: "statquest",
      title: "StatQuest with Josh Starmer",
      type: "video",
      url: "https://www.youtube.com/@statquest",
      content: "Statistics and machine learning concepts explained simply"
    },
    {
      id: "3blue1brown",
      title: "3Blue1Brown",
      type: "video",
      url: "https://www.youtube.com/@3blue1brown",
      content: "Mathematical concepts with amazing visualizations"
    }
  ],
  "Mobile Development": [
    {
      id: "react-native",
      title: "React Native Docs",
      type: "documentation",
      url: "https://reactnative.dev/docs/getting-started",
      content: "Official React Native documentation"
    },
    {
      id: "flutter-docs",
      title: "Flutter Documentation",
      type: "documentation",
      url: "https://flutter.dev/docs",
      content: "Official Flutter documentation"
    },
    {
      id: "android-training",
      title: "Android Training",
      type: "documentation",
      url: "https://developer.android.com/training",
      content: "Official Android development training"
    },
    {
      id: "flutter-yt",
      title: "Flutter",
      type: "video",
      url: "https://www.youtube.com/@flutterdev",
      content: "Official Flutter tutorials and updates"
    },
    {
      id: "reso-coder",
      title: "Reso Coder",
      type: "video",
      url: "https://www.youtube.com/@ResoCoder",
      content: "Flutter and mobile development tutorials"
    }
  ],
  "Project Tutorials": [
    {
      id: "javascript-mastery",
      title: "JavaScript Mastery",
      type: "video",
      url: "https://www.youtube.com/@javascriptmastery",
      content: "Full-stack project tutorials from scratch"
    },
    {
      id: "clever-programmer",
      title: "Clever Programmer",
      type: "video",
      url: "https://www.youtube.com/@CleverProgrammer",
      content: "Project-based programming tutorials"
    },
    {
      id: "sonny-sangha",
      title: "Sonny Sangha",
      type: "video",
      url: "https://www.youtube.com/@SonnySangha",
      content: "Modern web development project tutorials"
    }
  ]
};

export const freeCertifications = {
  "Web Development": [
    {
      id: "google-web-dev",
      title: "Google Web Development",
      provider: "Google",
      url: "https://web.dev/learn/",
      description: "Learn modern web development from Google experts",
      duration: "Self-paced",
      certificate: true
    },
    {
      id: "freecodecamp-responsive",
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/responsive-web-design/",
      description: "Learn HTML, CSS, and responsive design principles",
      duration: "300 hours",
      certificate: true
    },
    {
      id: "microsoft-web-dev",
      title: "Web Development for Beginners",
      provider: "Microsoft",
      url: "https://github.com/microsoft/Web-Dev-For-Beginners",
      description: "24-lesson curriculum covering web development basics",
      duration: "12 weeks",
      certificate: true
    },
    {
      id: "javascript-algorithms",
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      description: "Master JavaScript fundamentals and advanced concepts",
      duration: "300 hours",
      certificate: true
    },
    {
      id: "fullstack-open",
      title: "Full Stack Open",
      provider: "University of Helsinki",
      url: "https://fullstackopen.com/en/",
      description: "Modern web development with React, Node.js, and more",
      duration: "Self-paced",
      certificate: true
    }
  ],
  "UI/UX Design": [
    {
      id: "google-ux",
      title: "Google UX Design",
      provider: "Google",
      url: "https://www.coursera.org/professional-certificates/google-ux-design",
      description: "Professional UX design certification by Google (free audit available)",
      duration: "6 months",
      certificate: true
    },
    {
      id: "hack-design",
      title: "Hack Design",
      provider: "Hack Design",
      url: "https://hackdesign.org/lessons",
      description: "Curated design lessons by industry experts",
      duration: "Self-paced",
      certificate: false
    },
    {
      id: "stanford-hci",
      title: "Human-Computer Interaction",
      provider: "Stanford Online",
      url: "https://online.stanford.edu/courses/soe-ycsx0001-introduction-human-computer-interaction",
      description: "Learn fundamental HCI concepts and methods",
      duration: "10 weeks",
      certificate: true
    }
  ],
  "Data Science": [
    {
      id: "ibm-data-science",
      title: "IBM Data Science",
      provider: "IBM",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science",
      description: "Complete data science training by IBM (free audit available)",
      duration: "3 months",
      certificate: true
    },
    {
      id: "google-data-analytics",
      title: "Google Data Analytics",
      provider: "Google",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics",
      description: "Professional data analytics certification by Google (free audit available)",
      duration: "6 months",
      certificate: true
    },
    {
      id: "mit-data-science",
      title: "Introduction to Data Science",
      provider: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/",
      description: "Computational thinking and data science fundamentals",
      duration: "Self-paced",
      certificate: false
    }
  ],
  "Cloud Computing": [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Cloud Practitioner Essentials",
      provider: "Amazon",
      url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
      description: "Fundamental AWS Cloud concepts",
      duration: "6 hours",
      certificate: false
    },
    {
      id: "microsoft-azure-fundamentals",
      title: "Microsoft Azure Fundamentals",
      provider: "Microsoft",
      url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/",
      description: "Azure fundamentals training content",
      duration: "10 hours",
      certificate: false
    },
    {
      id: "google-cloud-essentials",
      title: "Google Cloud Essentials",
      provider: "Google Cloud",
      url: "https://www.cloudskillsboost.google/paths/11",
      description: "Essential Google Cloud Platform concepts",
      duration: "8 hours",
      certificate: true
    }
  ],
  "Cybersecurity": [
    {
      id: "cisco-security",
      title: "Cisco Introduction to Cybersecurity",
      provider: "Cisco",
      url: "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity",
      description: "Basic concepts in cybersecurity",
      duration: "15 hours",
      certificate: true
    },
    {
      id: "google-security",
      title: "Google Cybersecurity Professional Certificate",
      provider: "Google",
      url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
      description: "Complete cybersecurity training by Google (free audit available)",
      duration: "6 months",
      certificate: true
    },
    {
      id: "harvard-cs50-security",
      title: "CS50's Web Security",
      provider: "Harvard University",
      url: "https://cs50.harvard.edu/web/2020/",
      description: "Web security and secure programming practices",
      duration: "12 weeks",
      certificate: true
    }
  ],
  "Mobile Development": [
    {
      id: "android-basics",
      title: "Android Basics in Kotlin",
      provider: "Google",
      url: "https://developer.android.com/courses/android-basics-kotlin/course",
      description: "Learn Android app development from scratch",
      duration: "Self-paced",
      certificate: true
    },
    {
      id: "ios-development",
      title: "iOS App Development",
      provider: "Apple",
      url: "https://developer.apple.com/tutorials/app-dev-training/",
      description: "Learn iOS development using Swift",
      duration: "Self-paced",
      certificate: false
    },
    {
      id: "flutter-bootcamp",
      title: "Flutter Development Bootcamp",
      provider: "App Brewery",
      url: "https://www.appbrewery.co/p/flutter-development-bootcamp-with-dart",
      description: "Complete Flutter app development course",
      duration: "28 hours",
      certificate: true
    }
  ],
  "Game Development": [
    {
      id: "unity-essentials",
      title: "Unity Essentials",
      provider: "Unity",
      url: "https://learn.unity.com/pathway/unity-essentials",
      description: "Learn game development fundamentals with Unity",
      duration: "20 hours",
      certificate: true
    },
    {
      id: "unreal-online",
      title: "Unreal Online Learning",
      provider: "Epic Games",
      url: "https://www.unrealengine.com/en-US/onlinelearning-courses",
      description: "Free Unreal Engine courses and tutorials",
      duration: "Self-paced",
      certificate: true
    },
    {
      id: "cs50-games",
      title: "CS50's Introduction to Game Development",
      provider: "Harvard University",
      url: "https://cs50.harvard.edu/games/2018/",
      description: "Learn game development concepts and programming",
      duration: "12 weeks",
      certificate: true
    }
  ],
  "Artificial Intelligence": [
    {
      id: "elements-ai",
      title: "Elements of AI",
      provider: "University of Helsinki",
      url: "https://www.elementsofai.com/",
      description: "Introduction to AI concepts and applications",
      duration: "30 hours",
      certificate: true
    },
    {
      id: "fast-ai-course",
      title: "Practical Deep Learning",
      provider: "fast.ai",
      url: "https://course.fast.ai/",
      description: "Deep learning for coders with PyTorch",
      duration: "Self-paced",
      certificate: false
    },
    {
      id: "stanford-ai",
      title: "Stanford AI Course",
      provider: "Stanford Online",
      url: "https://online.stanford.edu/courses/cs221-artificial-intelligence-principles-and-techniques",
      description: "AI principles and techniques",
      duration: "11 weeks",
      certificate: true
    }
  ]
}; 
import { CertificateCourse } from '@/types';

export const freeCertificateCourses: { [key: string]: CertificateCourse[] } = {
  "Computer Science": [
    {
      id: "cs50x",
      title: "CS50: Introduction to Computer Science",
      provider: {
        name: "Harvard University",
        type: "university",
        logo: "/images/providers/harvard.png"
      },
      description: "Harvard University's introduction to computer science and programming. Covers algorithms, data structures, and fundamental programming concepts.",
      duration: "10-12 weeks",
      level: "Beginner",
      certificateUrl: "https://cs50.harvard.edu/x/2024/certificate/",
      enrollmentUrl: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
      topics: ["Programming Basics", "Algorithms", "Data Structures", "Web Development", "Python", "SQL"],
      rating: 4.8,
      totalEnrolled: 3500000,
      isFree: true,
      language: "English",
      skills: ["Problem Solving", "Programming", "Computer Science Fundamentals"]
    },
    {
      id: "mit-intro-cs",
      title: "Introduction to Computer Science and Programming Using Python",
      provider: {
        name: "MIT",
        type: "university",
        logo: "/images/providers/mit.png"
      },
      description: "A comprehensive introduction to computer science using Python, focusing on problem-solving and algorithmic thinking.",
      duration: "9 weeks",
      level: "Beginner",
      enrollmentUrl: "https://www.edx.org/course/introduction-to-computer-science-and-programming-7",
      topics: ["Python", "Algorithms", "Data Structures", "Testing", "Debugging"],
      rating: 4.7,
      totalEnrolled: 1500000,
      isFree: true,
      language: "English",
      skills: ["Python Programming", "Computational Thinking", "Algorithm Design"]
    }
  ],
  "Web Development": [
    {
      id: "responsive-web-design",
      title: "Responsive Web Design Certification",
      provider: {
        name: "freeCodeCamp",
        type: "company",
        logo: "/images/providers/freecodecamp.png"
      },
      description: "Learn HTML, CSS, and responsive design principles through interactive coding challenges.",
      duration: "300 hours",
      level: "Beginner",
      certificateUrl: "https://www.freecodecamp.org/certification/",
      enrollmentUrl: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      topics: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design"],
      rating: 4.8,
      totalEnrolled: 2000000,
      isFree: true,
      language: "English",
      skills: ["HTML", "CSS", "Web Design", "Responsive Design"]
    },
    {
      id: "fullstack-open",
      title: "Full Stack Open",
      provider: {
        name: "University of Helsinki",
        type: "university",
        logo: "/images/providers/helsinki.png"
      },
      description: "Modern web development with React, Redux, Node.js, MongoDB, GraphQL and TypeScript.",
      duration: "Self-paced",
      level: "Intermediate",
      certificateUrl: "https://fullstackopen.com/en/certificate",
      enrollmentUrl: "https://fullstackopen.com/en/",
      topics: ["React", "Redux", "Node.js", "MongoDB", "GraphQL", "TypeScript"],
      rating: 4.9,
      totalEnrolled: 100000,
      isFree: true,
      language: "English",
      skills: ["Full Stack Development", "Modern JavaScript", "Web Development"]
    }
  ],
  "Data Science": [
    {
      id: "google-data-analytics",
      title: "Google Data Analytics Professional Certificate",
      provider: {
        name: "Google",
        type: "company",
        logo: "/images/providers/google.png"
      },
      description: "Learn key analytical skills and tools including SQL, R, and Tableau.",
      duration: "6 months",
      level: "Beginner",
      certificateUrl: "https://www.coursera.org/professional-certificates/google-data-analytics",
      enrollmentUrl: "https://www.coursera.org/professional-certificates/google-data-analytics",
      topics: ["Data Analysis", "SQL", "R Programming", "Tableau", "Data Visualization"],
      rating: 4.8,
      totalEnrolled: 1000000,
      isFree: true,
      language: "English",
      prerequisites: ["No prior experience required"],
      skills: ["Data Analysis", "SQL", "R Programming", "Data Visualization"]
    },
    {
      id: "ibm-data-science",
      title: "IBM Data Science Professional Certificate",
      provider: {
        name: "IBM",
        type: "company",
        logo: "/images/providers/ibm.png"
      },
      description: "Master data science tools and techniques through hands-on projects.",
      duration: "11 months",
      level: "Beginner",
      certificateUrl: "https://www.coursera.org/professional-certificates/ibm-data-science",
      enrollmentUrl: "https://www.coursera.org/professional-certificates/ibm-data-science",
      topics: ["Python", "SQL", "Data Analysis", "Machine Learning", "Data Visualization"],
      rating: 4.6,
      totalEnrolled: 750000,
      isFree: true,
      language: "English",
      skills: ["Data Science", "Python", "Machine Learning", "Data Analysis"]
    }
  ],
  "Cloud Computing": [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Cloud Practitioner Essentials",
      provider: {
        name: "Amazon Web Services",
        type: "company",
        logo: "/images/providers/aws.png"
      },
      description: "Fundamental understanding of AWS Cloud concepts, services, and terminology.",
      duration: "6 hours",
      level: "Beginner",
      certificateUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      enrollmentUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
      topics: ["Cloud Computing", "AWS Services", "Security", "Pricing", "Architecture"],
      rating: 4.7,
      totalEnrolled: 500000,
      isFree: true,
      language: "English",
      skills: ["Cloud Computing", "AWS", "Cloud Architecture"]
    }
  ],
  "Artificial Intelligence": [
    {
      id: "elements-ai",
      title: "Elements of AI",
      provider: {
        name: "University of Helsinki",
        type: "university",
        logo: "/images/providers/helsinki.png"
      },
      description: "Learn the basics of AI through practical examples and interactive exercises.",
      duration: "30 hours",
      level: "Beginner",
      certificateUrl: "https://www.elementsofai.com/certificate",
      enrollmentUrl: "https://www.elementsofai.com/",
      topics: ["AI Basics", "Machine Learning", "Neural Networks", "AI Ethics"],
      rating: 4.8,
      totalEnrolled: 500000,
      isFree: true,
      language: "English",
      skills: ["AI Fundamentals", "Machine Learning", "Critical Thinking"]
    }
  ],
  "Digital Marketing": [
    {
      id: "google-digital-marketing",
      title: "Google Digital Marketing & E-commerce Certificate",
      provider: {
        name: "Google",
        type: "company",
        logo: "/images/providers/google.png"
      },
      description: "Learn digital marketing and e-commerce skills including marketing analytics and measurement.",
      duration: "6 months",
      level: "Beginner",
      certificateUrl: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
      enrollmentUrl: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
      topics: ["Digital Marketing", "E-commerce", "Marketing Analytics", "Search Marketing"],
      rating: 4.7,
      totalEnrolled: 200000,
      isFree: true,
      language: "English",
      skills: ["Digital Marketing", "E-commerce", "Analytics", "SEO"]
    }
  ]
}; 
import { useState, useEffect } from "react";
import { Search, CheckCircle, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { courses } from "@/data/mockData";
import { Course } from "@/types";
import LessonContent from "@/components/courses/LessonContent";
import { toast } from "@/hooks/use-toast";
import SkillBadge from "@/components/courses/SkillBadge";
import CourseProgress from "@/components/courses/CourseProgress";
import FreeCertifications from "@/components/courses/FreeCertifications";
import TimeManagement from "@/components/courses/TimeManagement";
import { CareerPathsAndResources } from "@/components/courses/CareerPathsAndResources";
import { useUser } from "@/contexts/UserContext";
import CertificateCourses from "@/components/courses/CertificateCourses";
import FreeCertificateCourses from "@/components/courses/FreeCertificateCourses";
import CustomCourseRequest from "@/components/courses/CustomCourseRequest";
import InteractiveRoadmap from "@/components/InteractiveRoadmap";
import { useToast } from "@/components/ui/use-toast";
import PaymentPrompt from "@/components/courses/PaymentPrompt";

interface RoadmapNode {
  id: number;
  x: number;
  y: number;
  title: string;
  status: 'completed' | 'available' | 'locked';
  type: 'milestone' | 'challenge' | 'quiz';
}

interface GeneratedRoadmap {
  title: string;
  description: string;
  milestones: Array<{
    id: number;
    title: string;
    description: string;
    resources: Array<{ title: string; type: string; url: string }>;
    timeEstimate: string;
  }>;
}

// Sample lesson content data for the different difficulty levels
const courseContentData = {
  "Beginner": [
    {
      id: 1,
      title: "Introduction to Design Fundamentals",
      content: `
        <p>Design is all around us. From the device you're using to read this to the chair you're sitting on, every object has been designed with a purpose in mind.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">What is Design?</h3>
        <p>Design is the process of creating solutions that solve problems while being aesthetically pleasing and functional. Good design is often invisible — it simply works so well that you don't notice it.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Core Design Principles</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Balance:</strong> The distribution of visual weight in a design.</li>
          <li><strong>Contrast:</strong> The arrangement of opposite elements to create visual interest.</li>
          <li><strong>Emphasis:</strong> Creating a focal point in your design.</li>
          <li><strong>Proportion:</strong> The relationship between elements in terms of size.</li>
          <li><strong>Hierarchy:</strong> Organizing elements to show importance.</li>
          <li><strong>Repetition:</strong> Reusing elements throughout a design for consistency.</li>
        </ul>
      `,
      resources: [
        {
          title: "Design Fundamentals Video",
          type: "video" as const,
          content: "<p>This comprehensive video walks through the basic principles of design with visual examples.</p>",
          url: "https://www.youtube.com/watch?v=a5KYlHNKQB8"
        },
        {
          title: "Elements of Design",
          type: "article" as const,
          content: "<p>An in-depth exploration of how different design elements work together to create meaningful experiences.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What is the definition of design?",
          options: [
            "Making things look pretty",
            "Creating solutions that solve problems while being aesthetically pleasing and functional",
            "Following current trends",
            "Drawing pictures"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT a core design principle?",
          options: [
            "Balance",
            "Contrast",
            "Monetization",
            "Hierarchy"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What does 'hierarchy' refer to in design?",
          options: [
            "The management structure of a design team",
            "Organizing elements to show importance",
            "The historical timeline of design movements",
            "The price range of design elements"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Good design is often described as:",
          options: [
            "Flashy and attention-grabbing",
            "Expensive and luxurious",
            "Invisible because it works so well",
            "Complicated and sophisticated"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What is 'contrast' in design?",
          options: [
            "The arrangement of opposite elements to create visual interest",
            "The overall brightness of a design",
            "The color palette used in a design",
            "The spacing between elements"
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          question: "Which principle deals with the distribution of visual weight?",
          options: [
            "Proportion",
            "Emphasis",
            "Balance",
            "Repetition"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "What is the purpose of repetition in design?",
          options: [
            "To fill empty space",
            "To make designs larger",
            "To create consistency",
            "To increase production costs"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          question: "What does 'emphasis' create in a design?",
          options: [
            "A focal point",
            "A border",
            "A background",
            "A texture"
          ],
          correctAnswer: 0
        },
        {
          id: 9,
          question: "How are elements organized in a hierarchy?",
          options: [
            "Alphabetically",
            "By color",
            "By size",
            "To show importance"
          ],
          correctAnswer: 3
        },
        {
          id: 10,
          question: "Proportion in design refers to:",
          options: [
            "The printing dimensions",
            "The relationship between elements in terms of size",
            "The cost ratio of materials",
            "The number of elements used"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Color Theory",
      content: `
        <p>Color is one of the most powerful design tools we have. It influences mood, creates emphasis, and helps with organization.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">The Color Wheel</h3>
        <p>The color wheel consists of primary colors (red, yellow, blue), secondary colors (green, orange, purple), and tertiary colors (mixtures of primary and secondary colors).</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Color Harmonies</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Complementary:</strong> Colors opposite each other on the wheel.</li>
          <li><strong>Analogous:</strong> Colors next to each other on the wheel.</li>
          <li><strong>Triadic:</strong> Three colors evenly spaced on the wheel.</li>
          <li><strong>Monochromatic:</strong> Different shades and tints of one color.</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Color Psychology</h3>
        <p>Colors can evoke different emotions and associations:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Red:</strong> Energy, passion, danger</li>
          <li><strong>Blue:</strong> Calm, trust, professionalism</li>
          <li><strong>Yellow:</strong> Optimism, clarity, warmth</li>
          <li><strong>Green:</strong> Growth, health, prosperity</li>
          <li><strong>Purple:</strong> Creativity, royalty, luxury</li>
        </ul>
      `,
      resources: [
        {
          title: "Interactive Color Wheel",
          type: "documentation" as const,
          content: "<p>Explore color relationships and create harmonious color schemes with this interactive tool.</p>"
        },
        {
          title: "Color Psychology in Design",
          type: "article" as const,
          content: "<p>Learn how different colors affect human psychology and how to use this knowledge in your designs.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "Which of these are the primary colors?",
          options: [
            "Red, yellow, blue",
            "Red, green, blue",
            "Cyan, magenta, yellow",
            "Orange, green, purple"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "What are complementary colors?",
          options: [
            "Colors next to each other on the color wheel",
            "Colors that make you feel happy",
            "Colors opposite each other on the color wheel",
            "Colors that are shades of the same hue"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "Which color harmony uses different shades and tints of one color?",
          options: [
            "Triadic",
            "Complementary",
            "Analogous",
            "Monochromatic"
          ],
          correctAnswer: 3
        },
        {
          id: 4,
          question: "What emotion is commonly associated with blue?",
          options: [
            "Anger",
            "Calm",
            "Excitement",
            "Hunger"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What are secondary colors?",
          options: [
            "Red, yellow, blue",
            "Green, orange, purple",
            "Black, white, gray",
            "Pink, brown, turquoise"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "Which color is often associated with energy and passion?",
          options: [
            "Blue",
            "Green",
            "Red",
            "Yellow"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "Analogous colors are:",
          options: [
            "Colors next to each other on the wheel",
            "Colors that create contrast",
            "Three colors evenly spaced on the wheel",
            "Colors that never go well together"
          ],
          correctAnswer: 0
        },
        {
          id: 8,
          question: "Which color is commonly associated with growth and health?",
          options: [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          question: "A triadic color scheme uses:",
          options: [
            "Two colors",
            "Three colors evenly spaced on the wheel",
            "Four colors in a square formation",
            "Only shades of gray"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "Purple is often associated with:",
          options: [
            "Danger and warning",
            "Nature and growth",
            "Creativity and royalty",
            "Trust and dependability"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      title: "Typography Basics",
      content: `
        <p>Typography is the art of arranging type to make written language readable, legible, and appealing when displayed.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Font Classifications</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Serif:</strong> Have small lines attached to the end of strokes (Times New Roman, Georgia)</li>
          <li><strong>Sans-serif:</strong> Clean without the small lines (Arial, Helvetica)</li>
          <li><strong>Script:</strong> Mimic handwriting (Brush Script, Lucida Calligraphy)</li>
          <li><strong>Display:</strong> Decorative fonts for headlines (Impact, Comic Sans)</li>
          <li><strong>Monospace:</strong> Each character takes up the same amount of space (Courier, Roboto Mono)</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Typography Terms</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Leading:</strong> The vertical space between lines of text</li>
          <li><strong>Tracking:</strong> The uniform space between characters</li>
          <li><strong>Kerning:</strong> The space between specific character pairs</li>
          <li><strong>Hierarchy:</strong> The organization of text to show importance</li>
          <li><strong>Alignment:</strong> How text is positioned (left, right, center, justified)</li>
        </ul>
      `,
      resources: [
        {
          title: "Typography in Design Systems",
          type: "article" as const,
          content: "<p>An exploration of how to build consistent and scalable typography systems for digital products.</p>"
        },
        {
          title: "Font Pairing Guide",
          type: "documentation" as const,
          content: "<p>Learn the art of combining different fonts to create harmonious and effective designs.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What are fonts with small lines attached to the end of strokes called?",
          options: [
            "Sans-serif",
            "Serif",
            "Script",
            "Display"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What does 'leading' refer to in typography?",
          options: [
            "The vertical space between lines of text",
            "The main font in a design",
            "The most prominent text element",
            "The first paragraph of text"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "Which font type mimics handwriting?",
          options: [
            "Serif",
            "Sans-serif",
            "Script",
            "Monospace"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What is kerning?",
          options: [
            "The overall size of text",
            "The space between specific character pairs",
            "The thickness of letterforms",
            "The color of text"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Which of these is a sans-serif font?",
          options: [
            "Times New Roman",
            "Georgia",
            "Arial",
            "Courier"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          question: "What type of font is used when each character takes up the same amount of space?",
          options: [
            "Serif",
            "Sans-serif",
            "Display",
            "Monospace"
          ],
          correctAnswer: 3
        },
        {
          id: 7,
          question: "What is tracking in typography?",
          options: [
            "Following the movement of a reader's eyes",
            "The uniform space between characters",
            "The style of punctuation marks",
            "The process of selecting fonts"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "Which alignment pushes text to line up at the right edge?",
          options: [
            "Left alignment",
            "Center alignment",
            "Right alignment",
            "Justified alignment"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          question: "What is typography?",
          options: [
            "The study of typewriters",
            "The art of arranging type to make written language readable and appealing",
            "The process of creating new fonts",
            "The history of printing presses"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "Which of these is a decorative font primarily used for headlines?",
          options: [
            "Serif",
            "Sans-serif",
            "Display",
            "Monospace"
          ],
          correctAnswer: 2
        }
      ]
    }
  ],
  "Intermediate": [
    {
      id: 1,
      title: "User Interface Design Patterns",
      content: `
        <p>UI design patterns are reusable solutions to common design problems. They represent best practices used by designers to solve similar challenges.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Common UI Patterns</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Navigation:</strong> Hamburger menus, tab bars, breadcrumbs</li>
          <li><strong>Data Display:</strong> Cards, tables, lists, grids</li>
          <li><strong>User Input:</strong> Forms, search fields, filters</li>
          <li><strong>Feedback:</strong> Progress indicators, notifications, modals</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">When to Use Patterns</h3>
        <p>Design patterns are valuable because they:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Are familiar to users, reducing cognitive load</li>
          <li>Solve common problems efficiently</li>
          <li>Create consistency across applications</li>
          <li>Improve usability and learnability</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Adapting Patterns</h3>
        <p>While patterns provide proven solutions, they should be adapted to:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Match your specific use case</li>
          <li>Align with your brand identity</li>
          <li>Meet the unique needs of your users</li>
        </ul>
      `,
      resources: [
        {
          title: "UI Pattern Libraries",
          type: "documentation" as const,
          content: "<p>A comprehensive collection of UI patterns with examples and implementation guidelines.</p>"
        },
        {
          title: "When to Break UI Conventions",
          type: "article" as const,
          content: "<p>An exploration of when it's appropriate to deviate from established UI patterns.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What are UI design patterns?",
          options: [
            "Visual decorations for interfaces",
            "Reusable solutions to common design problems",
            "Color combinations for websites",
            "Programming algorithms"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT a category of UI patterns mentioned in the lesson?",
          options: [
            "Navigation",
            "Data Display",
            "Authentication",
            "Feedback"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "Why are design patterns valuable?",
          options: [
            "They are legally required for websites",
            "They make designs more colorful",
            "They are familiar to users, reducing cognitive load",
            "They allow designers to avoid thinking about solutions"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "Which of these is an example of a navigation pattern?",
          options: [
            "Modal dialog",
            "Progress bar",
            "Breadcrumbs",
            "Data table"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "How should design patterns be used?",
          options: [
            "Exactly as they appear in pattern libraries without changes",
            "Adapted to match your specific use case and brand",
            "Only for mobile applications",
            "Only when required by law"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "Which pattern would be most appropriate for showing a user's progress through a multi-step process?",
          options: [
            "Card layout",
            "Hamburger menu",
            "Progress indicator",
            "Breadcrumb"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "What is a benefit of using common design patterns?",
          options: [
            "They make your design more unique",
            "They improve usability and learnability",
            "They require more development time",
            "They always include animations"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "Cards, tables, and lists are examples of which pattern category?",
          options: [
            "Navigation",
            "User Input",
            "Feedback",
            "Data Display"
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          question: "When might it be appropriate to break from established UI patterns?",
          options: [
            "Never, patterns should always be followed exactly",
            "When you want your interface to look different",
            "When the pattern doesn't meet the unique needs of your users",
            "When you don't have time to implement the standard pattern"
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: "What do forms, search fields, and filters represent in UI patterns?",
          options: [
            "Navigation patterns",
            "User input patterns",
            "Feedback patterns",
            "Layout patterns"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      title: "Responsive Design Principles",
      content: `
        <p>Responsive design ensures that web applications look and function well on a variety of devices and window sizes.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Core Principles</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Fluid Grids:</strong> Using relative units like percentages instead of fixed pixels</li>
          <li><strong>Flexible Images:</strong> Images that scale within their containing elements</li>
          <li><strong>Media Queries:</strong> CSS rules that apply different styles based on device characteristics</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Mobile-First Approach</h3>
        <p>Starting design from the smallest screen and working up to larger ones offers several advantages:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Forces prioritization of content</li>
          <li>Ensures essential functionality works on all devices</li>
          <li>Generally leads to cleaner, more efficient code</li>
          <li>Aligns with the growing trend of mobile usage</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Common Breakpoints</h3>
        <p>While breakpoints should be determined by content, common ranges include:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Small:</strong> Up to 640px (mobile phones)</li>
          <li><strong>Medium:</strong> 641px to 1024px (tablets and small laptops)</li>
          <li><strong>Large:</strong> 1025px and above (desktops and large screens)</li>
        </ul>
      `,
      resources: [
        {
          title: "Responsive Design Testing Tools",
          type: "documentation" as const,
          content: "<p>A collection of tools for testing responsive designs across different devices and screen sizes.</p>"
        },
        {
          title: "Beyond Media Queries: Modern Responsive Design",
          type: "article" as const,
          content: "<p>Exploring newer CSS features like CSS Grid, Flexbox, and container queries for responsive layouts.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What is responsive design?",
          options: [
            "Making websites load quickly",
            "Ensuring applications look and function well on various devices and window sizes",
            "Creating separate versions of a website for mobile and desktop",
            "Adding animations to websites"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT one of the core principles of responsive design mentioned in the lesson?",
          options: [
            "Fluid Grids",
            "Flexible Images",
            "Media Queries",
            "Fixed Layouts"
          ],
          correctAnswer: 3
        },
        {
          id: 3,
          question: "What does a 'mobile-first' approach mean?",
          options: [
            "Only designing for mobile devices",
            "Starting design from the smallest screen and working up to larger ones",
            "Making the mobile version after the desktop version",
            "Using mobile devices to test designs"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "What are media queries used for?",
          options: [
            "Searching for media files",
            "Applying different styles based on device characteristics",
            "Optimizing images for web",
            "Connecting to media databases"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What is an advantage of the mobile-first approach?",
          options: [
            "It requires less design work",
            "It forces prioritization of content",
            "It eliminates the need for desktop design",
            "It always results in faster websites"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "What are fluid grids based on?",
          options: [
            "Fixed pixel measurements",
            "Relative units like percentages",
            "Standard grid templates",
            "Hardware specifications"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "What is the typical range for 'small' breakpoints?",
          options: [
            "Up to 640px",
            "641px to 1024px",
            "1025px and above",
            "Any size under 1000px"
          ],
          correctAnswer: 0
        },
        {
          id: 8,
          question: "What should primarily determine breakpoints in responsive design?",
          options: [
            "Industry standards",
            "Content needs",
            "Device manufacturers' specifications",
            "Browser requirements"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "Which CSS features are mentioned as modern tools for responsive design?",
          options: [
            "Tables and iframes",
            "Flash and JavaScript",
            "CSS Grid and Flexbox",
            "Borders and backgrounds"
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: "What does 'Flexible Images' refer to in responsive design?",
          options: [
            "Images with flexible licensing terms",
            "Images that change their content based on screen size",
            "Images that scale within their containing elements",
            "Images with adjustable color schemes"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      title: "Information Architecture",
      content: `
        <p>Information architecture (IA) is the practice of organizing, structuring, and labeling content in an effective and sustainable way.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Key Components of IA</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Organization Schemes:</strong> How information is categorized (alphabetical, chronological, topical, etc.)</li>
          <li><strong>Labeling Systems:</strong> How information is represented (terminology used for categories, navigation, etc.)</li>
          <li><strong>Navigation Systems:</strong> How users move through information (menus, links, search, filters)</li>
          <li><strong>Search Systems:</strong> How users look for information</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Common IA Patterns</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Hierarchical:</strong> Tree structure with parent-child relationships</li>
          <li><strong>Sequential:</strong> Linear path through content (step-by-step)</li>
          <li><strong>Matrix:</strong> Navigation along multiple dimensions or facets</li>
          <li><strong>Database:</strong> Content organized around fields or parameters</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">User-Centered IA</h3>
        <p>Effective IA should be based on:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>User needs and expectations</li>
          <li>Content requirements and relationships</li>
          <li>Context of use (device, location, goals)</li>
        </ul>
      `,
      resources: [
        {
          title: "IA Visualization Techniques",
          type: "video" as const,
          content: "<p>Learn various methods for visualizing information architecture, including sitemaps, wireflows, and concept models.</p>",
          url: "https://www.youtube.com/watch?v=TZe0gXnxhAo"
        },
        {
          title: "Card Sorting for IA Research",
          type: "article" as const,
          content: "<p>A guide to conducting card sorting exercises to inform your information architecture decisions.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What is information architecture?",
          options: [
            "The technical structure of a website's code",
            "The practice of organizing, structuring, and labeling content effectively",
            "The visual design of information graphics",
            "The arrangement of physical spaces in an office"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT a key component of information architecture mentioned in the lesson?",
          options: [
            "Organization Schemes",
            "Labeling Systems",
            "Color Systems",
            "Search Systems"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is a hierarchical IA pattern?",
          options: [
            "Content arranged in a timeline",
            "Tree structure with parent-child relationships",
            "Navigation along multiple dimensions",
            "Content organized around database fields"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "What research method is mentioned for informing IA decisions?",
          options: [
            "A/B testing",
            "Card sorting",
            "Eye tracking",
            "Survey distribution"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Which factors should effective IA be based on?",
          options: [
            "Latest design trends and competitor websites",
            "User needs, content requirements, and context of use",
            "Technical limitations and development budget",
            "CEO preferences and marketing requirements"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "Which IA pattern would be most appropriate for a step-by-step tutorial?",
          options: [
            "Hierarchical",
            "Sequential",
            "Matrix",
            "Database"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "What does a 'labeling system' refer to in IA?",
          options: [
            "How users are categorized",
            "How content is tagged internally",
            "How information is represented through terminology",
            "How pricing tiers are labeled"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          question: "Which IA pattern allows navigation along multiple dimensions or facets?",
          options: [
            "Hierarchical",
            "Sequential",
            "Matrix",
            "Database"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          question: "What is a sitemap in the context of IA?",
          options: [
            "A physical map of a website's server location",
            "A visualization technique for representing information architecture",
            "A list of all URLs on a website for search engines",
            "A map showing the location of users accessing a site"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "Which organization scheme would arrange content by date?",
          options: [
            "Alphabetical",
            "Chronological",
            "Topical",
            "Geographical"
          ],
          correctAnswer: 1
        }
      ]
    }
  ],
  "Advanced": [
    {
      id: 1,
      title: "Design Systems Architecture",
      content: `
        <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Components of a Design System</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Design Tokens:</strong> Visual values that represent your brand (colors, typography, spacing, etc.)</li>
          <li><strong>UI Components:</strong> Reusable interface elements with specific behaviors and styles</li>
          <li><strong>Patterns:</strong> Common arrangements of components that solve specific user problems</li>
          <li><strong>Guidelines:</strong> Rules and best practices for using the system</li>
          <li><strong>Documentation:</strong> Comprehensive resources for designers and developers</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Benefits of Design Systems</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Consistency:</strong> Unified user experience across products</li>
          <li><strong>Efficiency:</strong> Faster design and development cycles</li>
          <li><strong>Scalability:</strong> Easier maintenance and growth</li>
          <li><strong>Collaboration:</strong> Improved communication between teams</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Governance and Evolution</h3>
        <p>Successful design systems need:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Clear ownership and contribution models</li>
          <li>Version control and change management</li>
          <li>Feedback loops from products using the system</li>
          <li>Regular updates and improvements</li>
        </ul>
      `,
      resources: [
        {
          title: "Famous Design Systems Analysis",
          type: "article" as const,
          content: "<p>A deep dive into successful design systems like Google's Material Design, IBM's Carbon, and Airbnb's Design System.</p>"
        },
        {
          title: "Building a Design System from Scratch",
          type: "documentation" as const,
          content: "<p>A comprehensive guide to creating, implementing, and maintaining a design system for your organization.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What is a design system?",
          options: [
            "A software for creating designs",
            "A collection of reusable components with clear standards",
            "A type of design methodology",
            "A system for organizing design files"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT a component of a design system mentioned in the lesson?",
          options: [
            "Design Tokens",
            "UI Components",
            "Marketing Materials",
            "Guidelines"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What are design tokens?",
          options: [
            "Access passes to design software",
            "Visual values that represent your brand",
            "Digital certificates for designers",
            "Rewards for completing design tasks"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Which of these is a benefit of using a design system?",
          options: [
            "It eliminates the need for designers",
            "It creates more creative freedom for individual projects",
            "It provides a unified user experience across products",
            "It reduces the need for documentation"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What aspect of design system governance involves tracking changes over time?",
          options: [
            "Clear ownership",
            "Version control",
            "Feedback loops",
            "Documentation"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "What is an example of a well-known design system mentioned in the resources?",
          options: [
            "Apple's Human Interface",
            "Microsoft's Fluent",
            "Google's Material Design",
            "All of the above"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "What do patterns in a design system represent?",
          options: [
            "Decorative visual elements",
            "Common arrangements of components that solve specific user problems",
            "Coded templates for developers",
            "Graphic design elements like backgrounds"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "What is needed for successful design system evolution?",
          options: [
            "Constant redesigns",
            "Limiting access to only senior designers",
            "Feedback loops from products using the system",
            "Keeping the system unchanged once established"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          question: "Which aspect of a design system primarily helps with development speed?",
          options: [
            "Documentation",
            "Guidelines",
            "Reusable UI Components",
            "Design Tokens"
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: "What role does documentation play in a design system?",
          options: [
            "It's purely for legal purposes",
            "It provides comprehensive resources for designers and developers",
            "It's only needed for new team members",
            "It replaces the need for training"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Interaction Design",
      content: `
        <p>Interaction design focuses on creating engaging interfaces with well-thought-out behaviors that anticipate and respond to user actions.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Microinteractions</h3>
        <p>Microinteractions are small moments designed to provide feedback, accomplish a single task, or enhance the user experience:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Triggers:</strong> What initiates the interaction (user or system)</li>
          <li><strong>Rules:</strong> What happens during the interaction</li>
          <li><strong>Feedback:</strong> How users know what's happening</li>
          <li><strong>Loops & Modes:</strong> How the interaction changes over time or with repeated use</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Animation and Motion</h3>
        <p>Purposeful animation can:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Guide attention and establish hierarchy</li>
          <li>Indicate relationships between elements</li>
          <li>Provide feedback on user actions</li>
          <li>Create a sense of continuity and flow</li>
          <li>Express brand personality</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Gesture-Based Interfaces</h3>
        <p>Design considerations for touch, voice, and motion interfaces:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Discoverability of available gestures</li>
          <li>Consistency with platform conventions</li>
          <li>Feedback that confirms gesture recognition</li>
          <li>Accessibility alternatives</li>
        </ul>
      `,
      resources: [
        {
          title: "Microinteractions: Designing with Details",
          type: "video" as const,
          content: "<p>A detailed walkthrough of how to design effective microinteractions that enhance usability and delight.</p>",
          url: "https://www.youtube.com/watch?v=wHjf5LGUNzs"
        },
        {
          title: "Animation Principles for UX",
          type: "article" as const,
          content: "<p>How to apply traditional animation principles to create meaningful motion in digital interfaces.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What is interaction design primarily focused on?",
          options: [
            "Visual aesthetics of interfaces",
            "Creating engaging interfaces with well-thought-out behaviors",
            "Programming complex systems",
            "Marketing digital products"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What are microinteractions?",
          options: [
            "Very small design elements",
            "Small moments designed to provide feedback or accomplish a single task",
            "Microscopic animations only visible on high-resolution screens",
            "Interactions designed for microservices architecture"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Which of these is NOT one of the components of microinteractions mentioned?",
          options: [
            "Triggers",
            "Rules",
            "Templates",
            "Feedback"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What can purposeful animation do in an interface?",
          options: [
            "Replace the need for text instructions",
            "Eliminate loading times",
            "Guide attention and establish hierarchy",
            "Reduce the need for user testing"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What is an important consideration for gesture-based interfaces?",
          options: [
            "Making all functions accessible through gestures only",
            "Creating unique gestures different from platform conventions",
            "Discoverability of available gestures",
            "Limiting gestures to simple taps only"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          question: "What initiates a microinteraction?",
          options: [
            "Always a system event",
            "Always a user action",
            "A trigger, which can be user or system initiated",
            "A random timer"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "How can animation create a sense of continuity in an interface?",
          options: [
            "By making all elements the same color",
            "By showing relationships and transitions between states",
            "By playing continuously in the background",
            "By eliminating the need for scrolling"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "What does 'Loops & Modes' refer to in microinteractions?",
          options: [
            "Programming constructs used to create interactions",
            "How the interaction changes over time or with repeated use",
            "Different animation techniques",
            "Various input methods"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "Why is feedback important in gesture-based interfaces?",
          options: [
            "It makes the interface more colorful",
            "It confirms gesture recognition to the user",
            "It allows designers to track user behavior",
            "It reduces server load"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "Which of these would be an example of a well-designed microinteraction?",
          options: [
            "A complex animation that plays when the app launches",
            "A subtle vibration when a button is pressed to confirm the action",
            "A loud sound effect that plays with every click",
            "An easter egg hidden in the about page"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 3,
      title: "Design for Accessibility",
      content: `
        <p>Accessibility in design ensures that products and services can be used by people with a wide range of abilities and disabilities.</p>
        <h3 class="text-lg font-medium mt-4 mb-2">Web Content Accessibility Guidelines (WCAG)</h3>
        <p>WCAG is organized around four principles, known as POUR:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
          <li><strong>Operable:</strong> Interface components must be operable by all users</li>
          <li><strong>Understandable:</strong> Information and operation must be understandable</li>
          <li><strong>Robust:</strong> Content must be robust enough to work with current and future technologies</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Inclusive Design Practices</h3>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Keyboard accessibility:</strong> All functionality available without a mouse</li>
          <li><strong>Screen reader compatibility:</strong> Proper markup and ARIA attributes</li>
          <li><strong>Color contrast:</strong> Sufficient contrast between text and background</li>
          <li><strong>Text alternatives:</strong> Alt text for images and descriptions for complex content</li>
          <li><strong>Clear typography:</strong> Readable fonts, adequate sizing, and proper spacing</li>
          <li><strong>Focus indicators:</strong> Visible focus states for interactive elements</li>
        </ul>
        <h3 class="text-lg font-medium mt-4 mb-2">Testing for Accessibility</h3>
        <p>Comprehensive testing should include:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Automated testing tools (WAVE, Axe, Lighthouse)</li>
          <li>Manual keyboard navigation testing</li>
          <li>Screen reader testing</li>
          <li>User testing with people with disabilities</li>
        </ul>
      `,
      resources: [
        {
          title: "Designing for Screen Readers",
          type: "documentation" as const,
          content: "<p>A practical guide to ensuring your designs work well with screen readers and other assistive technologies.</p>"
        },
        {
          title: "Color Contrast in UI Design",
          type: "video" as const,
          content: "<p>Learn how to create visually appealing designs that maintain sufficient color contrast for accessibility.</p>"
        }
      ],
      quizQuestions: [
        {
          id: 1,
          question: "What does accessibility in design ensure?",
          options: [
            "That products are used only by intended users",
            "That products and services can be used by people with a wide range of abilities",
            "That designs look modern and trendy",
            "That products can only be accessed with proper authentication"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What does the acronym POUR stand for in WCAG?",
          options: [
            "Practical, Organized, Unified, Responsive",
            "Perceivable, Operable, Understandable, Robust",
            "Proper, Optimal, Usable, Reliable",
            "Purposeful, Original, Useful, Relevant"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Which of these is NOT one of the inclusive design practices mentioned in the lesson?",
          options: [
            "Keyboard accessibility",
            "Screen reader compatibility",
            "Animation complexity",
            "Color contrast"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What is the purpose of alt text in accessible design?",
          options: [
            "To make images load faster",
            "To provide text alternatives for images",
            "To add keywords for search engines",
            "To store metadata about image copyright"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What does 'keyboard accessibility' mean?",
          options: [
            "Providing physical keyboards with all devices",
            "Making all functionality available without a mouse",
            "Using keyboard shortcuts for all functions",
            "Including on-screen keyboards for mobile devices"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "Which of these is an automated accessibility testing tool mentioned in the lesson?",
          options: [
            "WAVE",
            "Photoshop",
            "InVision",
            "Bootstrap"
          ],
          correctAnswer: 0
        },
        {
          id: 7,
          question: "What are 'focus indicators' used for in accessible design?",
          options: [
            "Highlighting key marketing messages",
            "Showing visible focus states for interactive elements",
            "Measuring user attention with eye tracking",
            "Improving camera focus in product photos"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "What does the 'Robust' principle in WCAG refer to?",
          options: [
            "Making interfaces physically durable",
            "Ensuring content works with current and future technologies",
            "Building systems that can handle high traffic",
            "Creating designs that withstand criticism"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "Why is sufficient color contrast important in accessible design?",
          options: [
            "It makes designs more visually appealing",
            "It helps users with visual impairments perceive content",
            "It reduces battery usage on mobile devices",
            "It's required by copyright law"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "What is ARIA in the context of accessibility?",
          options: [
            "A type of screen reader software",
            "Attributes that help make web content more accessible",
            "An international accessibility certification",
            "A design software for accessible interfaces"
          ],
          correctAnswer: 1
        }
      ]
    }
  ]
};

const CourseContent = ({ course }: { course: Course }) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState<boolean>(false);
  const { user } = useUser();
  
  // Get content based on course level
  const getLessonContent = () => {
    if (course.level === "Beginner") {
      return courseContentData.Beginner;
    } else if (course.level === "Intermediate") {
      return courseContentData.Intermediate;
    } else {
      return courseContentData.Advanced;
    }
  };
  
  const lessons = getLessonContent();
  const allLessonsCompleted = lessons.every(lesson => 
    localStorage.getItem(`course_${course.id}_lesson_${lesson.id}_quiz`) === "completed"
  );

  // Check if lesson requires payment
  const isLessonLocked = (lessonId: number) => {
    // First two lessons are free
    if (lessonId <= 2) return false;
    
    // Check if payment is made for this lesson set
    const paymentMade = localStorage.getItem(`course_${course.id}_payment_${Math.floor((lessonId - 1) / 2)}`);
    return !paymentMade;
  };

  useEffect(() => {
    // Load total time spent on this course from localStorage
    const savedTotalTime = localStorage.getItem(`course_${course.id}_total_time`);
    if (savedTotalTime) {
      setTotalTimeSpent(parseInt(savedTotalTime));
    }
    
    // Check if course is completed to show badge
    if (allLessonsCompleted) {
      const badgeShown = localStorage.getItem(`course_${course.id}_badge_shown`);
      if (!badgeShown) {
        setShowBadge(true);
      }
    }
  }, [course.id, allLessonsCompleted]);
  
  const handleLessonSelect = (lessonId: number) => {
    if (isLessonLocked(lessonId)) {
      setShowPaymentPrompt(true);
      return;
    }
    
    setSelectedLesson(lessonId);
    localStorage.setItem(`course_${course.id}_current_lesson`, lessonId.toString());
    toast({
      title: "Lesson started",
      description: `You're now viewing ${lessons.find(l => l.id === lessonId)?.title || "a lesson"}`
    });
  };

  const handlePaymentComplete = () => {
    // Save payment status for current lesson set
    const currentSet = Math.floor((selectedLesson || 3) / 2);
    localStorage.setItem(`course_${course.id}_payment_${currentSet}`, 'true');
    setShowPaymentPrompt(false);
    
    // Continue to the selected lesson
    if (selectedLesson) {
      handleLessonSelect(selectedLesson);
    }
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
    // Clear current lesson from localStorage
    localStorage.removeItem(`course_${course.id}_current_lesson`);
  };

  const handleTimeUpdate = (seconds: number) => {
    // Update total time for the course
    const newTotalTime = totalTimeSpent + (seconds - (totalTimeSpent > 0 ? totalTimeSpent : 0));
    setTotalTimeSpent(newTotalTime);
    localStorage.setItem(`course_${course.id}_total_time`, newTotalTime.toString());
  };
  
  const handleBadgeClose = () => {
    setShowBadge(false);
    localStorage.setItem(`course_${course.id}_badge_shown`, "true");
  };

  // Load current lesson from localStorage on mount
  useEffect(() => {
    const currentLesson = localStorage.getItem(`course_${course.id}_current_lesson`);
    if (currentLesson) {
      setSelectedLesson(parseInt(currentLesson));
    }
  }, [course.id]);

  return (
    <div className="space-y-6">
      {showPaymentPrompt && (
        <PaymentPrompt
          onPaymentComplete={handlePaymentComplete}
          onCancel={() => setShowPaymentPrompt(false)}
        />
      )}
      
      {showBadge && allLessonsCompleted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="max-w-md w-full">
            <SkillBadge 
              courseId={course.id}
              courseName={course.title}
              completionDate={new Date()}
              score={90}
            />
            <Button 
              onClick={handleBadgeClose}
              className="w-full mt-4"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-primary/5 p-4 rounded-lg">
        <h3 className="text-lg font-medium">Course Overview</h3>
        <p className="mt-2">{course.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium">What you'll learn:</h4>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Fundamental concepts and principles</li>
            <li>Practical skills and techniques</li>
            <li>Industry best practices</li>
            <li>Real-world application scenarios</li>
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Your progress</h4>
            <span className="text-sm">{course.progress}% complete</span>
          </div>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Total time spent: {Math.floor(totalTimeSpent / 3600)}h {Math.floor((totalTimeSpent % 3600) / 60)}m
          </div>
        </div>
      </div>
      
      {selectedLesson !== null ? (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={handleBackToLessons}
            className="mb-4"
          >
            ← Back to Lesson List
          </Button>
          
          {lessons.filter(lesson => lesson.id === selectedLesson).map((lesson) => (
            <LessonContent
              key={lesson.id}
              course={course}
              lessonId={lesson.id}
              title={lesson.title}
              content={lesson.content}
              resources={lesson.resources}
              quizQuestions={lesson.quizQuestions}
              level={course.level}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Course Materials</h3>
          <div className="grid gap-3">
            {lessons.map((lesson) => {
              const isCompleted = localStorage.getItem(`course_${course.id}_lesson_${lesson.id}_quiz`) === "completed";
              const isLocked = isLessonLocked(lesson.id);
              
              return (
                <Card key={lesson.id} className={`bg-white ${isLocked ? 'opacity-75' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base flex items-center gap-2">
                        {isLocked && <Lock className="h-4 w-4" />}
                        {lesson.title}
                      </CardTitle>
                      {isCompleted && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {course.title} - Lesson {lesson.id}
                    </p>
                    {isLocked && (
                      <p className="text-sm text-amber-600 mt-2">
                        Unlock this lesson for ₹49
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleLessonSelect(lesson.id)}
                      variant={isLocked ? "secondary" : "outline"}
                      size="sm" 
                      className="w-full"
                    >
                      {isLocked ? 'Unlock Lesson' : isCompleted ? 'Review Lesson' : 'Start Lesson'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("my-courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);
  const { user } = useUser();
  const { toast } = useToast();

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCourseCategory = (courseId: string) => {
    if (courseId.startsWith("b")) return "business";
    if (courseId.startsWith("ls")) return "science";
    if (courseId.startsWith("m")) return "mathematics";
    return "speaking"; // default fallback
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentTab("my-courses");
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };
  
  const roadmapNodes: RoadmapNode[] = [
    {
      id: 1,
      x: 100,
      y: 100,
      title: "Getting Started",
      status: "completed",
      type: "milestone"
    },
    {
      id: 2,
      x: 250,
      y: 200,
      title: "Basic Concepts",
      status: "available",
      type: "challenge"
    },
    {
      id: 3,
      x: 400,
      y: 150,
      title: "First Project",
      status: "locked",
      type: "milestone"
    },
    {
      id: 4,
      x: 550,
      y: 250,
      title: "Knowledge Check",
      status: "locked",
      type: "quiz"
    },
    {
      id: 5,
      x: 700,
      y: 150,
      title: "Advanced Topics",
      status: "locked",
      type: "milestone"
    }
  ];

  const handleNodeClick = (node: RoadmapNode) => {
    if (node.status === 'locked') return;
    
    toast({
      title: `${node.title}`,
      description: `Starting ${node.type}: ${node.title}`,
    });
  };

  const handleCustomRoadmapComplete = (roadmap: GeneratedRoadmap) => {
    setGeneratedRoadmap(roadmap);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-gray-600 mt-2">
          Learn at your own pace with our interactive courses and earn certificates
        </p>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Free Certificates</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="interactive">Interactive View</TabsTrigger>
        </TabsList>

        <TabsContent value="my-courses" className="space-y-6">
          {selectedCourse ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <Button 
                  variant="outline" 
                  onClick={handleBackToList}
                  className="mb-4"
                >
                  ← Back to Course List
                </Button>
                <CourseContent course={selectedCourse} />
              </div>
              <div className="space-y-6">
                <CourseProgress course={selectedCourse} />
                <TimeManagement course={selectedCourse} />
                <CareerPathsAndResources 
                  course={selectedCourse} 
                  category={getCourseCategory(selectedCourse.id)} 
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{course.totalLessons} lessons</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                    {course.progress > 0 && (
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleCourseSelect(course)} 
                      className="w-full"
                    >
                      {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <FreeCertificateCourses />
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <CustomCourseRequest onRequestComplete={handleCustomRoadmapComplete} />
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Learning Path</CardTitle>
              <CardDescription>
                Follow your personalized learning journey through interactive milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveRoadmap
                nodes={roadmapNodes}
                onNodeClick={handleNodeClick}
                currentProgress={30}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {generatedRoadmap && (
          <TabsContent value="view" className="space-y-6">
            {/* Existing generated roadmap content */}
            // ... existing code ...
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default CoursesPage;

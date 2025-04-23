import { type Category } from "../types/categories";
import { type Skill, type GroupedSkills } from "../types/skills";
import { getAllCategories, getCategoryById } from "./categories";

// Define all skills with their categories
export const skills: Skill[] = [
  // Programming Languages
  {
    id: "javascript",
    name: "JavaScript",
    level: 90,
    color: "from-yellow-500 to-amber-500",
    description: "Creating interactive and dynamic web applications",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 85,
    color: "from-blue-500 to-blue-700",
    description:
      "Enhancing code quality and developer productivity with static typing",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "java",
    name: "Java",
    level: 75,
    color: "from-red-500 to-orange-600",
    description:
      "Developing high-performance applications and backend services",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "php",
    name: "PHP",
    level: 90,
    color: "from-indigo-500 to-purple-600",
    description: "Building robust web applications and backend services",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "dart",
    name: "Dart",
    level: 80,
    color: "from-cyan-500 to-sky-600",
    description: "Creating cross-platform mobile applications with Flutter",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "go",
    name: "Golang",
    level: 70,
    color: "from-sky-400 to-blue-500",
    description: "Building efficient and scalable server applications",
    category: getCategoryById("programming") as Category,
  },
  {
    id: "python",
    name: "Python",
    level: 85,
    color: "from-blue-600 to-teal-500",
    description:
      "Utilizing for web development, data analysis, and machine learning",
    category: getCategoryById("programming") as Category,
  },

  // Frontend
  {
    id: "react",
    name: "React",
    level: 85,
    color: "from-cyan-400 to-blue-500",
    description: "Building efficient and reusable UI components",
    category: getCategoryById("frontend") as Category,
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: 80,
    color: "from-gray-700 to-gray-900",
    description:
      "Creating server-side rendered and statically generated React applications",
    category: getCategoryById("frontend") as Category,
  },
  {
    id: "tailwind",
    name: "TailwindCSS",
    level: 90,
    color: "from-cyan-500 to-blue-500",
    description: "Rapidly building custom user interfaces without leaving HTML",
    category: getCategoryById("frontend") as Category,
  },
  {
    id: "html5",
    name: "HTML5",
    level: 95,
    color: "from-red-500 to-orange-500",
    description: "Creating the structure and content of web pages",
    category: getCategoryById("frontend") as Category,
  },
  {
    id: "css3",
    name: "CSS3",
    level: 90,
    color: "from-blue-500 to-blue-700",
    description: "Styling and layout of web pages with advanced features",
    category: getCategoryById("frontend") as Category,
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    level: 85,
    color: "from-purple-600 to-indigo-700",
    description:
      "Creating responsive and consistent designs for web applications",
    category: getCategoryById("frontend") as Category,
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    level: 85,
    color: "from-green-500 to-emerald-600",
    description: "Developing fast and scalable network applications",
    category: getCategoryById("backend") as Category,
  },
  {
    id: "express",
    name: "Express.js",
    level: 80,
    color: "from-gray-600 to-gray-800",
    description:
      "Creating robust web applications and APIs with minimal overhead",
    category: getCategoryById("backend") as Category,
  },
  {
    id: "nest",
    name: "NestJS",
    level: 80,
    color: "from-red-500 to-pink-500",
    description:
      "Building scalable and maintainable backend applications with TypeScript",
    category: getCategoryById("backend") as Category,
  },
  {
    id: "laravel",
    name: "Laravel",
    level: 90,
    color: "from-red-600 to-orange-500",
    description: "Developing full-featured web applications with PHP",
    category: getCategoryById("backend") as Category,
  },
  {
    id: "django",
    name: "Django",
    level: 80,
    color: "from-green-700 to-blue-500",
    description: "Building secure and scalable web applications with Python",
    category: getCategoryById("backend") as Category,
  },
  {
    id: "restapi",
    name: "REST API",
    level: 85,
    color: "from-purple-500 to-indigo-500",
    description:
      "Designing and implementing RESTful services for seamless data exchange",
    category: getCategoryById("backend") as Category,
  },

  // Database
  {
    id: "mysql",
    name: "MySQL",
    level: 85,
    color: "from-blue-700 to-indigo-800",
    description: "Managing relational databases for structured data storage",
    category: getCategoryById("database") as Category,
  },
  {
    id: "firebase",
    name: "Firebase",
    level: 80,
    color: "from-yellow-500 to-amber-600",
    description:
      "Utilizing Google's platform for backend services and real-time databases",
    category: getCategoryById("database") as Category,
  },

  // Mobile
  {
    id: "flutter",
    name: "Flutter",
    level: 80,
    color: "from-cyan-500 to-blue-600",
    description:
      "Creating cross-platform mobile applications with a single codebase",
    category: getCategoryById("mobile") as Category,
  },

  // DevOps
  {
    id: "git",
    name: "Git",
    level: 85,
    color: "from-orange-500 to-red-600",
    description: "Managing version control and collaborative development",
    category: getCategoryById("devops") as Category,
  },
  {
    id: "docker",
    name: "Docker",
    level: 75,
    color: "from-blue-500 to-cyan-600",
    description: "Containerizing applications for consistent deployment",
    category: getCategoryById("devops") as Category,
  },
];

// Utility function to get a skill by its ID
export const getSkillById = (id: string): Skill | undefined => {
  return skills.find((skill) => skill.id === id);
};

// Get complete skill objects with their category
export const getSkillsWithCategories = (): Skill[] => {
  return skills;
};

// Utility function to get skills by category
export const getSkillsByCategory = (categoryId: string): Skill[] => {
  return skills.filter((skill) => skill.category.id === categoryId);
};

// Get top skills (highest level)
export const getTopSkills = (count: number = 10): Skill[] => {
  return [...skills].sort((a, b) => b.level - a.level).slice(0, count);
};

// Group skills by their categories
export const getSkillsGroupedByCategory = (): GroupedSkills => {
  const categories = getAllCategories();
  const result: GroupedSkills = {};

  categories.forEach((category) => {
    const categorySkills = skills.filter(
      (skill) => skill.category.id === category.id
    );

    if (categorySkills.length > 0) {
      result[category.id] = {
        category,
        skills: categorySkills,
      };
    }
  });

  return result;
};

// Get featured skills
export const getFeaturedSkills = (): Skill[] => {
  return skills.filter((skill) => skill.featured);
};

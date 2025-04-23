import { Category } from "../types/categories";
import {
  Layers,
  Server,
  Code,
  Smartphone,
  Database,
  GitBranch,
  Cloud,
  Terminal,
  Palette,
  Wrench,
} from "lucide-react";

// Main development categories
export const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Creating responsive, interactive user interfaces and client-side applications using modern web technologies.",
    icon: Layers,
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "Building server-side logic, APIs, and databases that power web applications and services.",
    icon: Server,
  },
  {
    id: "fullstack",
    title: "Fullstack",
    description:
      "Combining frontend and backend expertise to develop complete web applications from end to end.",
    icon: Code,
  },
  {
    id: "mobile",
    title: "Mobile",
    description:
      "Creating native and cross-platform applications for iOS, Android, and other mobile platforms.",
    icon: Smartphone,
  },
  {
    id: "database",
    title: "Database",
    description:
      "Designing, implementing, and optimizing database systems for efficient data storage and retrieval.",
    icon: Database,
  },
  {
    id: "devops",
    title: "DevOps",
    description:
      "Implementing practices and tools that automate and integrate the processes between software development and IT operations.",
    icon: GitBranch,
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    description:
      "Leveraging cloud platforms and services for scalable, reliable infrastructure and application deployment.",
    icon: Cloud,
  },
  {
    id: "programming",
    title: "Programming Languages",
    description:
      "Core programming languages used across various development domains and applications.",
    icon: Terminal,
  },
  {
    id: "ui",
    title: "UI/UX Design",
    description:
      "Creating intuitive user interfaces and enhancing user experience through thoughtful design principles.",
    icon: Palette,
  },
  {
    id: "tools",
    title: "Development Tools",
    description:
      "Essential software and utilities that enhance productivity and streamline the development workflow.",
    icon: Wrench,
  },
];

// Get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

// Get all categories
export const getAllCategories = (): Category[] => {
  return categories;
};

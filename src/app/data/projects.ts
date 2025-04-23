import { Project } from "../types/projects";
import { getCategoryById } from "./categories";
import { getSkillById } from "./skills";

export const projects: Project[] = [
  {
    id: "home-furni-place",
    title: "HomeFurniPlace",
    description:
      "A modern e-commerce platform specializing in furniture and home decor with responsive design, user accounts, product filtering, wishlist functionality, and seamless checkout experience.",
    image: "/images/projects/home-furni-place.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Bimo/HomeFurniPlace",
    live: "https://homefurniplace.demo.com",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("php")!,
      getSkillById("javascript")!,
      getSkillById("tailwind")!,
    ],
  },

  {
    id: "edu-high",
    title: "EduHigh Learning Platform",
    description:
      "An educational platform for high school students featuring interactive lessons, progress tracking, quizzes, and a teacher dashboard for student performance analytics.",
    image: "/images/projects/edu-high.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Bimo/EduHigh",
    live: "https://eduhigh.edu",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("javascript")!,
      getSkillById("tailwind")!,
      getSkillById("html5")!,
    ],
  },

  {
    id: "one-dashboard",
    title: "ONE Analytics Dashboard",
    description:
      "A comprehensive admin dashboard with real-time analytics, data visualization, user management, and reporting tools for business metrics and KPIs.",
    image: "/images/projects/one-dashboard.jpg",
    category: getCategoryById("frontend")!,
    github: "https://github.com/Bimo/ONE-Dashboard",
    live: "https://one-analytics.demo.com",
    skills: [
      getSkillById("react")!,
      getSkillById("typescript")!,
      getSkillById("tailwind")!,
    ],
  },

  {
    id: "weather-now",
    title: "WeatherNow App",
    description:
      "A weather application providing real-time forecasts, location-based weather data, interactive maps, and severe weather alerts with a clean, intuitive interface.",
    image: "/images/projects/weather-now.jpg",
    category: getCategoryById("frontend")!,
    github: "https://github.com/Bimo/WeatherNow",
    live: "https://weather-now.app",
    skills: [
      getSkillById("react")!,
      getSkillById("javascript")!,
      getSkillById("css3")!,
    ],
  },

  {
    id: "task-tracker-api",
    title: "Task Tracker API",
    description:
      "A RESTful API service for task management applications with authentication, task CRUD operations, user permissions, and data validation.",
    image: "/images/projects/task-tracker-api.jpg",
    category: getCategoryById("backend")!,
    github: "https://github.com/Bimo/TaskTrackerAPI",
    skills: [getSkillById("nodejs")!, getSkillById("express")!],
  },

  {
    id: "inventory-system",
    title: "Inventory Management System",
    description:
      "A comprehensive inventory management solution with barcode scanning, stock alerts, supplier management, and reporting capabilities for small businesses.",
    image: "/images/projects/inventory-system.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Bimo/InventorySystem",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("bootstrap")!,
    ],
  },

  {
    id: "fit-track-mobile",
    title: "FitTrack Mobile App",
    description:
      "A fitness tracking mobile application with workout plans, progress tracking, nutritional guidance, and social sharing features for fitness enthusiasts.",
    image: "/images/projects/fit-track.jpg",
    category: getCategoryById("mobile")!,
    github: "https://github.com/Bimo/FitTrack",
    live: "https://fittrack.app",
    skills: [getSkillById("javascript")!, getSkillById("firebase")!],
  },

  {
    id: "blog-cms",
    title: "Modern Blog CMS",
    description:
      "A content management system for blogs with markdown support, image optimization, SEO tools, and a customizable theming system.",
    image: "/images/projects/blog-cms.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Bimo/BlogCMS",
    skills: [
      getSkillById("nodejs")!,
      getSkillById("react")!,
      getSkillById("tailwind")!,
    ],
  },

  {
    id: "virtual-classroom",
    title: "Virtual Classroom",
    description:
      "An online learning platform with video conferencing, screen sharing, interactive whiteboard, and document collaboration for remote education.",
    image: "/images/projects/virtual-classroom.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Bimo/VirtualClassroom",
    live: "https://virtual-classroom.edu",
    skills: [getSkillById("react")!, getSkillById("nodejs")!],
  },

  {
    id: "recipe-finder",
    title: "Recipe Finder",
    description:
      "A web application for discovering recipes based on available ingredients, dietary restrictions, and nutritional preferences with a user-friendly interface.",
    image: "/images/projects/recipe-finder.jpg",
    category: getCategoryById("frontend")!,
    github: "https://github.com/Bimo/RecipeFinder",
    live: "https://recipe-finder.app",
    skills: [getSkillById("react")!, getSkillById("css3")!],
  },
  {
    id: "portfolio-generator",
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create professional portfolios by importing projects from GitHub and customizing the appearance with themes and templates.",
    image: "/images/projects/portfolio-generator.jpg",
    category: getCategoryById("frontend")!,
    github: "https://github.com/Bimo/PortfolioGenerator",
    live: "https://portfolio-generator.dev",
    skills: [getSkillById("react")!, getSkillById("tailwind")!],
  },
];

// Helper functions to work with projects
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getProjectsByCategory = (categoryId: string): Project[] => {
  return projects.filter((project) => project.category.id === categoryId);
};

export const getProjectsBySkill = (skillId: string): Project[] => {
  return projects.filter((project) =>
    project.skills?.some((skill) => skill.id === skillId)
  );
};

export const getAllProjects = (): Project[] => {
  return projects;
};

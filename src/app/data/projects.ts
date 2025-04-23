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
    github: "https://github.com/Biyuraaa/HomeFurniPlace",
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
    description: "",
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
    id: "classify",
    title: "Classify",
    description:
      "A comprehensive admin dashboard with real-time analytics, data visualization, user management, and reporting tools for business metrics and KPIs.",
    image: "/images/projects/one-dashboard.jpg",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/Biyuraaa/classify",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("tailwind")!,
      getSkillById("javascript")!,
    ],
  },

  {
    id: "eco-q",
    title: "EcoQ",
    description: "",
    image: "",
    category: getCategoryById("fullstack")!,
    github: "https://github.com/AgileRE-2024/EcoQ",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("tailwind")!,
      getSkillById("javascript")!,
    ],
  },
  {
    id: "desa-gunungsari",
    title: "Desa Gunungsari",
    description: "",
    image: "",
    category: getCategoryById("fullstack")!,
    live: "https://wisata.gunungsaridesa.id",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("tailwind")!,
      getSkillById("javascript")!,
    ],
  },

  {
    id: "peta-gov",
    title: "PetaGov",
    description:
      "A RESTful API service for task management applications with authentication, task CRUD operations, user permissions, and data validation.",
    image: "",
    category: getCategoryById("frontend")!,
    github: "https://github.com/eisenblume7/peta-gov",
    skills: [
      getSkillById("typescript")!,
      getSkillById("nextjs")!,
      getSkillById("tailwind")!,
    ],
  },
  {
    id: "isac-2024",
    title: "ISAC 2024",
    description: "",
    image: "",
    category: getCategoryById("backend")!,
    live: "https://isac.himsiunair.com/",
    skills: [
      getSkillById("laravel")!,
      getSkillById("mysql")!,
      getSkillById("tailwind")!,
    ],
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

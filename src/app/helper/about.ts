import React from "react";
import { Skill } from "../types/skills";

/**
 * A comprehensive set of helper functions for styling and displaying skills
 * with proper TypeScript typing and improved organization
 */

// Color theme definitions to maintain consistency
type CategoryThemeColors = {
  primary: string;
  secondary: string;
  text: string;
  border: string;
  background: string;
};

// Define a consistent color palette for each category
const CATEGORY_THEMES: Record<string, CategoryThemeColors> = {
  frontend: {
    primary: "blue-500",
    secondary: "indigo-500",
    text: "blue-200",
    border: "blue-500/50",
    background: "blue-500/5",
  },
  backend: {
    primary: "green-500",
    secondary: "emerald-500",
    text: "green-200",
    border: "green-500/50",
    background: "green-500/5",
  },
  programming: {
    primary: "purple-500",
    secondary: "violet-500",
    text: "purple-200",
    border: "purple-500/50",
    background: "purple-500/5",
  },
  database: {
    primary: "amber-500",
    secondary: "yellow-500",
    text: "amber-200",
    border: "amber-500/50",
    background: "amber-500/5",
  },
  devops: {
    primary: "rose-500",
    secondary: "pink-500",
    text: "rose-200",
    border: "rose-500/50",
    background: "rose-500/5",
  },
  tools: {
    primary: "cyan-500",
    secondary: "teal-500",
    text: "cyan-200",
    border: "cyan-500/50",
    background: "cyan-500/5",
  },
  cloud: {
    primary: "sky-500",
    secondary: "blue-400",
    text: "sky-200",
    border: "sky-500/50",
    background: "sky-500/5",
  },
  mobile: {
    primary: "orange-500",
    secondary: "red-500",
    text: "orange-200",
    border: "orange-500/50",
    background: "orange-500/5",
  },
};

// Default category to use when an unknown category is provided
const DEFAULT_CATEGORY = "frontend";

// Get the theme for a category, with fallback to default
const getCategoryTheme = (categoryId: string): CategoryThemeColors => {
  return CATEGORY_THEMES[categoryId] || CATEGORY_THEMES[DEFAULT_CATEGORY];
};

/**
 * Returns tailwind classes for category button styling
 */
export const getCategoryButtonStyle = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `bg-gradient-to-r from-${theme.primary}/30 to-${theme.secondary}/30 text-${theme.text} border border-${theme.border} shadow-lg shadow-${theme.primary}/10`;
};

/**
 * Returns the base color name for a category
 */
export const getCategoryColor = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return theme.primary.split("-")[0]; // Returns "blue" from "blue-500"
};

/**
 * Returns gradient classes for progress bars
 */
export const getCategoryGradient = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `bg-gradient-to-r from-${theme.primary} to-${theme.secondary}`;
};

/**
 * Returns gradient classes without the bg- prefix for custom styling
 */
export const getCategoryGradientBackground = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `from-${theme.primary} to-${theme.secondary}`;
};

/**
 * Returns styling classes for skill cards
 */
export const getSkillCardStyle = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `border-${theme.border} bg-${theme.background} text-${theme.text}`;
};

/**
 * Returns border color classes for skill cards and containers
 */
export const getBorderColor = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `border-${theme.border}`;
};

/**
 * Returns subtle background gradient for containers
 */
export const getBackgroundGradient = (categoryId: string): string => {
  const theme = getCategoryTheme(categoryId);
  return `from-${theme.primary}/10 to-${theme.secondary}/10`;
};

/**
 * Returns text and hover background classes based on skill category
 */
export const getSkillColor = (skill: Skill): string => {
  const theme = getCategoryTheme(skill.category.id);
  return `text-${theme.text} hover:bg-${theme.primary}/10`;
};

/**
 * Returns a color indicator based on skill proficiency level
 */
export const getSkillLevelColor = (level: number): string => {
  if (level >= 90) return "bg-emerald-500";
  if (level >= 80) return "bg-green-500";
  if (level >= 70) return "bg-lime-500";
  if (level >= 60) return "bg-yellow-500";
  if (level >= 50) return "bg-amber-500";
  if (level >= 40) return "bg-orange-500";
  return "bg-red-500";
};

/**
 * Returns a descriptive label for skill level
 */
export const getSkillLevelLabel = (level: number): string => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 65) return "Proficient";
  if (level >= 50) return "Intermediate";
  if (level >= 30) return "Basic";
  return "Beginner";
};


/**
 * Helper function for creating badge styles based on skill level
 */
export const getSkillBadgeStyle = (skill: Skill): string => {
  const level = skill.level;
  const theme = getCategoryTheme(skill.category.id);

  if (level >= 90)
    return `bg-emerald-500/20 text-emerald-300 border border-emerald-500/30`;
  if (level >= 80)
    return `bg-green-500/20 text-green-300 border border-green-500/30`;
  if (level >= 70)
    return `bg-${theme.primary}/20 text-${theme.text} border border-${theme.border}`;
  if (level >= 50)
    return `bg-gray-700/50 text-gray-300 border border-gray-600/50`;
  return `bg-gray-800/50 text-gray-400 border border-gray-700/50`;
};

/**
 * Helper function to get year range for experience display
 */
export const getExperienceYears = (years: number): string => {
  if (years < 1) return "< 1 year";
  if (years === 1) return "1 year";
  return `${years} years`;
};

/**
 * Helper to determine if a skill should be highlighted as featured
 */
export const isSkillFeatured = (skill: Skill): boolean => {
  return skill.level >= 85 || skill.featured === true;
};

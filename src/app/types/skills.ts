import type { Category } from "./categories";

export interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
  description: string;
  featured?: boolean;
  category: Category;
}

export interface GroupedSkills {
  [categoryId: string]: {
    category: Category;
    skills: Skill[];
  };
}

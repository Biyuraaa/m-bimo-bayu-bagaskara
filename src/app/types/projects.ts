import { Category } from "./categories";
import { Skill } from "./skills";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  github?: string;
  live?: string;
  skills?: Skill[];
}

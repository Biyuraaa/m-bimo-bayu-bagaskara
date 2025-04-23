export interface ExperienceDetail {
  id: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | "Present";
  details: ExperienceDetail[];
  type?: "work" | "volunteer" | "internship" | "education";
  skills?: string[];
  url?: string; 
  logo?: string; 
  featured?: boolean;
}

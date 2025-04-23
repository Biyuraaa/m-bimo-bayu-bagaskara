export interface Achievement {
  id: string;
  description: string;
}

export interface Education {
  isOngoing: any;
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string | "Present" | "Expected";
  gpa?: {
    score: number;
    scale: number;
  };
  description?: string;
  achievements?: Achievement[];
}

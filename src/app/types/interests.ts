export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: "technical" | "creative" | "personal" | "professional";
  priority?: number; // For sorting/highlighting
}

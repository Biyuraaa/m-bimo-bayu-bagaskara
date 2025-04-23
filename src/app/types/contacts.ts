import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

// Type for icon (supports both lucide and react-icons)
export type ContactIcon = LucideIcon | IconType;

// Type for contact method
export interface Contact {
  id: string;
  icon: ContactIcon;
  title: string;
  value: string;
  link: string;
  color: string;
  category?: "social" | "direct" | "professional"; // Optional categorization
  priority?: number; // Optional for sorting
  ariaLabel?: string; // For accessibility
}

// filepath: c:\Bimo\Project\porto\src\app\data\interests.ts
import { Interest } from "../types/interests";

export const interests: Interest[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Building modern and scalable web applications using Laravel, Next.js, and other frameworks.",
    icon: "🌐",
    category: "technical",
    priority: 1,
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description:
      "Developing cross-platform mobile applications using Flutter for seamless user experiences.",
    icon: "📱",
    category: "technical",
    priority: 2,
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description:
      "Exploring neural networks, data analysis, and AI-driven solutions for innovative applications.",
    icon: "🤖",
    category: "technical",
    priority: 3,
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description:
      "Leveraging cloud platforms like AWS and GCP for scalable and efficient application deployment.",
    icon: "☁️",
    category: "technical",
    priority: 4,
  },
];

// Additional interests that could be added
export const additionalInterests: Interest[] = [
  {
    id: "open-source",
    title: "Open Source Contribution",
    description:
      "Contributing to open-source projects and collaborating with developers worldwide.",
    icon: "🔄",
    category: "professional",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Creating intuitive user interfaces and enhancing user experiences through thoughtful design.",
    icon: "🎨",
    category: "creative",
  },
];

// Combine all interests
export const allInterests = [...interests, ...additionalInterests];

// Utility functions
export function getInterestsByCategory(
  category: Interest["category"]
): Interest[] {
  return allInterests.filter((interest) => interest.category === category);
}

export function getPrioritizedInterests(count: number = 4): Interest[] {
  return [...allInterests]
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
    .slice(0, count);
}

import { Experience } from "../types/experiences";

export const experiences: Experience[] = [
  {
    id: "isac-2024",
    title: "Expert Staff of Web Development",
    company: "ISAC 2024 (Information System Airlangga Competition)",
    startDate: "Jan 2024",
    endDate: "Nov 2024",
    type: "work",
    details: [
      {
        id: "isac-1",
        description:
          "Designed the database structure for the ISAC 2024 registration and competition system.",
      },
      {
        id: "isac-2",
        description:
          "Developed an automated registration and payment system using Midtrans.",
      },
      {
        id: "isac-3",
        description: "Implemented QR code payment with automatic validation.",
      },
      {
        id: "isac-4",
        description:
          "Built an online test and assessment system for the Olympiad and UI/UX competition.",
      },
    ],
  },
  {
    id: "gunungsari",
    title: "Full Stack Developer",
    company: "Desa Wisata Gunungsari",
    startDate: "Jun 2024",
    endDate: "Sep 2024",
    type: "work",
    details: [
      {
        id: "gunungsari-1",
        description:
          "Developed an informational website featuring the village's history, vision-mission, and tourism potential.",
      },
      {
        id: "gunungsari-2",
        description:
          "Implemented an information system for MSMEs, agriculture, and livestock management.",
      },
      {
        id: "gunungsari-3",
        description:
          "Developed a financial transparency system and government information system for the village.",
      },
    ],
  },
  {
    id: "ngimbang",
    title: "Full Stack Developer",
    company: "Desa Wisata Ngimbang",
    startDate: "Apr 2023",
    endDate: "Nov 2023",
    type: "work",
    details: [
      {
        id: "ngimbang-1",
        description:
          "Developed a village profile website with tourism and MSME information features.",
      },
      {
        id: "ngimbang-2",
        description:
          "Implemented a blog and event system to provide village activity updates.",
      },
      {
        id: "ngimbang-3",
        description:
          "Integrated an FAQ section and an attraction ticketing system.",
      },
    ],
  },
  {
    id: "volunteer-2024",
    title: "Volunteer Experience",
    company: "Various Organizations",
    startDate: "Jan 2024",
    endDate: "Present",
    type: "volunteer",
    details: [
      {
        id: "vol-1",
        description:
          "Google Developer Group on Campus 2024 (Mobile Application Mentor)",
      },
      {
        id: "vol-2",
        description:
          "Airlangga IT Community Bootcamp (Website Application Mentor)",
      },
    ],
  },
];

// Utility functions
export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences.filter((exp) => exp.type === type);
}

export function getWorkExperiences(): Experience[] {
  return getExperiencesByType("work");
}

export function getFeaturedExperiences(): Experience[] {
  return experiences.filter((exp) => exp.featured);
}

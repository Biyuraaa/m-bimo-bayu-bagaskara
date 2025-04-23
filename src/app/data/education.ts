import { Education } from "../types/education";

export const educations: Education[] = [
  {
    id: "unair",
    institution: "Airlangga University (UNAIR)",
    degree: "Bachelor's Degree",
    field: "Information Systems",
    location: "Surabaya, Indonesia",
    startDate: "Aug 2022",
    endDate: "Jun 2026 (Expected)",
    gpa: {
      score: 3.52,
      scale: 4.0,
    },
    isOngoing: true,
    description: "Information Systems Undergraduate Student",
    achievements: [
      {
        id: "unair-1",
        description:
          "Designed and developed full-stack websites using Laravel or Next.js",
      },
      {
        id: "unair-2",
        description: "Developed mobile applications using Flutter",
      },
    ],
  },
  {
    id: "sman5",
    institution: "SMAN 5 Surabaya",
    degree: "High School Diploma",
    field: "Science Program",
    location: "Surabaya, Indonesia",
    startDate: "Jul 2019",
    endDate: "May 2021",
    description: "Science Program",
    isOngoing: false,
    achievements: [
      {
        id: "sman5-1",
        description: "Gold Medal in Taekwondo at KONI CUP 2021",
      },
    ],
  },
  {
    id: "smpn3",
    institution: "SMPN 3 Surabaya",
    degree: "Junior High School",
    location: "Surabaya, Indonesia",
    startDate: "Jun 2017",
    endDate: "Jun 2019",
    isOngoing: false,
    description: "Junior High School Education",
  },
];

export const getEducationById = (id: string): Education | undefined => {
  return educations.find((edu) => edu.id === id);
};

export const getCurrentEducation = (): Education | undefined => {
  return educations.find(
    (edu) => edu.endDate === "Present" || edu.endDate.includes("Expected")
  );
};

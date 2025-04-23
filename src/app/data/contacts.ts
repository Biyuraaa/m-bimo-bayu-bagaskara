import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaLine } from "react-icons/fa";
import { Contact } from "../types/contacts";

export const contacts: Contact[] = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    value: "biyuraaa@gmail.com",
    link: "mailto:biyuraaa@gmail.com",
    color: "from-blue-400 to-cyan-400",
    category: "direct",
    priority: 1,
    ariaLabel: "Send email to Bimo",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone",
    value: "+62 821-4047-7030",
    link: "tel:+6282140477030",
    color: "from-green-400 to-emerald-400",
    category: "direct",
    priority: 2,
    ariaLabel: "Call Bimo",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+62 821-4047-7030",
    link: "https://wa.me/6282140477030",
    color: "from-green-500 to-green-600",
    category: "direct",
    priority: 3,
    ariaLabel: "Chat on WhatsApp",
  },
  {
    id: "telegram",
    icon: FaTelegram,
    title: "Telegram",
    value: "@mbimobayub",
    link: "https://t.me/6282140477030",
    color: "from-blue-500 to-blue-600",
    category: "direct",
    priority: 4,
    ariaLabel: "Message on Telegram",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    title: "LinkedIn",
    value: "M Bimo Bayu Bagaskara",
    link: "https://www.linkedin.com/in/m-bimo-bayu-bagaskara-ab313424b/",
    color: "from-blue-600 to-blue-700",
    category: "professional",
    priority: 1,
    ariaLabel: "Connect on LinkedIn",
  },
  {
    id: "instagram",
    icon: Instagram,
    title: "Instagram",
    value: "@mbimobayub",
    link: "https://instagram.com/mbimobayub",
    color: "from-pink-500 to-purple-500",
    category: "social",
    priority: 1,
    ariaLabel: "Follow on Instagram",
  },
  {
    id: "line",
    icon: FaLine,
    title: "LINE",
    value: "@biyuraaa",
    link: "https://line.me/ti/p/Pk68NSG73u",
    color: "from-green-400 to-green-500",
    category: "direct",
    priority: 5,
    ariaLabel: "Chat on LINE",
  },
  {
    id: "github",
    icon: Github,
    title: "GitHub",
    value: "Biyuraaa",
    link: "https://github.com/Biyuraaa",
    color: "from-gray-600 to-gray-700",
    category: "professional",
    priority: 2,
    ariaLabel: "View GitHub profile",
  },
];

// Helper functions for filtering contacts
export const getContactsByCategory = (category: string): Contact[] => {
  return contacts
    .filter((contact) => contact.category === category)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));
};

export const getPrimaryContacts = (limit?: number): Contact[] => {
  const sorted = [...contacts].sort(
    (a, b) => (a.priority || 99) - (b.priority || 99)
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

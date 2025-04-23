"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/90 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-bold text-white">
                {" "}
                M Bimo<span className="text-blue-500"> Bayu</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              A passionate Full Stack Developer specializing in creating
              elegant, performant, and user-friendly applications.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink
                href="https://github.com/Bimo"
                icon={<Github size={18} />}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com/in/bimo-bayu"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://twitter.com/bimo_bayu"
                icon={<Twitter size={18} />}
                label="Twitter"
              />
              <SocialLink
                href="mailto:contact@bimobayubagaskara.com"
                icon={<Mail size={18} />}
                label="Email"
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#hero" label="Home" />
              <FooterLink href="#about" label="About" />
              <FooterLink href="#skills" label="Skills" />
              <FooterLink href="#projects" label="Projects" />
              <FooterLink href="#contact" label="Contact" />
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a
                  href="mailto:contact@bimobayubagaskara.com"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-blue-500" />
                  <span>contact@bimobayubagaskara.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 items-center text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Surabaya, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} M Bimo Bayu Bagaskara. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              Back to top
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:-translate-y-1 transition-transform"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group text-sm"
    >
      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors"></span>
      {label}
    </Link>
  </li>
);

export default Footer;

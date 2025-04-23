"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  Menu,
  X,
  Briefcase,
  School,
  Lightbulb,
  User,
  Star,
  ArrowUpRight,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  CheckCircle,
  GraduationCap,
  Download,
  Sparkles,
  Award,
  Heart,
  Code,
} from "lucide-react";
import {
  getSkillsByCategory,
  getSkillsWithCategories,
  getTopSkills,
  skills,
} from "../data/skills";
import { getAllCategories } from "../data/categories";
import { Skill } from "../types/skills";
import {
  getCategoryColor,
  getCategoryGradient,
  getBorderColor,
} from "../helper/about";
import { experiences } from "../data/experiences";
import { educations } from "../data/education";
import { additionalInterests, interests } from "../data/interests";
import AboutContent from "./AboutContent";
import ExperienceContent from "./ExperienceContent";
import EducationContent from "./EducationContent";
import InterestContent from "./InterestContent";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Animated background effect
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesArray: {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
  }[] = [];
  const particleCount = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas && containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        initParticles();
      }
    };

    // Initialize particles
    const initParticles = () => {
      particlesArray.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.3;
        const speedY = (Math.random() - 0.5) * 0.3;
        const opacity = Math.random() * 0.5 + 0.2;

        // Alternate between blue and purple particles
        const color = Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6";

        particlesArray.push({
          x,
          y,
          size,
          speedX,
          speedY,
          opacity,
          color,
        });
      }
    };

    // Animate particles
    const animateParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      const gridSize = window.innerWidth < 768 ? 25 : 40;
      const dotSize = window.innerWidth < 768 ? 0.8 : 1;

      ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Connect particles with lines
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particlesArray.length; i++) {
        const p1 = particlesArray[i];

        for (let j = i + 1; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particlesArray.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const tabContent = {
    about: <AboutContent />,
    experience: <ExperienceContent />,
    education: <EducationContent />,
    interests: <InterestContent />,
  };

  const tabs = [
    {
      id: "about",
      label: "About",
      icon: User,
      mobileIcon: User,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      mobileIcon: Briefcase,
      color: "from-purple-500 to-blue-500",
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      mobileIcon: GraduationCap,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "interests",
      label: "Interests",
      icon: Lightbulb,
      mobileIcon: Lightbulb,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab);

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-full h-40 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0  w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0  w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-400 font-medium text-sm tracking-wider mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>DISCOVER MY STORY</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-cyan-blue">About Me</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              A passionate developer with a creative mindset and a determination
              to deliver exceptional digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image Section */}
            <motion.div
              variants={itemVariants}
              className="relative group mx-auto lg:mx-0 max-w-md lg:max-w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated background glow effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-50 blur-lg transition-all duration-1000 animate-pulse-slow group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl opacity-0 blur-lg transition-opacity duration-1000 group-hover:opacity-60"></div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl-lg z-20 transition-all duration-300 group-hover:scale-125 group-hover:border-cyan-400"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-purple-400 rounded-br-lg z-20 transition-all duration-300 group-hover:scale-125 group-hover:border-fuchsia-400"></div>

              {/* Main card container */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl glass-effect-dark p-3 transition-all duration-500 group-hover:shadow-blue-900/30 group-hover:shadow-2xl">
                {/* Image hover overlay */}
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 transition-opacity duration-300 z-10 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                <div className="relative rounded-lg overflow-hidden">
                  {/* Animated photo frame */}
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      boxShadow: isHovered
                        ? "inset 0px 0px 0px 3px rgba(59, 130, 246, 0.3)"
                        : "inset 0px 0px 0px 0px rgba(59, 130, 246, 0)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src="/images/foto_bimo.png"
                      alt="About Me"
                      width={600}
                      height={600}
                      priority
                      className={`object-cover transition-transform duration-700 w-full ${
                        isHovered ? "scale-105" : "scale-100"
                      }`}
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/10"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 space-y-4">
                    {/* Name & title card */}
                    <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/20 transform translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Bimo
                      </h3>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center transform translate-y-1 transition-all duration-500 group-hover:translate-y-0">
                      {["Frontend", "Backend", "Fullstack", "Mobile"].map(
                        (specialty, index) => (
                          <motion.span
                            key={specialty}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 glass-effect-dark rounded-full text-xs md:text-sm font-medium text-blue-300 border border-blue-500/20 hover:border-blue-400/40 hover:text-blue-200 transition-colors"
                          >
                            {specialty}
                          </motion.span>
                        )
                      )}
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center gap-3 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {[
                        { icon: "github", label: "GitHub" },
                        { icon: "linkedin", label: "LinkedIn" },
                        { icon: "twitter", label: "Twitter" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href="#"
                          aria-label={social.label}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/70 text-blue-300 hover:text-white hover:bg-blue-600/70 transition-colors"
                        >
                          <i className={`fab fa-${social.icon} text-sm`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative particles */}
              <div className="absolute -bottom-8 -right-8 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-blue-400 animate-ping"></div>
                <div className="absolute top-1/4 left-3/4 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping animation-delay-300"></div>
                <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-cyan-400 animate-ping animation-delay-700"></div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 md:space-y-8"
            >
              {/* Mobile Tab Navigation */}
              <div className="lg:hidden relative z-20">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center justify-between w-full glass-effect-dark rounded-xl p-4 text-white hover:border-blue-500/30 transition-all duration-300"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle mobile menu"
                >
                  <div className="flex items-center gap-3">
                    {activeTabInfo?.mobileIcon && (
                      <activeTabInfo.mobileIcon
                        className="w-5 h-5 text-blue-400"
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-medium">
                      {activeTabInfo?.label || "Menu"}
                    </span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? (
                      <X className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    ) : (
                      <ChevronDown
                        className="w-5 h-5 text-blue-400"
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 glass-effect-dark rounded-xl overflow-hidden shadow-xl z-30"
                    >
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`
                            flex items-center gap-3 w-full px-5 py-4 transition-all duration-300
                            ${
                              activeTab === tab.id
                                ? `bg-gradient-to-r ${tab.color} bg-opacity-20 text-white`
                                : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                            }
                          `}
                        >
                          <tab.mobileIcon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Tab Navigation */}
              <div className="hidden lg:flex justify-between mb-8 glass-effect-dark rounded-full p-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                      ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                      }
                    `}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="glass-effect-dark rounded-2xl p-6 md:p-8 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px] md:min-h-[450px] overflow-y-auto max-h-[60vh] md:max-h-[500px] pr-2 custom-scrollbar"
                  >
                    {tabContent[activeTab as keyof typeof tabContent]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "LinkedIn", url: "#" },
                  { label: "GitHub", url: "#" },
                  { label: "Twitter", url: "#" },
                  { label: "Portfolio", url: "#" },
                ].map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    variants={itemVariants}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 glass-effect-dark rounded-full text-sm text-blue-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

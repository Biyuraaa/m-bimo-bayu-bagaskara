"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Layout,
  Server,
  ExternalLink,
  Code,
  Terminal,
  ChevronDown,
  Database,
  Smartphone,
  GitBranch,
  Star,
  Zap,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getSkillsGroupedByCategory } from "../data/skills";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Get skills data grouped by category
  const skillsGroupedByCategory = getSkillsGroupedByCategory();
  const categoryEntries = Object.entries(skillsGroupedByCategory);

  // Particles effect for background
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const particlesArray: {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }[] = [];
  const particleCount = 70; // Increased particle count

  useEffect(() => {
    const canvas = particlesRef.current;
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
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Slightly larger particles
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    // Animate particles
    const animateParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect particles with lines
      ctx.lineWidth = 0.3;

      for (let i = 0; i < particlesArray.length; i++) {
        const p1 = particlesArray[i];

        for (let j = i + 1; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < 120) {
            // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${
              0.12 * (1 - distance / 120)
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
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${p.opacity})`); // Purple
        gradient.addColorStop(1, `rgba(59, 130, 246, ${p.opacity * 0.5})`); // Blue

        ctx.fillStyle = gradient;
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

  // Map category IDs to icons
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: Record<string, React.ElementType> = {
      programming: Terminal,
      frontend: Layout,
      backend: Server,
      database: Database,
      mobile: Smartphone,
      devops: GitBranch,
    };
    return iconMap[categoryId] || Code;
  };

  // Prepare formatted categories with proper descriptions
  const formatCategoryDescription = (categoryId: string): string => {
    const descriptions: Record<string, string> = {
      programming:
        "Writing efficient and maintainable code across multiple paradigms.",
      frontend:
        "Crafting responsive and interactive user interfaces with modern web technologies.",
      backend:
        "Building scalable and efficient server-side applications and APIs.",
      database: "Managing and optimizing data storage and retrieval systems.",
      mobile:
        "Developing cross-platform mobile applications for various devices.",
      devops:
        "Implementing development operations practices for efficient software delivery.",
    };
    return descriptions[categoryId] || "";
  };

  // Prepare skill category data using our data format
  const skillCategories = categoryEntries.map(
    ([categoryId, { category, skills }]) => {
      return {
        id: categoryId,
        title: category.title,
        icon: getCategoryIcon(categoryId),
        description: formatCategoryDescription(categoryId),
        skills: skills.map((skill) => ({
          ...skill,
          // Sample projects for each skill
          projects: ["Sample Project 1", "Sample Project 2"],
        })),
      };
    }
  );

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

  // Get skill level classification
  const getSkillLevelText = (level: number) => {
    if (level >= 90)
      return {
        text: "Expert",
        icon: Award,
        color: "text-amber-300",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        gradient: "from-amber-400 to-amber-600",
      };
    if (level >= 75)
      return {
        text: "Advanced",
        icon: Star,
        color: "text-blue-300",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        gradient: "from-blue-400 to-blue-600",
      };
    if (level >= 60)
      return {
        text: "Proficient",
        icon: Zap,
        color: "text-teal-300",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/20",
        gradient: "from-teal-400 to-teal-600",
      };
    return {
      text: "Intermediate",
      icon: Code,
      color: "text-purple-300",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      gradient: "from-purple-400 to-purple-600",
    };
  };

  return (
    <section
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background with particles */}
      <div className="absolute inset-0">
        <canvas ref={particlesRef} className="w-full h-full" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-400 font-medium text-sm tracking-wider mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>TECH STACK & EXPERTISE</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                Professional Skills
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              A comprehensive showcase of my technical capabilities and
              expertise, refined through years of practical experience and
              continuous learning in the ever-evolving tech landscape.
            </p>
          </motion.div>

          {/* Category Selector - Mobile */}
          <motion.div variants={itemVariants} className="md:hidden mb-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl text-white border border-blue-500/20 shadow-lg shadow-blue-900/10"
            >
              <div className="flex items-center gap-3">
                {React.createElement(skillCategories[activeCategory].icon, {
                  className: "w-5 h-5 text-blue-400",
                })}
                <span className="font-medium">
                  {skillCategories[activeCategory]?.title || "Select Category"}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-blue-400 transition-transform ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/30 shadow-xl"
                >
                  {skillCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(index);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm font-medium
                        ${
                          activeCategory === index
                            ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-500"
                            : "text-gray-300 hover:bg-slate-700/30 hover:text-blue-300"
                        }
                      `}
                    >
                      {React.createElement(category.icon, {
                        className: `w-5 h-5 ${
                          activeCategory === index
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`,
                      })}
                      {category.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Category Selector - Desktop */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-wrap justify-center gap-3 mb-16"
          >
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`
                  flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium 
                  transition-all duration-300 group
                  ${
                    activeCategory === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-800/50 backdrop-blur-sm text-gray-300 hover:bg-slate-700/70 hover:text-white border border-slate-700/50 hover:border-blue-500/30"
                  }
                `}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ y: 0 }}
              >
                {React.createElement(category.icon, {
                  className: `w-5 h-5 ${
                    activeCategory === index
                      ? "text-white"
                      : "text-blue-400 group-hover:text-white"
                  }`,
                })}
                {category.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Category Details */}
          <AnimatePresence mode="wait">
            {skillCategories[activeCategory] && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-slate-700/30 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 md:mb-12">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-5 w-20 h-20 flex items-center justify-center shadow-lg shadow-blue-900/10 border border-blue-500/20">
                    {React.createElement(skillCategories[activeCategory].icon, {
                      className: "w-10 h-10 text-blue-400",
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      {skillCategories[activeCategory].title}
                    </h3>
                    <p className="text-gray-300 mt-2 text-base md:text-lg max-w-3xl">
                      {skillCategories[activeCategory].description}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {skillCategories[activeCategory].skills.map(
                    (skill, index) => {
                      const levelInfo = getSkillLevelText(skill.level);
                      const isHovered = hoveredSkill === skill.id;

                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                          }}
                          whileHover={{
                            y: -5,
                            transition: { duration: 0.2 },
                          }}
                          onHoverStart={() => setHoveredSkill(skill.id)}
                          onHoverEnd={() => setHoveredSkill(null)}
                          className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-blue-900/30 border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
                        >
                          {/* Animated glow effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-xl" />
                          </div>

                          {/* Skill progress bar at top with animated value */}
                          <div className="h-2 bg-slate-700/50 w-full relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeOut",
                              }}
                              className={`h-full bg-gradient-to-r ${levelInfo.gradient} relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                            </motion.div>
                          </div>

                          <div className="p-6 relative z-10">
                            {/* Main skill header */}
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                              <div
                                className={`flex items-center gap-1.5 ${levelInfo.bgColor} px-2.5 py-1 rounded-full ${levelInfo.borderColor} border`}
                              >
                                {React.createElement(levelInfo.icon, {
                                  className: `w-4 h-4 ${levelInfo.color}`,
                                })}
                                <span
                                  className={`text-sm font-medium ${levelInfo.color}`}
                                >
                                  {levelInfo.text}
                                </span>
                              </div>
                            </div>

                            {/* Skill description */}
                            <p className="text-gray-300 text-sm mb-5 min-h-[60px] leading-relaxed">
                              {skill.description}
                            </p>

                            {/* Key features */}
                            <div className="mb-5">
                              <div className="flex flex-wrap gap-2">
                                {["Experienced", "Efficient", "Updated"].map(
                                  (tag, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-1 text-xs bg-blue-900/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20"
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      {tag}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Bottom section with percentage and action button */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3">
                                {/* Animated circular progress indicator */}
                                <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
                                  <svg
                                    className="absolute inset-0 w-full h-full -rotate-90"
                                    viewBox="0 0 36 36"
                                  >
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="15"
                                      fill="none"
                                      className="stroke-slate-700/30"
                                      strokeWidth="3"
                                    />
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="15"
                                      fill="none"
                                      className={`stroke-current text-gradient-to-r ${levelInfo.gradient}`}
                                      strokeWidth="3"
                                      strokeDasharray={`${15 * 2 * Math.PI}`}
                                      strokeDashoffset={`${
                                        15 *
                                        2 *
                                        Math.PI *
                                        (1 - skill.level / 100)
                                      }`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                                    {skill.level}%
                                  </div>
                                </div>

                                {/* Improved horizontal progress bar */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="w-36 bg-slate-700/50 h-3 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full bg-gradient-to-r ${levelInfo.gradient} relative`}
                                      style={{ width: `${skill.level}%` }}
                                    >
                                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-300 mb-8">
              <Zap className="w-5 h-5" />
              <span className="font-medium">
                Always learning and expanding my expertise
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

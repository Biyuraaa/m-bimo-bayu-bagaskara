"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github,
  ExternalLink,
  ChevronRight,
  Search,
  ChevronDown,
  Code,
  Sparkles,
  ArrowRight,
  Filter,
  X,
  Eye,
} from "lucide-react";
import { categories } from "../data/categories";
import type { Skill } from "../types/skills";
import type { Project } from "../types/projects";
import { projects } from "../data/projects";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Animated background effect
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get unique categories from projects
  const projectCategories = [
    "All",
    ...new Set(projects.map((project) => project.category.title)),
  ];

  // Filter categories that are used in projects
  const availableCategories = categories.filter(
    (category) =>
      category.title === "All" || projectCategories.includes(category.title)
  );

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas && containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create circuit board pattern with nodes and connections
    const drawCircuitBoard = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adjust grid size based on screen width
      const gridSize =
        window.innerWidth < 480 ? 25 : window.innerWidth < 768 ? 30 : 50;
      const nodeSize =
        window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 1.5 : 2;
      const lineWidth =
        window.innerWidth < 480 ? 0.3 : window.innerWidth < 768 ? 0.5 : 1;
      const nodeDensity = window.innerWidth < 480 ? 0.8 : 0.7; // Higher number = fewer nodes on mobile

      // Create nodes
      const nodes: { x: number; y: number; connections: number[] }[] = [];
      let nodeIndex = 0;

      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          if (Math.random() > nodeDensity) {
            nodes.push({ x, y, connections: [] });
            nodeIndex++;
          }
        }
      }

      // Draw connections between nodes
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = lineWidth;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const targetNode = nodes[j];
            const dx = Math.abs(node.x - targetNode.x);
            const dy = Math.abs(node.y - targetNode.y);

            // Only connect to nearby nodes, with different distances based on screen size
            const maxDistance =
              window.innerWidth < 480 ? gridSize * 1.5 : gridSize * 2;
            if (dx <= maxDistance && dy <= maxDistance && Math.random() > 0.7) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(targetNode.x, targetNode.y);
              ctx.stroke();

              node.connections.push(j);
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        // Nodes with connections are brighter
        const alpha = node.connections.length > 0 ? 0.3 : 0.15;
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          nodeSize * 2
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    drawCircuitBoard();
    window.addEventListener("resize", drawCircuitBoard);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", drawCircuitBoard);
    };
  }, []);

  const filteredProjects = projects
    .filter(
      (project) =>
        selectedCategory === "All" ||
        project.category.title === selectedCategory
    )
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills?.some((skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
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

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative elements - adjusted for mobile */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-40 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="absolute inset-0 opacity-30">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header - Responsive text sizes */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 sm:mb-14 md:mb-20"
          >
            <div className="inline-block px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-400 font-medium text-xs sm:text-sm tracking-wider mb-3 sm:mb-5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>PORTFOLIO SHOWCASE</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="gradient-text-cyan-blue">Featured Projects</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-1">
              A curated collection of projects that demonstrate my technical
              skills, creativity, and innovative solutions to real-world
              problems.
            </p>
          </motion.div>

          {/* Search and Filter - Mobile optimized */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-14 md:mb-16"
          >
            <div className="glass-effect-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                {/* Search Input - Full width on mobile */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800/70 border border-slate-700/50 rounded-lg sm:rounded-xl py-2.5 sm:py-3 px-4 pl-10 sm:pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm sm:text-base"
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filters - Mobile */}
                <div className="md:hidden w-full">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/70 rounded-lg text-white border border-slate-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{selectedCategory}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-400 transition-transform ${
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
                        className="mt-2 glass-effect-dark rounded-xl overflow-hidden"
                      >
                        <button
                          key="all-category"
                          onClick={() => {
                            setSelectedCategory("All");
                            setMobileMenuOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-2 px-4 py-3 text-left text-sm
                            ${
                              selectedCategory === "All"
                                ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-500"
                                : "text-gray-300 hover:bg-slate-700/50 hover:text-blue-300"
                            }
                          `}
                        >
                          <ChevronRight className="w-4 h-4" />
                          All
                        </button>

                        {categories
                          .filter((category) =>
                            projectCategories.includes(category.title)
                          )
                          .map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.title);
                                setMobileMenuOpen(false);
                              }}
                              className={`
                                w-full flex items-center gap-2 px-4 py-3 text-left text-sm
                                ${
                                  selectedCategory === category.title
                                    ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-500"
                                    : "text-gray-300 hover:bg-slate-700/50 hover:text-blue-300"
                                }
                              `}
                            >
                              <category.icon className="w-4 h-4" />
                              {category.title}
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category Filters - Desktop */}
                <div className="hidden md:flex flex-wrap justify-center gap-3">
                  <motion.button
                    key="all-category"
                    onClick={() => setSelectedCategory("All")}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium 
                      transition-all duration-300 group
                      ${
                        selectedCategory === "All"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                          : "glass-effect-dark text-gray-300 hover:text-white hover:border-blue-500/30"
                      }
                    `}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 ${
                        selectedCategory === "All"
                          ? "text-white"
                          : "text-blue-400 group-hover:text-white"
                      }`}
                    />
                    All
                  </motion.button>

                  {categories
                    .filter((category) =>
                      projectCategories.includes(category.title)
                    )
                    .map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.title)}
                        className={`
                          flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium 
                          transition-all duration-300 group
                          ${
                            selectedCategory === category.title
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                              : "glass-effect-dark text-gray-300 hover:text-white hover:border-blue-500/30"
                          }
                        `}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <category.icon
                          className={`w-4 h-4 ${
                            selectedCategory === category.title
                              ? "text-white"
                              : "text-blue-400 group-hover:text-white"
                          }`}
                        />
                        {category.title}
                      </motion.button>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid - Responsive grid with different columns */}
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10"
            >
              {filteredProjects.map((project: Project, index: number) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="glass-effect-dark rounded-xl sm:rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:shadow-blue-900/20"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image - Adjusted height for mobile */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90"></div>

                    {/* Category Badge - Smaller on mobile */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 glass-effect-dark px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium text-blue-300 border-blue-500/20">
                      {project.category.title}
                    </div>
                  </div>

                  {/* Project Links Overlay - Smaller on mobile */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2 z-10">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 glass-effect-dark rounded-full hover:bg-blue-500/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 glass-effect-dark rounded-full hover:bg-purple-500/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.a>
                    )}
                  </div>

                  {/* Project Info - Adjusted padding and text sizes */}
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-blue-purple mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base line-clamp-3">
                      {project.description}
                    </p>

                    {/* Skills section - Consistent rendering between server and client */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {project.skills &&
                        project.skills
                          .slice(
                            0,
                            isClient ? (window.innerWidth < 640 ? 3 : 4) : 0
                          )
                          .map((skill: Skill) => (
                            <span
                              key={skill.id}
                              className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-900/20 rounded-full text-xs text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                            >
                              {skill.name}
                            </span>
                          ))}
                      {isClient &&
                        project.skills &&
                        project.skills.length >
                          (window.innerWidth < 640 ? 3 : 4) && (
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-800/50 rounded-full text-xs text-gray-400">
                            +
                            {project.skills.length -
                              (window.innerWidth < 640 ? 3 : 4)}{" "}
                            more
                          </span>
                        )}
                    </div>

                    {/* View Details Button - Responsive sizing */}
                    <motion.a
                      href={project.live || project.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 ${
                        hoveredProject === project.title
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-blue-900/20 text-blue-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      View Details
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Projects Message - Responsive padding */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 sm:py-16 glass-effect-dark rounded-xl sm:rounded-2xl"
            >
              <div className="flex flex-col items-center px-4">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-3 sm:mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                  No projects found
                </h3>
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm sm:text-base"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}

          {/* View All Projects Button - Responsive sizing */}
          {filteredProjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-10 sm:mt-14 md:mt-20 text-center"
            >
              <a
                href="#"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 hover:-translate-y-1 group text-sm sm:text-base"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Custom media query styles */}
      <style jsx>{`
        @media (max-width: 480px) {
          .glass-effect-dark {
            backdrop-filter: blur(8px);
          }
        }

        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;

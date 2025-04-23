"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Code,
  Layers,
  Database,
  ExternalLink,
  FileDown,
} from "lucide-react";

const Hero = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isSmallScreen: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        isSmallScreen: window.innerWidth < 768,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Optimized particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust particle count based on screen size
    const baseParticleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
    const particleCount = screenSize.isMobile
      ? baseParticleCount * 0.5
      : baseParticleCount;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3, // Reduced speed for smoother motion
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
            Math.random() * 100 + 155
          )}, ${Math.floor(Math.random() * 255)}, ${
            Math.random() * 0.2 + 0.1
          })`,
        });
      }
    };

    let animationFrameId: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    createParticles();
    animateParticles();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [screenSize.isMobile]);

  useEffect(() => {
    // Skip star animation on mobile devices to improve performance
    if (screenSize.isMobile) return;

    const canvas = starsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust star count based on screen size
    const baseStarCount = Math.min(Math.floor(window.innerWidth / 10), 50);
    const starCount = screenSize.isTablet ? baseStarCount * 0.7 : baseStarCount;

    const stars: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      tail: { x: number; y: number; opacity: number }[];
    }[] = [];

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          tail: [],
        });
      }
    };

    let animationFrameId: number;
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail
        if (star.tail.length > 0) {
          for (let j = 0; j < star.tail.length; j++) {
            const tailPart = star.tail[j];
            ctx.fillStyle = `rgba(255, 255, 255, ${tailPart.opacity})`;
            ctx.beginPath();
            ctx.arc(tailPart.x, tailPart.y, star.size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            tailPart.opacity -= 0.02;
          }

          // Remove faded tail parts
          star.tail = star.tail.filter((part) => part.opacity > 0);
        }

        // Add new tail part
        if (Math.random() > 0.5) {
          star.tail.push({
            x: star.x,
            y: star.y,
            opacity: star.opacity * 0.8,
          });
        }

        star.y += star.speed;
        star.opacity -= 0.005;

        if (star.y > canvas.height || star.opacity <= 0) {
          stars[i] = {
            x: Math.random() * canvas.width,
            y: 0,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 2 + 0.5,
            opacity: 1,
            tail: [],
          };
        }
      }

      animationFrameId = requestAnimationFrame(animateStars);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    createStars();
    animateStars();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [screenSize.isMobile, screenSize.isTablet]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const skills = [
    { icon: Code, label: "Frontend" },
    { icon: Database, label: "Backend" },
    { icon: Layers, label: "Full Stack" },
  ];

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas for Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Background Canvas for Falling Stars */}
      <canvas ref={starsCanvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 opacity-95"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] xs:w-[400px] xs:h-[400px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 md:gap-12 items-center">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center lg:order-2 relative z-10 mt-8 lg:mt-0"
          >
            {/* Decorative circles in background */}
            <div className="absolute -z-10 w-full h-full max-w-md max-h-md opacity-30">
              <div className="absolute top-1/4 -left-10 w-12 xs:w-16 h-12 xs:h-16 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
              <div
                className="absolute bottom-1/3 -right-4 w-16 xs:w-20 h-16 xs:h-20 rounded-full bg-purple-500/20 blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-2/3 left-1/3 w-20 xs:w-24 h-20 xs:h-24 rounded-full bg-cyan-500/20 blur-xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <motion.div
              className="relative group"
              animate={floatingAnimation}
              style={{ opacity }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Gradient Rings */}
              <motion.div
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition duration-1000"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(34, 211, 238, 0.75), rgba(59, 130, 246, 0.75), rgba(124, 58, 237, 0.75))",
                    "linear-gradient(to right, rgba(59, 130, 246, 0.75), rgba(124, 58, 237, 0.75), rgba(34, 211, 238, 0.75))",
                    "linear-gradient(to right, rgba(124, 58, 237, 0.75), rgba(34, 211, 238, 0.75), rgba(59, 130, 246, 0.75))",
                    "linear-gradient(to right, rgba(34, 211, 238, 0.75), rgba(59, 130, 246, 0.75), rgba(124, 58, 237, 0.75))",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              ></motion.div>

              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 group-hover:opacity-75 transition duration-500 animate-tilt"></div>

              {/* Outer Rotating Ring - Hidden on very small screens */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-slate-700/30 animate-spin-slow hidden xs:block"></div>

              {/* Glowing dots on outer ring - Hidden on very small screens */}
              <motion.div
                className="absolute w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 hidden xs:block"
                style={{ top: "-6px", left: "50%" }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              ></motion.div>

              <motion.div
                className="absolute w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 hidden xs:block"
                style={{ bottom: "-6px", left: "50%" }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: 0.7,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              ></motion.div>

              {/* Profile Image Container */}
              <div className="relative rounded-full border-2 border-white/10 p-1.5 backdrop-blur-md bg-slate-900/70 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-10">
                <div className="overflow-hidden rounded-full w-48 h-48 xxs:w-52 xxs:h-52 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 relative shadow-inner">
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-slate-900/20 z-10 pointer-events-none"></div>

                  <Image
                    src="/images/about_me.png"
                    alt="Bimo"
                    fill
                    priority
                    sizes="(max-width: 320px) 192px, (max-width: 480px) 208px, (max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Skill Badges - Responsive sizing */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 xs:gap-2 justify-center w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="inline-flex gap-1.5 xs:gap-2.5 justify-center px-1.5 xs:px-2.5 py-1.5 xs:py-2 bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-full shadow-lg"
                  >
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 1 + index * 0.2,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.08,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
                          borderColor: "rgba(59, 130, 246, 0.5)",
                        }}
                        className="group relative flex items-center gap-1 xs:gap-1.5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm text-[10px] xxs:text-xs font-medium py-1 xs:py-1.5 px-2 xs:px-3.5 rounded-full border border-slate-700/80 shadow-md hover:border-blue-500/50 transition-all duration-300"
                      >
                        {/* Glowing background effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Pulsing indicator for the current skill */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-blue-400"
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5,
                          }}
                        />

                        <motion.div
                          className="relative"
                          whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <skill.icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-blue-400 group-hover:text-blue-300" />
                        </motion.div>

                        <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                          {skill.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Active Status Indicator - Responsive sizing */}
                <motion.div
                  className="absolute top-3 xs:top-4 right-3 xs:right-4 flex items-center gap-1 xs:gap-1.5 bg-slate-800/80 backdrop-blur-sm px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full border border-green-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="relative flex h-1.5 xs:h-2 w-1.5 xs:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 xs:h-2 w-1.5 xs:w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] xxs:text-xs text-green-300 font-medium">
                    Available for Work
                  </span>
                </motion.div>
              </div>

              {/* Interactive Floating Elements - Hidden on very small screens */}
              <motion.div
                className="absolute -top-6 -left-6 w-10 h-10 xs:w-12 xs:h-12 flex items-center justify-center rounded-full bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 shadow-lg z-20 hidden xxs:flex"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <span className="text-lg xs:text-xl">💻</span>
              </motion.div>

              <motion.div
                className="absolute -top-2 -right-8 w-12 h-12 xs:w-14 xs:h-14 flex items-center justify-center rounded-full bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 shadow-lg z-20 hidden xxs:flex"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <span className="text-xl xs:text-2xl">🚀</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            className="text-center lg:text-left space-y-4 xs:space-y-6 lg:order-1 relative"
            style={{ opacity }}
          >
            <div className="absolute -z-10 opacity-10 hidden lg:block">
              <div className="absolute top-12 -left-20 w-40 h-40 rounded-full border border-dashed border-blue-400/30 animate-spin-slow"></div>
              <div className="absolute bottom-0 right-0 w-60 h-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl"></div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3 px-3 xs:px-4 py-1 xs:py-1.5 bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-700/60 shadow-lg"
              >
                <div className="flex h-1.5 xs:h-2 w-1.5 xs:w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 xs:h-2 w-1.5 xs:w-2 bg-blue-500"></span>
                </div>
                <span className="text-blue-300 font-medium text-xs xs:text-sm tracking-wider">
                  Hello, I'm
                </span>
              </motion.div>

              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.6,
                    type: "spring",
                    damping: 12,
                  }}
                  className="text-3xl xxs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 xs:mb-4 relative z-10"
                >
                  {/* Gradient text with animated background */}
                  <span className="relative">
                    <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-300/20 via-blue-400/20 to-purple-500/20 opacity-50 animate-pulse-slow"></span>
                    <span className="relative bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                      M Bimo Bayu Bagaskara
                    </span>
                  </span>
                </motion.h1>

                {/* Subtle underline accent */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "30%", opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="hidden lg:block h-[2px] bg-gradient-to-r from-blue-500/60 to-purple-500/60 rounded-full blur-[1px] mb-5"
                ></motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base xs:text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 relative z-10"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 xs:gap-2 mb-1 xs:mb-2">
                <span className="text-gray-400">I'm a</span>
                <div className="relative h-6 xs:h-8 sm:h-auto overflow-hidden">
                  <TypeAnimation
                    sequence={[
                      "Full Stack Developer",
                      2000,
                      "Frontend Specialist",
                      2000,
                      "Backend Specialist",
                      2000,
                      "Problem Solver",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                    className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block"
                  />
                  {/* Animated cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="inline-block ml-1 h-full w-0.5 bg-blue-400"
                  ></motion.span>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-2 xs:mt-4 leading-relaxed relative text-sm xs:text-base"
              >
                {/* Highlight key terms */}
                Passionate about creating{" "}
                <span className="text-blue-300 font-medium">
                  intuitive
                </span> and{" "}
                <span className="text-purple-300 font-medium">engaging</span>{" "}
                digital experiences that solve real-world problems with{" "}
                <span className="text-cyan-300 font-medium">cutting-edge</span>{" "}
                technologies.
                {/* Subtle highlight box */}
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-sm"
                ></motion.span>
              </motion.p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-2 xs:gap-3 items-center justify-center lg:justify-start"
            >
              {[
                {
                  Icon: Github,
                  href: "https://github.com/Biyuraaa",
                  label: "GitHub",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/m-bimo-bayu-bagaskara-ab313424b/",
                  label: "LinkedIn",
                },
                {
                  Icon: Mail,
                  href: "mailto:m.bimo.bayu.bagaskara-2022@fst.unair.ac.id",
                  label: "Email",
                },
              ].map(({ Icon, href, label }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 xs:gap-2 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 text-gray-300 hover:text-white py-1.5 xs:py-2 px-2.5 xs:px-3 sm:px-4 rounded-full border border-slate-700/50 transition-all duration-300"
                  whileHover={{ y: -5, x: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-blue-300" />
                  <span className="text-[10px] xxs:text-xs sm:text-sm font-medium">
                    {label}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4 justify-center lg:justify-start mt-4 xs:mt-6 sm:mt-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group flex items-center gap-1.5 xs:gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 text-white font-medium py-2 xs:py-2.5 sm:py-3 px-4 xs:px-6 sm:px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm">
                  <span>See My Work</span>
                  <ExternalLink className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                </div>
              </motion.a>

              <motion.a
                href="/CV_M Bimo Bayu B.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group flex items-center gap-1.5 xs:gap-2"
              >
                <div className="bg-transparent hover:bg-slate-800/70 text-gray-300 font-medium py-2 xs:py-2.5 sm:py-3 px-4 xs:px-6 sm:px-8 rounded-full border border-slate-700 hover:border-blue-500/50 hover:text-white transition-all flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm">
                  <span>Download CV</span>
                  <FileDown className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 xs:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToNextSection}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="flex flex-col items-center"
        >
          <span className="text-gray-400 text-[10px] xxs:text-xs sm:text-sm mb-1 xs:mb-2">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

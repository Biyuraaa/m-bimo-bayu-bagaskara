"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  ArrowRight,
  MapPin,
  Sparkles,
  Calendar,
} from "lucide-react";
import { contacts } from "../data/contacts";

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const canvasRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

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

    // Enhanced connection pattern with improved aesthetics
    const drawConnections = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointCount = window.innerWidth < 768 ? 70 : 120; // Increased density
      const points = [];

      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25, // Slower movement
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2.5 + 0.8,
          hue: Math.random() * 80 + 180, // Extended color range
          pulse: Math.random() * Math.PI * 2, // Random starting phase
          pulseSpeed: Math.random() * 0.015 + 0.005, // Slower pulse
        });
      }

      function animate() {
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += p.pulseSpeed;

          // Boundary checks with smooth wrap-around
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // More subtle pulsing effect
          const pulseFactor = 0.15 * Math.sin(p.pulse) + 1;
          const currentSize = p.size * pulseFactor;

          // Improved gradient for points with softer edges
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            currentSize * 4
          );
          gradient.addColorStop(0, `hsla(${p.hue}, 95%, 65%, 0.7)`);
          gradient.addColorStop(0.5, `hsla(${p.hue}, 95%, 65%, 0.3)`);
          gradient.addColorStop(1, `hsla(${p.hue}, 95%, 65%, 0)`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Enhanced connections with varying line width based on distance
          for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200; // Increased connection distance

            if (distance < maxDistance) {
              // Dynamic opacity and line width based on distance
              const opacity = 0.15 * (1 - distance / maxDistance); // More subtle connections
              const lineWidth = 1.2 * (1 - distance / maxDistance);

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);

              const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              gradient.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${opacity})`);
              gradient.addColorStop(1, `hsla(${p2.hue}, 95%, 70%, ${opacity})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(animate);
      }

      animate();
    };

    drawConnections();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Animation variants with improved timings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.21, 1, 0.36, 1], // Enhanced easing for more elegant motion
      },
    },
  };

  const contactStaggerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05 + 0.15,
        duration: 0.65,
        ease: [0.21, 1, 0.36, 1],
      },
    }),
  };

  // Filter contacts based on active category
  const filteredContacts =
    activeCategory === "all"
      ? [...contacts]
      : contacts.filter((c) => c.category === activeCategory);

  // Enhanced hover scale effect with dynamic values
  const getHoverScale = (index) => {
    // Creating a more natural, organic feel to hover states
    const rowPosition = Math.floor(index / 5); // Assuming 5 cards per row max
    const colPosition = index % 5;

    // Center cards have slightly stronger effect
    const rowFactor = rowPosition % 2 === 0 ? 1.02 : 1.03;
    const colFactor = 1.03 + Math.sin((colPosition * Math.PI) / 4) * 0.02;

    return rowFactor * colFactor;
  };

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Enhanced decorative elements with more depth */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow opacity-80"></div>
      <div className="absolute -bottom-20 left-1/5 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      {/* Animated particles background with improved opacity */}
      <div className="absolute inset-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-7xl"
        >
          {/* Section Header with improved typography and spacing */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-200 font-medium text-sm tracking-wider mb-6 shadow-lg shadow-blue-900/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>CONNECT WITH ME</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">
                Get In Touch
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Have a project in mind or want to collaborate? I'm always open to
              interesting conversations and opportunities. Reach out through any
              of these channels below.
            </p>
          </motion.div>

          {/* Enhanced Category filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {["all", "direct", "social", "professional"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-700/25"
                    : "bg-slate-800/40 text-gray-400 hover:text-gray-200 border border-slate-700/40 hover:border-blue-500/30"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Improved Contact Grid with refined layout */}
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
              {filteredContacts.map((contact, index) => (
                <motion.a
                  key={contact.title}
                  custom={index}
                  variants={contactStaggerVariants}
                  initial="hidden"
                  animate="visible"
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden"
                  whileHover={{ scale: getHoverScale(index), zIndex: 10 }}
                  transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
                >
                  {/* Subtle background layer with edge glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:from-blue-500/20 group-hover:via-blue-500/10 group-hover:to-indigo-500/20 blur transition-all duration-700 rounded-xl" />

                  {/* Card base with refined glass effect */}
                  <div className="relative bg-slate-900/70 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300 shadow-xl group-hover:shadow-blue-900/20 h-full flex flex-col">
                    <div className="flex flex-col items-center text-center h-full z-10 relative">
                      {/* Enhanced icon container with improved gradient */}
                      <div
                        className={`bg-gradient-to-br ${contact.color} p-3 rounded-xl w-14 h-14 flex items-center justify-center 
                          shadow-lg mb-4 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-600/15`}
                      >
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.2 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}
                        >
                          <contact.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors mb-1">
                          {contact.title}
                        </h4>
                        {contact.value && (
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
                            {contact.value}
                          </p>
                        )}
                      </div>

                      {/* Improved call-to-action with smoother animation */}
                      <div className="mt-auto pt-4 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span className="text-xs font-medium mr-1.5">
                            Connect
                          </span>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                          >
                            <ArrowRight className="w-3 h-3" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Additional subtle highlight effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Location display with refined styling */}
            <motion.div
              variants={itemVariants}
              className="mt-20 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3.5 px-8 py-4 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 backdrop-blur-lg rounded-full border border-blue-500/20 text-blue-200 shadow-lg shadow-blue-900/10">
                <div className="p-2.5 bg-blue-500/15 rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">
                  Based in Surabaya, Indonesia • Available Worldwide
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

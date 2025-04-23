"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  ArrowRight,
  MapPin,
  Sparkles,
  Send,
  Calendar,
} from "lucide-react";
import { contacts } from "../data/contacts";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background effect

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

    // Create network connection pattern with improved visuals
    const drawConnections = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointCount = window.innerWidth < 768 ? 40 : 70;
      const points: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        hue: number;
      }[] = [];

      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          hue: Math.random() * 40 + 200, // Blue to purple range
        });
      }

      function animate() {
        if (!ctx) return;
        if (!canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
          if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

          // Create a gradient for points
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 2
          );
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, 0.8)`);
          gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
              // Create a gradient stroke for connections
              const opacity = 0.15 * (1 - distance / maxDistance);

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);

              const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${opacity})`);
              gradient.addColorStop(1, `hsla(${p2.hue}, 80%, 60%, ${opacity})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
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

  // For staggered appearance of contact methods
  const contactStaggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // Group contacts by category
  const contactCategories = {
    primary: contacts.filter((c) => c.category === "direct"),
    social: contacts.filter((c) => c.category === "social"),
    messaging: contacts.filter((c) => c.category === "professional"),
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="absolute inset-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-full border border-blue-500/20 text-blue-400 font-medium text-sm tracking-wider mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>LET'S CONNECT</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-cyan-blue">Get In Touch</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Have a project in mind or want to collaborate? I'm always open to
              interesting conversations and opportunities. Reach out through any
              of these channels and let's create something amazing!
            </p>
          </motion.div>

          {/* Main Contact Section */}
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            {/* Primary Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactCategories.primary.map((method, index) => (
                <motion.a
                  key={method.title}
                  custom={index}
                  variants={contactStaggerVariants}
                  initial="hidden"
                  animate="visible"
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 transform group-hover:scale-105 transition-transform duration-500 rounded-xl" />

                  <div className="relative glass-effect-dark p-6 rounded-xl group-hover:border-blue-500/30 transition-all duration-300 shadow-xl group-hover:shadow-blue-900/20 h-full">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`bg-gradient-to-br ${method.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center 
                          group-hover:scale-110 transition-transform duration-300 shadow-lg mb-5`}
                      >
                        <method.icon className="w-8 h-8 text-white" />
                      </div>

                      <h4 className="font-semibold text-xl text-gray-200 group-hover:text-white transition-colors mb-3">
                        {method.title}
                      </h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-5 text-base">
                        {method.value}
                      </p>
                      <div className="mt-auto pt-2">
                        <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-full">
                          <span className="text-sm font-medium mr-2">
                            Connect
                          </span>
                          <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Categories */}
            <div className="grid lg:grid-cols-2 gap-10 mt-10">
              {/* Social Media */}
              <motion.div
                variants={itemVariants}
                className="glass-effect-dark rounded-2xl p-8 border-blue-500/10 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-3 rounded-xl flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold gradient-text-blue-purple">
                    Social Profiles
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {contactCategories.social.map((social, index) => (
                    <motion.a
                      key={social.title}
                      custom={index + 3}
                      variants={contactStaggerVariants}
                      initial="hidden"
                      animate="visible"
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
                    >
                      <div
                        className={`p-3 rounded-full ${social.color} bg-opacity-20 mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {social.title}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Messaging Apps */}
              <motion.div
                variants={itemVariants}
                className="glass-effect-dark rounded-2xl p-8 border-blue-500/10 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-3 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold gradient-text-blue-purple">
                    Messaging Apps
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {contactCategories.messaging.map((msg, index) => (
                    <motion.a
                      key={msg.title}
                      custom={index + 6}
                      variants={contactStaggerVariants}
                      initial="hidden"
                      animate="visible"
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
                    >
                      <div
                        className={`p-3 rounded-full ${msg.color} bg-opacity-20 mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <msg.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {msg.title}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Schedule a Meeting */}
            <motion.div
              variants={itemVariants}
              className="mt-12 glass-effect-dark rounded-2xl p-8 border-blue-500/10 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-3 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold gradient-text-blue-purple mb-2">
                      Schedule a Meeting
                    </h3>
                    <p className="text-gray-300">
                      Prefer a face-to-face discussion? Book a time slot that
                      works for you.
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 hover:-translate-y-1 group whitespace-nowrap"
                >
                  Book a Call
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-full border border-blue-500/20 text-blue-300 mb-6 shadow-lg">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">
                  Based in Jakarta, Indonesia • Available Worldwide
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: Github, link: "#" },
                  { icon: Linkedin, link: "#" },
                  { icon: Instagram, link: "#" },
                  { icon: Mail, link: "mailto:example@example.com" },
                ].map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.link}
                    whileHover={{ y: -3 }}
                    className="w-12 h-12 glass-effect-dark rounded-full flex items-center justify-center hover:border-blue-500/30 transition-all shadow-lg"
                  >
                    <platform.icon className="w-5 h-5 text-gray-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

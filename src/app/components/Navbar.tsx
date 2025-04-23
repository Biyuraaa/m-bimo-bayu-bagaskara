"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  const navItems = [
    { label: "Home", href: "/", id: "home" },
    { label: "About", href: "/about", id: "about" },
    { label: "Skills", href: "/skills", id: "skills" },
    { label: "Projects", href: "/projects", id: "projects" },
    { label: "Contact", href: "/contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(scrollY.get() > 20);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const currentPosition = scrollY.get() + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (currentPosition >= top && currentPosition <= top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    scrollY.onChange(handleScroll);

    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY, navItems]);

  const logoVariants = {
    hover: {
      backgroundPosition: ["0%", "100%"],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const mobileNavVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/85 backdrop-blur-lg shadow-lg border-b border-slate-700/50"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div variants={logoVariants} whileHover="hover">
            <Link
              href="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-size-200 tracking-tight"
            >
              M Bimo Bayu B
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                className="relative px-1"
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full origin-left bg-gradient-to-r from-blue-400 to-purple-500 ${
                      activeSection === item.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                    initial={false}
                    animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                href="#contact"
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Let's Talk
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileNavVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden rounded-lg mt-2 bg-slate-800/95 backdrop-blur-md shadow-lg border border-slate-700/30"
            >
              <div className="px-3 py-2 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsOpen(false);
                      }}
                      className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? "text-white bg-slate-700/70 font-medium"
                          : "text-gray-300 hover:bg-slate-700/30 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  className="px-4 py-3"
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-2.5 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { motion } from "framer-motion";
import {
  getCategoryColor,
  getSkillColor,
  getCategoryGradient,
  getBorderColor,
} from "../helper/about";
import { useState } from "react";
import { getAllCategories } from "../data/categories";
import {
  getTopSkills,
  getSkillsWithCategories,
  getSkillsByCategory,
  skills,
} from "../data/skills";
import { Skill } from "../types/skills";

const AboutContent = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allCategories = getAllCategories();
  const topSkills = getTopSkills(5);
  const allSkills = getSkillsWithCategories();

  const filteredSkills = activeCategory
    ? getSkillsByCategory(activeCategory)
    : skills;

  function getSkillColor(skill: Skill) {
    return `bg-gradient-to-r ${skill.color}`;
  }

  return (
    <div className="space-y-6">
      {/* Personal Introduction with Visual Elements */}
      <div className="relative">
        <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-70"></div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-lg leading-relaxed text-gray-300"
        >
          <span className="text-blue-400 font-semibold">Hi there!</span> I'm a
          passionate{" "}
          <span className="text-purple-400 font-semibold">
            Full Stack Developer
          </span>{" "}
          with a keen eye for creating elegant solutions. With several years of
          experience in web development, I specialize in building responsive and
          intuitive applications that solve real-world problems.
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg leading-relaxed text-gray-300"
      >
        I thrive on transforming complex challenges into simple, beautiful, and
        user-friendly experiences. My approach combines technical expertise with
        creative problem-solving, ensuring that every project I work on is both{" "}
        <span className="relative inline-block">
          <span className="relative z-10">technically robust</span>
          <span className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-500/20 -z-10"></span>
        </span>{" "}
        and{" "}
        <span className="relative inline-block">
          <span className="relative z-10">aesthetically pleasing</span>
          <span className="absolute bottom-0 left-0 w-full h-[6px] bg-purple-500/20 -z-10"></span>
        </span>
        .
      </motion.p>

      {/* Personal traits/values with icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
      >
        {[
          {
            label: "Innovation-Driven",
            color: "bg-blue-500/10 border-blue-500/30",
          },
          {
            label: "Detail-Oriented",
            color: "bg-green-500/10 border-green-500/30",
          },
          {
            label: "Problem Solver",
            color: "bg-purple-500/10 border-purple-500/30",
          },
          {
            label: "Adaptable",
            color: "bg-amber-500/10 border-amber-500/30",
          },
        ].map((trait, i) => (
          <div
            key={i}
            className={`flex items-center p-3 rounded-lg border ${trait.color}`}
          >
            <span className="text-sm text-gray-300 font-medium">
              {trait.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Skills Section */}
      <div className="mt-12 pt-8 border-t border-slate-700/20">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center text-xl font-bold text-blue-400 mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
          Technical Expertise
        </motion.h3>

        {/* Categories Filter - Improved UI */}
        <div className="flex flex-wrap gap-2 mb-5 bg-slate-800/30 p-2 rounded-lg">
          <button
            key="all"
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
              activeCategory === null
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-700/50 text-gray-400 hover:bg-slate-700 hover:text-gray-200"
            }`}
          >
            All Skills
          </button>

          {allCategories
            .filter((cat) =>
              [
                "frontend",
                "backend",
                "programming",
                "database",
                "devops",
              ].includes(cat.id)
            )
            .map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? `bg-${getCategoryColor(
                        category.id
                      )}-500 text-white shadow-md shadow-${getCategoryColor(
                        category.id
                      )}-500/20`
                    : "bg-slate-700/50 text-gray-400 hover:bg-slate-700 hover:text-gray-200"
                }`}
              >
                <span className="ml-1">{category.title.split(" ")[0]}</span>
              </button>
            ))}
        </div>

        {/* Skill Tags with Grouping */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`group relative px-3 py-1.5 rounded-full text-sm font-medium border border-slate-700/50 transition-all duration-300 overflow-hidden ${getSkillColor(
                  skill
                )}`}
              >
                {/* Background glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${getCategoryGradient(
                    skill.category.id
                  )}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Content */}
                <span className="relative z-10 flex items-center justify-between w-full">
                  <span>{skill.name}</span>

                  {/* Small dot indicator showing skill level */}
                  <span
                    className={`ml-2 w-2 h-2 rounded-full ${
                      skill.level >= 90
                        ? "bg-emerald-400"
                        : skill.level >= 80
                        ? "bg-green-400"
                        : skill.level >= 70
                        ? "bg-yellow-400"
                        : "bg-orange-400"
                    } opacity-70`}
                  />
                </span>

                {/* Animated Skill Level Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-700/30">
                  <motion.div
                    className={`absolute bottom-0 left-0 h-full ${getCategoryGradient(
                      skill.category.id
                    )}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.03 }}
                  >
                    {/* Animated particles effect */}
                    <div className="absolute top-0 right-0 h-full w-[3px] bg-white/50 blur-[1px] animate-pulse"></div>

                    {/* Gradient overlay for more dimension */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                  </motion.div>
                </div>

                {/* Enhanced Tooltip */}
                <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-800/90 backdrop-blur-sm text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20 border border-slate-700/70 shadow-xl shadow-black/20 min-w-[120px]">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="font-medium text-blue-300">
                      {skill.category.title}
                    </span>

                    {/* Mini progress bar in tooltip */}
                    <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getCategoryGradient(
                          skill.category.id
                        )}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <span className="font-bold text-white/90">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Improved tooltip arrow with shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b border-slate-700/70 bg-slate-800/90 shadow-sm"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Top skills section - With card layout */}
        <div className="mt-8 pt-6 border-t border-slate-700/20">
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Top Expertise
            </motion.span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topSkills.slice(0, 6).map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className={`p-4 rounded-lg border relative group overflow-hidden ${getBorderColor(
                  skill.category.id
                )} backdrop-blur-sm`}
              >
                {/* Background gradient with animation */}
                <div
                  className={`absolute inset-0 opacity-20 ${getCategoryGradient(
                    skill.category.id
                  )}`}
                ></div>
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>

                {/* Animated particles in background */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white animate-ping"></div>
                  <div
                    className="absolute top-1/4 left-3/4 w-1 h-1 rounded-full bg-white animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-white animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                {/* Content with z-index to be above background */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      {/* Category indicator */}
                      <div
                        className={`w-2 h-8 rounded-full ${getCategoryGradient(
                          skill.category.id
                        )}`}
                      ></div>

                      <div>
                        <h5 className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                          {skill.name}
                        </h5>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {skill.category.title}
                        </p>
                      </div>
                    </div>

                    {/* Skill level badge */}
                    <div className="relative">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/5 shadow-lg group-hover:bg-white/20 transition-all">
                        {skill.level}%
                      </span>

                      {/* Animated glow effect on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(90deg, #60a5fa, #a78bfa)"
                              : "linear-gradient(90deg, #34d399, #38bdf8)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Enhanced progress bar */}
                  <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm p-0.5">
                    <motion.div
                      className={`h-full rounded-full ${getCategoryGradient(
                        skill.category.id
                      )}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.2 * index,
                        ease: "easeOut",
                      }}
                    >
                      {/* Animated shimmer effect */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                        <motion.div
                          className="w-20 h-full bg-white/20 blur-sm"
                          animate={{
                            x: ["0%", "100%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            delay: index * 0.1,
                            ease: "linear",
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Skill description tooltip on hover */}
                  <div className="absolute -bottom-full left-0 right-0 p-3 bg-slate-900/90 backdrop-blur-md border-t border-slate-700/50 text-xs text-gray-300 rounded-b-lg opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300 ease-in-out">
                    <p className="line-clamp-2">
                      {skill.description ||
                        `Expert proficiency in ${skill.name} for building professional applications.`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all skills link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-5"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              <span>View all skills</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;

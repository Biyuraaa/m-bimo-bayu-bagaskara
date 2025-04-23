import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronUp,
  ChevronDown,
  Building,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { experiences } from "../data/experiences";
import { useState } from "react";
import Image from "next/image";

const ExperienceContent = () => {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences.find((exp) => exp.featured)?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <div className="space-y-9">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          className={`relative pl-8 pb-6 border-l-2 group ${
            experience.featured ? "border-blue-500" : "border-blue-500/30"
          }`}
        >
          {/* Timeline dot with hover effect */}
          <div
            className={`absolute w-5 h-5 rounded-full -left-[11px] top-1 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              experience.featured
                ? "bg-blue-500 ring-4 ring-blue-500/20"
                : "bg-blue-500/70 group-hover:bg-blue-500 group-hover:ring-2 group-hover:ring-blue-500/20"
            }`}
          >
            {experience.featured && <Star className="w-3 h-3 text-white" />}
          </div>

          {/* Featured indicator with improved styling */}
          {experience.featured && (
            <div className="absolute -left-1 -top-1 px-2 py-0.5 rounded-full flex items-center gap-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-xs font-medium border border-blue-500/30 text-blue-300">
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </div>
          )}

          {/* Header with more information and clickable toggle */}
          <div
            onClick={() => toggleExpand(experience.id)}
            className="cursor-pointer group/header"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-semibold text-blue-400 group-hover/header:text-blue-300 transition-colors">
                {experience.title}
              </h4>

              <button className="p-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-gray-400 hover:text-blue-300 hover:border-blue-500/30 transition-all">
                {expandedId === experience.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-gray-400 text-sm">
              {/* Company with icon */}
              <div className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-400/70" />
                <span>{experience.company}</span>
              </div>

              {/* Location if available */}
              {experience.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400/70" />
                  <span>{experience.location}</span>
                </div>
              )}

              {/* Date range */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400/70" />
                <span>
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>

              {/* External link if available */}
              {experience.url && (
                <a
                  href={experience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Project</span>
                </a>
              )}
            </div>

            {/* Type badge */}
            {experience.type && (
              <div className="mt-3">
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full ${getTypeBadgeStyle(
                    experience.type
                  )}`}
                >
                  {experience.type.charAt(0).toUpperCase() +
                    experience.type.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Logo if available */}
          {experience.logo && (
            <div className="absolute right-0 top-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center p-1">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          )}

          {/* Expandable content */}
          <AnimatePresence>
            {expandedId === experience.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Details with enhanced styling */}
                <div className="mt-4 space-y-3">
                  {experience.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detail.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                      className="bg-slate-800/30 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50 hover:border-blue-500/20 transition-all group/detail"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-1 p-1 rounded-full bg-blue-500/10">
                          <ChevronRight className="w-3 h-3 text-blue-400" />
                        </div>
                        <p className="text-gray-300 group-hover/detail:text-gray-200 transition-colors">
                          {detail.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Skills used */}
                {experience.skills && experience.skills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5"
                  >
                    <h5 className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-500/30 rounded-full"></span>
                      Technologies & Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + skillIndex * 0.05,
                          }}
                          className="text-xs font-medium px-2.5 py-1.5 rounded-full bg-gradient-to-br from-slate-800 to-slate-700/80 border border-slate-700/50 text-blue-300 hover:border-blue-500/30 hover:text-blue-200 transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA if URL available */}
                {experience.url && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-5"
                  >
                    <a
                      href={experience.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 border border-blue-500/30 transition-all group/link"
                    >
                      <span>Visit Project</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
const getTypeBadgeStyle = (type: string) => {
  switch (type) {
    case "work":
      return "bg-blue-500/10 text-blue-300 border border-blue-500/30";
    case "volunteer":
      return "bg-green-500/10 text-green-300 border border-green-500/30";
    case "internship":
      return "bg-purple-500/10 text-purple-300 border border-purple-500/30";
    case "education":
      return "bg-amber-500/10 text-amber-300 border border-amber-500/30";
    default:
      return "bg-slate-700/50 text-gray-300 border border-slate-600/30";
  }
};
export default ExperienceContent;

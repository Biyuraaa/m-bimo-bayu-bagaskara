import { motion } from "framer-motion";
import {
  GraduationCapIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "lucide-react";
import { educations } from "../data/education";

const EducationContent = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCapIcon className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold text-white">Education Journey</h3>
      </div>

      {educations.map((education, index) => (
        <motion.div
          key={education.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          className="relative pl-10 border-l-2 border-blue-500/30 pb-6 last:pb-0"
        >
          {/* Timeline dot */}
          <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[11px] top-1 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
          </div>

          {/* Institution and time period */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-3">
            <h4 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
              {education.institution}
              {education.isOngoing && (
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                  Current
                </span>
              )}
            </h4>

            <div className="text-gray-400 flex items-center gap-2 text-sm">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span>
                {education.startDate} – {education.endDate || "Present"}
              </span>
              {education.location && (
                <>
                  <MapPinIcon className="w-4 h-4 text-gray-500 ml-2" />
                  <span className="text-gray-500">{education.location}</span>
                </>
              )}
            </div>
          </div>

          {/* Degree information */}
          <div className="text-gray-300 bg-slate-800/30 p-4 rounded-lg border border-slate-700/40">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">
                  {education.degree}
                  {education.field ? ` in ${education.field}` : ""}
                </p>

                {education.description && (
                  <p className="mt-2 text-gray-400 text-sm">
                    {education.description}
                  </p>
                )}
              </div>

              {education.gpa && (
                <div className="bg-slate-800/70 px-4 py-2 rounded-lg border border-slate-700/60 text-center">
                  <p className="text-xs text-gray-400">GPA</p>
                  <p className="text-xl font-bold text-blue-400">
                    {education.gpa.score}/{education.gpa.scale}
                  </p>
                </div>
              )}
            </div>

            {/* Achievements */}
            {education.achievements && education.achievements.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-300 mb-2">
                  Activities & Achievements:
                </p>
                <ul className="space-y-2">
                  {education.achievements.map((achievement) => (
                    <li key={achievement.id} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-sm">{achievement.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Education stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-10 pt-6 border-t border-slate-700/30"
      >
        <h4 className="text-lg font-medium text-gray-300 mb-4">
          Education at a Glance
        </h4>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/40 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {new Date().getFullYear() -
                new Date(educations[0].startDate).getFullYear()}
              +
            </div>
            <div className="text-xs text-gray-400 mt-1">Years in Education</div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/40 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {(() => {
                const degrees = educations.map((e) => e.degree);
                if (
                  degrees.some(
                    (d) => d.includes("Ph.D") || d.includes("Doctorate")
                  )
                )
                  return "Ph.D.";
                if (
                  degrees.some(
                    (d) => d.includes("Master") || d.includes("M.S.")
                  )
                )
                  return "M.S.";
                if (
                  degrees.some(
                    (d) => d.includes("Bachelor") || d.includes("B.S.")
                  )
                )
                  return "B.S.";
                return "Pursuing";
              })()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Highest Degree</div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/40 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {educations.length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Institutions</div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/40 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {educations.reduce(
                (total, edu) => total + (edu.achievements?.length || 0),
                0
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1">Achievements</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationContent;

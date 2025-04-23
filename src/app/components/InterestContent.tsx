import { motion } from "framer-motion";
import { interests, additionalInterests } from "../data/interests";

const InterestContent = () => {
  return (
    <div className="space-y-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg leading-relaxed text-gray-300"
      >
        Beyond coding, I'm passionate about continuous learning, open-source
        contributions, and exploring the intersection of technology and
        creativity.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 md:p-5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
          >
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-45 translate-x-10 -translate-y-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path
                  d={
                    interest.category === "technical"
                      ? "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      : interest.category === "creative"
                      ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"
                      : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  }
                />
              </svg>
            </div>

            <div className="text-2xl md:text-3xl mb-2 md:mb-3">
              {interest.icon}
            </div>

            <h4 className="text-lg md:text-xl font-semibold text-blue-400 mb-1 md:mb-2 group-hover:text-blue-300 transition-colors">
              {interest.title}
            </h4>

            <p className="text-sm md:text-base text-gray-300">
              {interest.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Additional interests section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 pt-6 border-t border-slate-700/30"
      >
        <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
          Other Interests
        </h4>

        <div className="flex flex-wrap gap-2">
          {additionalInterests.map((interest) => (
            <div
              key={interest.id}
              className="px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-full text-sm text-gray-300 hover:border-blue-500/30 transition-colors"
            >
              <span className="mr-2">{interest.icon}</span>
              {interest.title}
            </div>
          ))}

          <div className="px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-full text-sm text-gray-300">
            <span className="mr-2">🎸</span>
            Music
          </div>

          <div className="px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-full text-sm text-gray-300">
            <span className="mr-2">📚</span>
            Reading
          </div>

          <div className="px-3 py-1.5 bg-slate-800/30 border border-slate-700/50 rounded-full text-sm text-gray-300">
            <span className="mr-2">🏋️</span>
            Fitness
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterestContent;

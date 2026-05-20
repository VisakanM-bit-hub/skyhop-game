import { motion } from 'framer-motion';

/**
 * ScoreBoard Component
 * Displays current score, high score, and game statistics
 */
export const ScoreBoard = ({ score, highScore, multiplier = 1, level = 1 }) => {
  return (
    <motion.div
      className="absolute top-4 left-4 right-4 z-20 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Score display with glassmorphism */}
      <div className="flex justify-between items-start gap-4">
        {/* Current Score */}
        <div className="backdrop-blur-md bg-slate-900/30 border border-cyan-500/30 rounded-lg p-4 flex-1">
          <div className="text-xs text-cyan-400/70 mb-1 font-semibold uppercase tracking-widest">Score</div>
          <div className="text-3xl font-bold text-cyan-300 flex items-baseline gap-2">
            {score}
            {multiplier > 1 && (
              <motion.span
                className="text-lg text-pink-400 font-semibold"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                }}
              >
                x{multiplier}
              </motion.span>
            )}
          </div>
        </div>

        {/* Level */}
        <div className="backdrop-blur-md bg-slate-900/30 border border-pink-500/30 rounded-lg p-4 flex-1">
          <div className="text-xs text-pink-400/70 mb-1 font-semibold uppercase tracking-widest">Level</div>
          <div className="text-2xl font-bold text-pink-300">{level}</div>
        </div>

        {/* High Score */}
        <div className="backdrop-blur-md bg-slate-900/30 border border-yellow-500/30 rounded-lg p-4 flex-1">
          <div className="text-xs text-yellow-400/70 mb-1 font-semibold uppercase tracking-widest">Best</div>
          <div className="text-2xl font-bold text-yellow-300">{highScore}</div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Mini ScoreBoard Component
 * Compact score display for top-right corner
 */
export const MiniScoreBoard = ({ score, highScore }) => {
  return (
    <motion.div
      className="absolute top-4 right-4 z-20 pointer-events-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-md bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-cyan-400/70 font-semibold">SCORE</span>
          <span className="text-xl font-bold text-cyan-300">{score}</span>
        </div>
        <div className="border-t border-cyan-500/20" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-yellow-400/70 font-semibold">BEST</span>
          <span className="text-lg font-bold text-yellow-300">{highScore}</span>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Combo Counter Component
 * Shows combo multiplier when collecting points
 */
export const ComboCounter = ({ combo, isActive }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isActive
          ? { scale: [1, 1.3, 1], opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
        +{combo}
      </div>
    </motion.div>
  );
};

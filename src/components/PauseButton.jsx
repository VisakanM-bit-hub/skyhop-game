import { motion } from 'framer-motion';
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5';

/**
 * PauseButton Component
 * Floating pause/resume button in top-right corner
 */
export const PauseButton = ({ isPaused, onPauseToggle }) => {
  return (
    <motion.button
      onClick={onPauseToggle}
      className="absolute top-4 right-4 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-pink-500/30 backdrop-blur-md border border-cyan-400/50 hover:border-cyan-400 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-cyan-500/50 transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isPaused
          ? '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)'
          : '0 0 10px rgba(0, 255, 255, 0.3)',
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          scale: isPaused ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: isPaused ? Infinity : 0,
        }}
      >
        {isPaused ? (
          <IoPlaySharp className="w-6 h-6 text-cyan-300" />
        ) : (
          <IoPauseSharp className="w-6 h-6 text-cyan-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

/**
 * Pause Menu Component
 * Full-screen pause menu overlay
 */
export const PauseMenu = ({ isPaused, onResume, onRestart }) => {
  if (!isPaused) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        <h2 className="text-5xl font-black text-cyan-400 mb-8">PAUSED</h2>

        <div className="space-y-4 max-w-xs">
          <motion.button
            onClick={onResume}
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume Game
          </motion.button>

          <motion.button
            onClick={onRestart}
            className="w-full px-8 py-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-lg border border-cyan-500/50 hover:border-cyan-400 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Restart Game
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

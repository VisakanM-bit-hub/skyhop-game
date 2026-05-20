import { motion, AnimatePresence } from 'framer-motion';
import { getHighScore } from '../utils/storage';

/**
 * StartScreen Component
 * Displays welcome screen with instructions and start button
 */
export const StartScreen = ({ onStart, highScore }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <motion.div
          className="mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h1
            className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            SKYHOP
          </motion.h1>
          <p className="text-cyan-400/60 text-lg font-semibold tracking-widest">TAP TO FLY</p>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          className="mb-12 space-y-4 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {highScore > 0 && (
            <div className="backdrop-blur-md bg-slate-900/30 border border-yellow-500/30 rounded-lg px-6 py-3">
              <p className="text-yellow-400/70 text-sm font-semibold mb-1">BEST SCORE</p>
              <p className="text-3xl font-bold text-yellow-300">{highScore}</p>
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mb-12 space-y-3 text-center max-w-xs"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="backdrop-blur-md bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
            <p className="text-pink-300/80 text-sm font-medium leading-relaxed">
              ⬆️ Jump to avoid obstacles and climb higher
            </p>
          </div>
          <div className="backdrop-blur-md bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-300/80 text-sm font-medium leading-relaxed">
              🎯 Survive as long as possible and break records
            </p>
          </div>
          <div className="backdrop-blur-md bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-300/80 text-sm font-medium leading-relaxed">
              ⚡ Game gets harder the higher you climb
            </p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          onClick={onStart}
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold text-lg rounded-full shadow-lg cursor-pointer relative overflow-hidden group"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">START GAME</span>
        </motion.button>

        {/* Footer text */}
        <motion.p
          className="absolute bottom-4 text-cyan-400/40 text-xs font-semibold tracking-widest"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          TAP OR CLICK TO PLAY
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

import { motion, AnimatePresence } from 'framer-motion';
import { IoIosRefresh } from 'react-icons/io';

/**
 * GameOver Component
 * Displays game over screen with stats and restart button
 */
export const GameOver = ({ score, highScore, isNewRecord, onRestart }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Game Over Title */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            GAME OVER
          </h1>
        </motion.div>

        {/* New Record Badge */}
        <AnimatePresence>
          {isNewRecord && (
            <motion.div
              className="mb-6"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -20 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <div className="relative backdrop-blur-md bg-yellow-900/40 border-2 border-yellow-400 rounded-full px-6 py-2">
                  <p className="text-yellow-300 font-bold text-sm tracking-widest">🎉 NEW RECORD! 🎉</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="mb-12 space-y-4 w-full max-w-xs"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Final Score */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-cyan-500/30 rounded-lg p-6 text-center">
            <p className="text-cyan-400/70 text-sm font-semibold mb-2 uppercase tracking-widest">Final Score</p>
            <p className="text-5xl font-black text-cyan-300">{score}</p>
          </div>

          {/* High Score */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-yellow-500/30 rounded-lg p-6 text-center">
            <p className="text-yellow-400/70 text-sm font-semibold mb-2 uppercase tracking-widest">Best Score</p>
            <p className="text-4xl font-black text-yellow-300">{highScore}</p>
          </div>

          {/* Score Progress */}
          {!isNewRecord && (
            <motion.div
              className="backdrop-blur-md bg-slate-900/40 border border-pink-500/30 rounded-lg p-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-pink-400/70 text-xs font-semibold mb-2 uppercase tracking-widest">Until Record</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-pink-300 text-sm font-bold">{score}</span>
                <span className="text-pink-400/50 text-xs">/{highScore}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / Math.max(highScore, score)) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Restart Button */}
        <motion.button
          onClick={onRestart}
          className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold text-lg rounded-full shadow-lg cursor-pointer group relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <IoIosRefresh className="relative z-10 w-5 h-5" />
          <span className="relative z-10">PLAY AGAIN</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

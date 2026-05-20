import { motion } from 'framer-motion';

/**
 * MobileControls Component
 * Touch-friendly controls for mobile gameplay
 */
export const MobileControls = ({ onTap }) => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-20 z-30 pointer-events-auto sm:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        onClick={onTap}
        className="w-full h-full flex items-center justify-center bg-gradient-to-t from-cyan-900/40 to-transparent hover:from-cyan-800/60 transition-colors cursor-pointer"
        whileActive={{ scale: 0.95 }}
      >
        <motion.div
          className="text-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
        >
          <p className="text-cyan-400 font-bold text-sm tracking-widest">TAP TO JUMP</p>
          <p className="text-cyan-300/60 text-xs">or press SPACE</p>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

/**
 * Responsive Touch Area Component
 * Full-screen tap zone for mobile
 */
export const TouchArea = ({ onTap, children }) => {
  return (
    <motion.div
      className="w-full h-full cursor-pointer active:opacity-75 transition-opacity"
      onClick={onTap}
      onTouchStart={(e) => {
        e.preventDefault();
        onTap();
      }}
    >
      {children}
    </motion.div>
  );
};

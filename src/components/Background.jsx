import { motion } from 'framer-motion';

/**
 * Background Component
 * Animated futuristic background with parallax effect
 */
export const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1), transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(255, 0, 100, 0.1), transparent 40%)',
          }}
        />
      </div>

      {/* Animated grid background */}
      <svg className="absolute inset-0 opacity-20" width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0, 255, 255, 0.5)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() > 0.5 ? '0, 255, 255' : '255, 0, 100'}, 0.5)`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Animated lines */}
      <svg className="absolute inset-0 opacity-30" width="100%" height="100%">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="rgba(0, 255, 255, 0.2)"
          strokeWidth="1"
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </svg>

      {/* Radial scan effect */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0, 255, 255, 0.1) 100%)',
        }}
        animate={{
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

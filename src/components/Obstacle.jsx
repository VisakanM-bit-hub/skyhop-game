import { motion } from 'framer-motion';
import { OBSTACLE_WIDTH, OBSTACLE_HEIGHT } from '../utils/constants';

/**
 * Obstacle Component
 * Renders moving obstacles that player must avoid
 */
export const Obstacle = ({ x, y, isMoving = true }) => {
  return (
    <motion.div
      className="absolute rounded-lg overflow-hidden"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${OBSTACLE_WIDTH}px`,
        height: `${OBSTACLE_HEIGHT}px`,
        background: 'linear-gradient(135deg, rgba(255, 0, 100, 0.8), rgba(255, 50, 150, 0.6))',
        boxShadow: '0 0 15px rgba(255, 0, 100, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        perspective: '1000px',
      }}
      animate={{
        rotateZ: isMoving ? 360 : 0,
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Obstacle pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
      }} />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.2), transparent)',
        }}
        animate={{
          opacity: isMoving ? [0.3, 0.6, 0.3] : 0.3,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

/**
 * Optimized Obstacle with memoization
 */
export const MemoizedObstacle = ({ obstacleState }) => {
  const { x, y, isMoving = true } = obstacleState;
  return <Obstacle x={x} y={y} isMoving={isMoving} />;
};

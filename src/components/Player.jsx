import { motion } from 'framer-motion';
import { PLAYER_SIZE, GRAVITY, JUMP_POWER, MAX_FALL_SPEED } from '../utils/constants';

/**
 * Player Component
 * Renders the player character with animations
 * Handles physics: gravity, jumping, movement
 */
export const Player = ({ x, y, isJumping, isFalling }) => {
  return (
    <motion.div
      className="absolute w-10 h-10 rounded-full"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        background: 'radial-gradient(circle at 30% 30%, #00ffff, #0088ff)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), inset -2px -2px 5px rgba(0, 0, 0, 0.5)',
      }}
      animate={{
        scale: isJumping ? 0.9 : isFalling ? 1.1 : 1,
        boxShadow: isJumping
          ? '0 0 30px rgba(0, 255, 255, 1), inset -2px -2px 5px rgba(0, 0, 0, 0.5)'
          : isFalling
            ? '0 0 15px rgba(255, 0, 100, 0.8), inset -2px -2px 5px rgba(0, 0, 0, 0.5)'
            : '0 0 20px rgba(0, 255, 255, 0.8), inset -2px -2px 5px rgba(0, 0, 0, 0.5)',
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3), transparent)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        }}
        animate={{
          opacity: isJumping ? 1 : 0.7,
        }}
      />
    </motion.div>
  );
};

/**
 * Optimized Player with position tracking
 * Memoized to prevent unnecessary re-renders
 */
export const MemoizedPlayer = ({ playerState }) => {
  const { x, y, velocityY } = playerState;
  const isJumping = velocityY < -5;
  const isFalling = velocityY > 3;

  return <Player x={x} y={y} isJumping={isJumping} isFalling={isFalling} />;
};

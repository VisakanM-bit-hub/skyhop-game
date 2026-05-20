import { motion } from 'framer-motion';

/**
 * ParticleEffect Component
 * Renders particle burst effects on collision and jumping
 */
export const ParticleEffect = ({ particles }) => {
  if (!particles || particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(0, 255, 255, ${particle.life / particle.maxLife}), transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 255, 255, ${particle.life / particle.maxLife * 0.8})`,
          }}
          initial={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: particle.life / particle.maxLife,
            scale: 0.3,
          }}
          transition={{
            duration: particle.maxLife / 1000,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Explosion Effect Component
 * Creates burst effect on collision
 */
export const ExplosionEffect = ({ x, y, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '60px',
        height: '60px',
        marginLeft: '-30px',
        marginTop: '-30px',
      }}
      animate={{
        scale: [0, 1, 1.5],
        opacity: [1, 0.8, 0],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {/* Ring 1 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: 'rgba(255, 0, 100, 0.8)',
          boxShadow: '0 0 20px rgba(255, 0, 100, 0.8)',
        }}
        animate={{
          scale: [1, 2],
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      />

      {/* Ring 2 */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400"
        style={{
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)',
        }}
        animate={{
          scale: [1, 2.5],
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  );
};

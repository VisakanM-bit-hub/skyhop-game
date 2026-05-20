import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing game loop with requestAnimationFrame
 * @param {Function} onUpdate - Callback to update game state
 * @param {boolean} isRunning - Whether game loop should run
 */
export const useGameLoop = (onUpdate, isRunning = true) => {
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(Date.now());

  const gameLoop = useCallback(() => {
    if (!isRunning) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Cap delta time to prevent large jumps (max 16ms = ~60fps)
    const normalizedDelta = Math.min(deltaTime, 16);

    onUpdate(normalizedDelta);

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [onUpdate, isRunning]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  return animationFrameRef;
};

/**
 * Custom hook for managing collision detection state
 * Optimized to prevent unnecessary re-renders
 */
export const useCollisionDetection = () => {
  const collisionRef = useRef({
    hasCollision: false,
    lastCollisionTime: 0,
    collisionCooldown: 100, // ms
  });

  const setCollision = useCallback((value) => {
    const now = Date.now();
    if (now - collisionRef.current.lastCollisionTime > collisionRef.current.collisionCooldown) {
      collisionRef.current.hasCollision = value;
      collisionRef.current.lastCollisionTime = now;
      return true;
    }
    return false;
  }, []);

  const getCollision = useCallback(() => collisionRef.current.hasCollision, []);

  const resetCollision = useCallback(() => {
    collisionRef.current.hasCollision = false;
  }, []);

  return { setCollision, getCollision, resetCollision };
};

/**
 * Custom hook for managing input handling
 * Supports both touch and mouse events for mobile-first design
 */
export const useGameInput = (onInput) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = () => onInput();
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        onInput();
      }
    };
    const handleTouchStart = (e) => {
      e.preventDefault();
      onInput();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [onInput]);

  return inputRef;
};

/**
 * Custom hook for managing particle effects
 */
export const useParticles = () => {
  const particlesRef = useRef([]);

  const addParticle = useCallback((x, y, velocityX, velocityY, life = 600) => {
    const particle = {
      id: Math.random(),
      x,
      y,
      velocityX,
      velocityY,
      life,
      maxLife: life,
      size: 4,
    };
    particlesRef.current.push(particle);
    return particle.id;
  }, []);

  const updateParticles = useCallback((deltaTime) => {
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life -= deltaTime;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY += 0.1; // gravity
      return particle.life > 0;
    });
  }, []);

  const getParticles = useCallback(() => particlesRef.current, []);

  const clearParticles = useCallback(() => {
    particlesRef.current = [];
  }, []);

  return {
    addParticle,
    updateParticles,
    getParticles,
    clearParticles,
  };
};

/**
 * Custom hook for performance optimization with memoization
 */
export const useGameState = (initialState) => {
  const stateRef = useRef(initialState);

  const getState = useCallback(() => stateRef.current, []);

  const setState = useCallback((updater) => {
    if (typeof updater === 'function') {
      stateRef.current = updater(stateRef.current);
    } else {
      stateRef.current = updater;
    }
  }, []);

  return { getState, setState };
};

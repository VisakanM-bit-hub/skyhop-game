import { useRef, useCallback } from 'react';

/**
 * Custom hook for collision detection
 * Provides optimized collision checking methods
 */
export const useCollision = () => {
  const collisionsRef = useRef(new Map());

  /**
   * Rectangle collision detection (AABB)
   */
  const checkRectCollision = useCallback((rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }, []);

  /**
   * Check if player is on platform
   */
  const isPlayerOnPlatform = useCallback((player, platform) => {
    const playerBottom = player.y + player.height;
    const platformTop = platform.y;
    const tolerance = 5;

    return (
      player.velocityY >= 0 &&
      playerBottom <= platformTop + tolerance &&
      playerBottom >= platformTop - tolerance &&
      checkRectCollision(player, platform)
    );
  }, [checkRectCollision]);

  /**
   * Check obstacle collision
   */
  const checkObstacleCollision = useCallback((player, obstacle) => {
    return checkRectCollision(player, obstacle);
  }, [checkRectCollision]);

  /**
   * Get all colliding obstacles
   */
  const getCollidingObstacles = useCallback((player, obstacles) => {
    return obstacles.filter((obstacle) => checkRectCollision(player, obstacle));
  }, [checkRectCollision]);

  /**
   * Find nearest landing platform
   */
  const findNearestPlatform = useCallback((player, platforms) => {
    let nearest = null;
    let minDistance = Infinity;

    platforms.forEach((platform) => {
      if (isPlayerOnPlatform(player, platform)) {
        const distance = Math.abs(player.x - platform.x);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = platform;
        }
      }
    });

    return nearest;
  }, [isPlayerOnPlatform]);

  /**
   * Check if point is in rectangle
   */
  const pointInRect = useCallback((point, rect) => {
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }, []);

  return {
    checkRectCollision,
    isPlayerOnPlatform,
    checkObstacleCollision,
    getCollidingObstacles,
    findNearestPlatform,
    pointInRect,
  };
};

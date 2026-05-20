// Collision detection utility functions

/**
 * Check if two rectangles collide
 * @param {number} x1 - First rectangle x position
 * @param {number} y1 - First rectangle y position
 * @param {number} w1 - First rectangle width
 * @param {number} h1 - First rectangle height
 * @param {number} x2 - Second rectangle x position
 * @param {number} y2 - Second rectangle y position
 * @param {number} w2 - Second rectangle width
 * @param {number} h2 - Second rectangle height
 * @returns {boolean} True if rectangles collide
 */
export const checkRectCollision = (x1, y1, w1, h1, x2, y2, w2, h2) => {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
};

/**
 * Check if player is standing on platform
 * @param {Object} player - Player object with x, y, width, height, velocityY
 * @param {Object} platform - Platform object with x, y, width, height
 * @returns {boolean} True if player is on platform
 */
export const isPlayerOnPlatform = (player, platform) => {
  const playerBottom = player.y + player.height;
  const platformTop = platform.y;
  const tolerance = 5; // pixels of tolerance

  // Check if player is falling and above platform
  if (
    player.velocityY >= 0 &&
    playerBottom <= platformTop + tolerance &&
    playerBottom >= platformTop - tolerance &&
    checkRectCollision(
      player.x,
      player.y,
      player.width,
      player.height,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    )
  ) {
    return true;
  }

  return false;
};

/**
 * Check if player has collided with obstacle
 * @param {Object} player - Player object
 * @param {Object} obstacle - Obstacle object
 * @returns {boolean} True if collision detected
 */
export const checkPlayerObstacleCollision = (player, obstacle) => {
  return checkRectCollision(
    player.x,
    player.y,
    player.width,
    player.height,
    obstacle.x,
    obstacle.y,
    obstacle.width,
    obstacle.height
  );
};

/**
 * Check if player is out of bounds
 * @param {Object} player - Player object
 * @param {number} gameHeight - Height of game area
 * @returns {boolean} True if player is out of bounds
 */
export const isPlayerOutOfBounds = (player, gameHeight) => {
  return player.y > gameHeight || player.y + player.height < 0;
};

/**
 * Calculate bounce angle based on collision point
 * @param {number} playerCenter - Center x of player
 * @param {number} platformLeft - Left edge of platform
 * @param {number} platformWidth - Width of platform
 * @returns {number} Bounce direction (-1 for left, 0 for none, 1 for right)
 */
export const calculateBounceDirection = (playerCenter, platformLeft, platformWidth) => {
  const platformCenter = platformLeft + platformWidth / 2;
  const platformRight = platformLeft + platformWidth;

  if (playerCenter < platformLeft + platformWidth * 0.3) {
    return -1; // Bounce left
  } else if (playerCenter > platformRight - platformWidth * 0.3) {
    return 1; // Bounce right
  }
  return 0; // No horizontal bounce
};

// Game constants for SkyHop gameplay
export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 800;

// Player constants
export const PLAYER_SIZE = 40;
export const PLAYER_START_X = GAME_WIDTH / 2 - PLAYER_SIZE / 2;
export const PLAYER_START_Y = GAME_HEIGHT - 100;
export const GRAVITY = 0.5;
export const JUMP_POWER = -12;
export const MAX_FALL_SPEED = 15;

// Obstacle constants
export const OBSTACLE_WIDTH = 80;
export const OBSTACLE_HEIGHT = 20;
export const OBSTACLE_MIN_GAP = 80;
export const OBSTACLE_MAX_GAP = 140;
export const OBSTACLE_BASE_SPEED = 3;
export const MAX_OBSTACLE_SPEED = 8;

// Difficulty scaling
export const SCORE_THRESHOLD_FOR_DIFFICULTY = 500;
export const DIFFICULTY_INCREMENT = 0.2;

// Platform movement
export const PLATFORM_MOVE_SPEED = 5;
export const PLATFORM_MOVE_RANGE = 60;

// Particle effects
export const PARTICLE_COUNT = 8;
export const PARTICLE_LIFE = 600; // ms
export const PARTICLE_SPEED = 8;

// Audio constants
export const SOUND_VOLUME = 0.5;
export const MUSIC_VOLUME = 0.3;

// UI constants
export const ANIMATION_DURATION = 0.3;
export const MOBILE_BREAKPOINT = 768;

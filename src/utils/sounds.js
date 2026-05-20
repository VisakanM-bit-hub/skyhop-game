import { Howl } from 'howler';
import { getSettings } from './storage';

// Sound FX using Howler.js with Web Audio fallback
class SoundManager {
  constructor() {
    this.sounds = {};
    this.initializeSounds();
  }

  initializeSounds() {
    // Jump sound - short beep
    this.sounds.jump = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj=='],
      volume: 0.5,
      preload: true,
    });

    // Collision sound
    this.sounds.collision = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg=='],
      volume: 0.6,
      preload: true,
    });

    // Score increment sound
    this.sounds.score = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg=='],
      volume: 0.4,
      preload: true,
    });

    // Game over sound
    this.sounds.gameOver = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg=='],
      volume: 0.7,
      preload: true,
    });

    // High score sound
    this.sounds.highScore = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg=='],
      volume: 0.5,
      preload: true,
    });
  }

  play(soundName) {
    try {
      const settings = getSettings();
      if (!settings.soundEnabled) return;

      if (this.sounds[soundName]) {
        this.sounds[soundName].play();
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}:`, error);
    }
  }

  stop(soundName) {
    try {
      if (this.sounds[soundName]) {
        this.sounds[soundName].stop();
      }
    } catch (error) {
      console.warn(`Error stopping sound ${soundName}:`, error);
    }
  }

  stopAll() {
    try {
      Object.values(this.sounds).forEach((sound) => {
        sound.stop();
      });
    } catch (error) {
      console.warn('Error stopping all sounds:', error);
    }
  }

  setVolume(soundName, volume) {
    try {
      if (this.sounds[soundName]) {
        this.sounds[soundName].volume(Math.max(0, Math.min(1, volume)));
      }
    } catch (error) {
      console.warn(`Error setting volume for ${soundName}:`, error);
    }
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Convenience methods
export const playSound = (soundName) => soundManager.play(soundName);
export const stopSound = (soundName) => soundManager.stop(soundName);
export const stopAllSounds = () => soundManager.stopAll();

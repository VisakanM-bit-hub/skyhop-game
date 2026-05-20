// LocalStorage management for game high scores and settings

const STORAGE_KEYS = {
  HIGH_SCORE: 'skyhop_high_score',
  BEST_TIME: 'skyhop_best_time',
  SETTINGS: 'skyhop_settings',
};

// High Score Management
export const getHighScore = () => {
  try {
    const score = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.error('Error reading high score:', error);
    return 0;
  }
};

export const setHighScore = (score) => {
  try {
    const currentHighScore = getHighScore();
    if (score > currentHighScore) {
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
};

// Best Time Management
export const getBestTime = () => {
  try {
    const time = localStorage.getItem(STORAGE_KEYS.BEST_TIME);
    return time ? parseInt(time, 10) : 0;
  } catch (error) {
    console.error('Error reading best time:', error);
    return 0;
  }
};

export const setBestTime = (time) => {
  try {
    const currentBestTime = getBestTime();
    if (time > currentBestTime) {
      localStorage.setItem(STORAGE_KEYS.BEST_TIME, time.toString());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving best time:', error);
    return false;
  }
};

// Settings Management
export const getSettings = () => {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings
      ? JSON.parse(settings)
      : {
          soundEnabled: true,
          musicEnabled: true,
          haptics: true,
        };
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
      soundEnabled: true,
      musicEnabled: true,
      haptics: true,
    };
  }
};

export const updateSettings = (newSettings) => {
  try {
    const currentSettings = getSettings();
    const updated = { ...currentSettings, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving settings:', error);
    return null;
  }
};

// Clear all game data
export const clearGameData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HIGH_SCORE);
    localStorage.removeItem(STORAGE_KEYS.BEST_TIME);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    return true;
  } catch (error) {
    console.error('Error clearing game data:', error);
    return false;
  }
};

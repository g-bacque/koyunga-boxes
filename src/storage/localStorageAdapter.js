export const localStorageAdapter = {
  get(key, fallbackValue) {
    try {
      const storedValue = localStorage.getItem(key);

      if (!storedValue) {
        return fallbackValue;
      }

      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return fallbackValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },
};
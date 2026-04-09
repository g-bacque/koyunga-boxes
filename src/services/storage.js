export const STORAGE_KEYS = {
  materials: "koyunga_materials",
  clients: "koyunga_clients",
  assignments: "koyunga_assignments",
};

export function getStoredData(key, fallbackData) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallbackData;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallbackData;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}
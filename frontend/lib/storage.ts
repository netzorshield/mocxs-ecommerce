// Safe localStorage wrapper for Next.js SSR compatibility

export const getLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cart updates
    if (key === 'cart') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.removeItem(key);
    if (key === 'cart') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};


import { Keys } from '../types/cache';

export const get = <T>(key: Keys, fallback: T): T => {
  const value = localStorage.getItem(key);
  try {
    if (value === null) {
      return fallback;
    }
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const set = <T>(key: Keys, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: Keys) => {
  localStorage.removeItem(key);
};

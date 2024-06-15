import { useState } from 'react';

export function useLocalStorage<T>(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

  // eslint-disable-next-line no-unused-vars
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue as T) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

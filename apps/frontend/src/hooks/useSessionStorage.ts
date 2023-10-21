import { useState } from "react";

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const storedValue =
    typeof window !== "undefined" ? window.sessionStorage.getItem(key) : null;
  const initial: T = storedValue ? JSON.parse(storedValue) : initialValue;

  // State to store our value
  const [value, setValue] = useState<T>(initial);

  // Return a wrapped version of useState's setter function that ...
  // ... also persists new values to sessionStorage.
  const setStoredValue = (newValue: T) => {
    setValue(newValue);

    // Save to sessionStorage
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue] as const;
};

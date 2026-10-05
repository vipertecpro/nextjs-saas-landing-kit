"use client";

import { useCallback, useSyncExternalStore } from "react";

const changeEvent = "stored-value-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * A string kept in the visitor's browser (localStorage), shared by every
 * component that reads the same key. It is null on the server and when
 * storage is blocked, so always render something sensible for null.
 */
export function useStoredValue(key: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const setValue = useCallback(
    (next: string | null) => {
      try {
        if (next === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, next);
        }
      } catch {
        // Storage can be blocked (private windows); the change just won't be remembered.
      }

      window.dispatchEvent(new Event(changeEvent));
    },
    [key],
  );

  return [value, setValue];
}

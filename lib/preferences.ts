"use client";

import { useSyncExternalStore } from "react";

const eventName = "kitty-preferences";
const fallback = new Map<string, string>();
function read(key: string, initial: string) {
  const pending = fallback.get(key);
  if (pending !== undefined) return pending;
  try {
    return window.localStorage.getItem(key) ?? initial;
  } catch {
    return initial;
  }
}
function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    try {
      if (event.storageArea !== window.localStorage) return;
    } catch {
      return;
    }
    if (event.key === null) fallback.clear();
    else fallback.delete(event.key);
    callback();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(eventName, callback);
  };
}
export function savePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
    fallback.delete(key);
  } catch {
    /* Private browsing still keeps this session usable. */
    fallback.set(key, value);
  }
  window.dispatchEvent(new Event(eventName));
}
export function usePreference(key: string, initial: string) {
  return useSyncExternalStore(
    subscribe,
    () => read(key, initial),
    () => initial,
  );
}
export function useFavorites() {
  const raw = usePreference("kitty-favorites", "[]");
  let favorites: string[] = [];
  try {
    const data: unknown = JSON.parse(raw);
    if (Array.isArray(data))
      favorites = data.filter((item): item is string => typeof item === "string");
  } catch {
    /* Ignore invalid browser storage. */
  }
  function toggle(slug: string) {
    savePreference(
      "kitty-favorites",
      JSON.stringify(
        favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug],
      ),
    );
  }
  return { favorites, toggle };
}

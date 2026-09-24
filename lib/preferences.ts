"use client";

import { useSyncExternalStore } from "react";

const eventName = "kitty-preferences";
const fallback = new Map<string, string>();
function read(key: string, initial: string) {
  try {
    return window.localStorage.getItem(key) ?? fallback.get(key) ?? initial;
  } catch {
    return fallback.get(key) ?? initial;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
}
export function savePreference(key: string, value: string) {
  fallback.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Private browsing still keeps this session usable. */
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

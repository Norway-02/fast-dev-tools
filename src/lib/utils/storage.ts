/**
 * Local Storage Utilities for Recent Tools and Favorites.
 * All data stays 100% local in the user's browser.
 */

const RECENT_TOOLS_KEY = 'fdt_recent_tools';
const FAVORITES_KEY = 'fdt_favorite_tools';

export function getRecentTools(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentTool(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getRecentTools().filter((s) => s !== slug);
    const updated = [slug, ...existing].slice(0, 6); // Keep last 6 recent tools
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
  } catch {
    // Storage fail safe
  }
}

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getFavorites();
    let updated: string[];
    let isFav: boolean;

    if (existing.includes(slug)) {
      updated = existing.filter((s) => s !== slug);
      isFav = false;
    } else {
      updated = [...existing, slug];
      isFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return isFav;
  } catch {
    return false;
  }
}

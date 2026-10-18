import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { site } from '../content/site';
import type { PaletteId } from '../content/types';
import { isPalette } from './palettes';

export type Theme = 'light' | 'dark';
type Origin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  palette: PaletteId;
  setTheme: (next: Theme, origin?: Origin) => void;
  toggle: (origin?: Origin) => void;
  setPalette: (next: PaletteId, origin?: Origin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// index.html has already applied both before first paint; start from what it chose.
const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
const readPalette = (): PaletteId => {
  const p = document.documentElement.dataset.palette;
  return isPalette(p) ? p : site.appearance.palette;
};

const remember = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode): the choice just won't persist.
  }
};

/** Applies a colour change, with a circle wipe from `origin` where supported (see base.css). */
function withWipe(apply: () => void, origin?: Origin) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('startViewTransition' in document) || reduce) {
    apply();
    return;
  }
  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${r}px`);
  document.startViewTransition(apply);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);
  const [palette, setPaletteState] = useState<PaletteId>(readPalette);

  // Browser UI colour (mobile address bar) follows whatever --bg resolves to.
  useEffect(() => {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    if (bg) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  }, [theme, palette]);

  const setTheme = useCallback((next: Theme, origin?: Origin) => {
    remember('theme-pref', next);
    withWipe(() => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setThemeState(next));
    }, origin);
  }, []);

  const setPalette = useCallback((next: PaletteId, origin?: Origin) => {
    remember('palette-pref', next);
    withWipe(() => {
      document.documentElement.dataset.palette = next;
      flushSync(() => setPaletteState(next));
    }, origin);
  }, []);

  const toggle = useCallback(
    (origin?: Origin) => setTheme(theme === 'dark' ? 'light' : 'dark', origin),
    [theme, setTheme],
  );

  const value = useMemo(
    () => ({ theme, palette, setTheme, toggle, setPalette }),
    [theme, palette, setTheme, toggle, setPalette],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

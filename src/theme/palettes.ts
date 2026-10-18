import type { PaletteId } from '../content/types';

type Palette = {
  id: PaletteId;
  name: string;
  note: string;
  /** Swatch colours for the picker — the real values live in styles/tokens.css. */
  accent: string;
  dark: string;
  light: string;
};

export const PALETTES: Palette[] = [
  { id: 'lime', name: 'Lime', note: 'Electric lime on ink', accent: '#c0eb3a', dark: '#050711', light: '#f7f7f7' },
  { id: 'paper', name: 'Paper', note: 'Warm cream & amber', accent: '#f3b44a', dark: '#13120d', light: '#fffcf0' },
  { id: 'ocean', name: 'Ocean', note: 'Sky blue on navy', accent: '#6cb8ff', dark: '#040a16', light: '#f4f7fb' },
  { id: 'violet', name: 'Violet', note: 'Lavender & pink', accent: '#b69cff', dark: '#08060f', light: '#f7f6fb' },
  { id: 'coral', name: 'Coral', note: 'Sunset coral & gold', accent: '#ff7a59', dark: '#0c0807', light: '#fbf8f5' },
  { id: 'mint', name: 'Mint', note: 'Fresh mint & peach', accent: '#5eead4', dark: '#030d0c', light: '#f4f9f8' },
  { id: 'mono', name: 'Mono', note: 'Black & white only', accent: '#efede2', dark: '#050711', light: '#f7f7f7' },
];

export const isPalette = (value: unknown): value is PaletteId => PALETTES.some((p) => p.id === value);

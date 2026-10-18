import type { CSSProperties } from 'react';

/** Typed escape hatch for passing CSS custom properties through `style`. */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;

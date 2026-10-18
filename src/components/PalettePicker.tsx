import { useEffect, useRef, useState } from 'react';
import { cssVars } from '../lib/css';
import { useTheme } from '../theme/ThemeProvider';
import { PALETTES } from '../theme/palettes';
import './PalettePicker.css';

/** A swatch button that opens a list of colour palettes. */
export default function PalettePicker() {
  const { palette, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="pp" ref={rootRef}>
      <button
        type="button"
        className="pp-btn"
        aria-expanded={open}
        aria-controls="palette-menu"
        aria-label={`Colour palette: ${current.name}`}
        title="Change colours"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pp-dot" />
      </button>

      <div id="palette-menu" className={`pp-menu${open ? ' is-open' : ''}`} inert={!open}>
        <p className="eyebrow pp-head">Colour palette</p>
        <ul>
          {PALETTES.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`pp-opt${p.id === palette ? ' is-on' : ''}`}
                aria-pressed={p.id === palette}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setPalette(p.id, { x: r.left + 22, y: r.top + r.height / 2 });
                }}
              >
                <span
                  className="pp-swatch"
                  style={cssVars({ '--a': p.accent, '--d': p.dark, '--l': p.light })}
                  aria-hidden="true"
                />
                <span className="pp-text">
                  <span className="pp-name">{p.name}</span>
                  <span className="pp-note">{p.note}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

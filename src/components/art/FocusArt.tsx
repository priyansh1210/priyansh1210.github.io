import type { FocusArea } from '../../content/types';
import { useInView } from '../../hooks/useInView';
import { cssVars } from '../../lib/css';
import './FocusArt.css';

/** The animated illustration for a focus card. Loops only while on screen. */
export default function FocusArt({ art }: { art: FocusArea['art'] }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.2, rootMargin: '0px' });
  return (
    <div ref={ref} className="art" data-in={inView} aria-hidden="true">
      {art === 'artboard' && <Artboard />}
      {art === 'orbit' && <Orbit />}
      {art === 'stack' && <Stack />}
    </div>
  );
}

/* An artboard assembling itself while a cursor works on it. */
function Artboard() {
  const blocks = [
    { cls: 'ab-ink', x: 56, y: 60, w: 92, h: 12, dx: -30, dy: -12 },
    { cls: 'ab-soft', x: 56, y: 80, w: 128, h: 6, dx: -24, dy: 0 },
    { cls: 'ab-soft', x: 56, y: 92, w: 100, h: 6, dx: -24, dy: 0 },
    { cls: 'ab-accent', x: 56, y: 108, w: 62, h: 20, dx: 0, dy: 22 },
    { cls: 'ab-img', x: 196, y: 60, w: 68, h: 68, dx: 30, dy: -16 },
    { cls: 'ab-card', x: 56, y: 140, w: 96, h: 24, dx: -10, dy: 24 },
    { cls: 'ab-card', x: 162, y: 140, w: 102, h: 24, dx: 10, dy: 24 },
  ];
  return (
    <svg viewBox="0 0 320 200">
      <rect className="ab-frame" x="40" y="22" width="240" height="156" rx="12" />
      <line className="ab-rule" x1="40" y1="44" x2="280" y2="44" />
      {[54, 64, 74].map((cx) => (
        <circle key={cx} className="ab-dot" cx={cx} cy="33" r="3" />
      ))}
      {blocks.map((b, i) => (
        <rect
          key={i}
          className={`ab-b ${b.cls}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={b.cls === 'ab-accent' ? 10 : b.cls === 'ab-img' ? 8 : 3}
          style={cssVars({ '--i': i, '--dx': `${b.dx}px`, '--dy': `${b.dy}px` })}
        />
      ))}
      <path className="ab-cursor" d="M0 0v17l4.6-4.2 3.6 7.6 2.8-1.3-3.6-7.4H14z" />
    </svg>
  );
}

/* A ring of stations with a pulse going round, lighting each as it passes. */
function Orbit() {
  const stations = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: 160 + 66 * Math.cos(a), y: 100 + 66 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 320 200">
      <circle className="orb-ring" cx="160" cy="100" r="66" />
      <circle className="orb-ring orb-ring--inner" cx="160" cy="100" r="40" />
      {stations.map((s, i) => (
        <circle key={i} className="orb-st" cx={s.x} cy={s.y} r="9" style={cssVars({ '--i': i })} />
      ))}
      <g className="orb-pulse">
        <circle className="orb-pulse-glow" cx="160" cy="34" r="13" />
        <circle className="orb-pulse-dot" cx="160" cy="34" r="5" />
      </g>
      <g className="orb-core">
        <circle cx="160" cy="100" r="22" />
        <path d="M160 88c1.5 8 4 10.5 12 12-8 1.5-10.5 4-12 12-1.5-8-4-10.5-12-12 8-1.5 10.5-4 12-12Z" />
      </g>
    </svg>
  );
}

/* Tokens dropping onto a stack that sinks a slot each time, the oldest leaving at the bottom. */
function Stack() {
  const chips = [
    { sw: 'var(--accent)', w: 56 },
    { sw: 'var(--warm)', w: 44 },
    { sw: 'var(--ink)', w: 64 },
    { sw: 'var(--ink-3)', w: 38 },
    { sw: 'hsl(222 70% 60%)', w: 50 },
  ];
  return (
    <svg viewBox="0 0 320 200">
      <line className="st-base" x1="76" y1="177" x2="244" y2="177" />
      {chips.map((c, i) => (
        <g key={i} className="st-chip" style={cssVars({ '--i': i })}>
          <rect className="st-pill" x="96" y="46" width="128" height="22" rx="11" />
          <circle cx="110" cy="57" r="6" style={{ fill: c.sw }} />
          <rect className="st-label" x="122" y="54" width={c.w} height="6" rx="3" />
        </g>
      ))}
    </svg>
  );
}

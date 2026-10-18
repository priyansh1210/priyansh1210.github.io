import { useId, type ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { cssVars } from '../../lib/css';
import Cat from './Cat';
import './StreetScene.css';

/* Each layer is a 1200×240 strip drawn three times side by side and slid left
   by one strip per loop, so it tiles forever. Slower layers read as further away. */
const W = 1200;
const H = 240;
const GROUND = 216;

// [x, width, height] — the skyline ends before x=1200 so the seam is invisible.
const BUILDINGS: [number, number, number][] = [
  [0, 70, 96],
  [78, 54, 140],
  [140, 90, 72],
  [240, 60, 168],
  [308, 84, 110],
  [400, 46, 150],
  [454, 100, 84],
  [562, 64, 190],
  [634, 80, 120],
  [722, 56, 92],
  [786, 92, 156],
  [886, 60, 104],
  [954, 78, 176],
  [1040, 50, 88],
  [1098, 96, 132],
];

const WINDOWS = BUILDINGS.flatMap(([x, w, h], b) => {
  const cols = Math.floor((w - 12) / 14);
  const rows = Math.floor((h - 26) / 20);
  const out: { x: number; y: number; lit: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push({ x: x + 10 + c * 14, y: GROUND - h + 14 + r * 20, lit: (r * 3 + c * 5 + b) % 7 === 0 });
    }
  }
  return out;
});

function Skyline() {
  return (
    <svg className="scene-svg" viewBox={`0 0 ${W} ${H}`}>
      <g className="sc-clouds">
        <g>
          <circle cx="210" cy="58" r="16" />
          <circle cx="234" cy="48" r="21" />
          <circle cx="258" cy="60" r="13" />
          <rect x="194" y="58" width="78" height="16" rx="8" />
        </g>
        <g>
          <circle cx="820" cy="38" r="12" />
          <circle cx="838" cy="30" r="16" />
          <circle cx="856" cy="40" r="10" />
          <rect x="808" y="38" width="58" height="12" rx="6" />
        </g>
      </g>
      {BUILDINGS.map(([x, w, h]) => (
        <rect key={x} className="sc-building" x={x} y={GROUND - h} width={w} height={h} />
      ))}
      {WINDOWS.map((win) => (
        <rect
          key={`${win.x}-${win.y}`}
          className={`sc-win${win.lit ? ' is-lit' : ''}`}
          x={win.x}
          y={win.y}
          width="5"
          height="8"
          rx="1"
        />
      ))}
    </svg>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g>
      <circle className="sc-glow" cx={x + 18} cy="112" r="34" />
      <circle className="sc-glow" cx={x + 18} cy="112" r="16" />
      <path className="sc-stroke" d={`M${x} ${GROUND}V108q0-12 14-12h6`} />
      <rect className="sc-lamp" x={x + 10} y="96" width="18" height="7" rx="3.5" />
    </g>
  );
}

type Circle = [cx: number, cy: number, r: number];
type Rect = [x: number, y: number, w: number, h: number];

const frac = (n: number) => n - Math.floor(n);
const f1 = (n: number) => n.toFixed(1);

/** Little curved leaf strokes scattered through each clump. Placement is a
 *  fixed golden-angle spiral, so every tree looks the same on every visit. */
function leafMarks(circles: Circle[]) {
  let d = '';
  circles.forEach(([cx, cy, r], i) => {
    const count = Math.max(2, Math.round(r / 6));
    const s = Math.max(2.5, r * 0.11);
    for (let k = 0; k < count; k++) {
      const a = k * 2.39996 + i * 1.3;
      const rho = r * (0.2 + 0.5 * frac((k + 1) * 0.618 + i * 0.37));
      const x = cx + rho * Math.cos(a);
      const y = cy + rho * Math.sin(a);
      d += `M${f1(x - s)} ${f1(y - s * 0.3)}q${f1(s)} ${f1(s)} ${f1(2 * s)} 0`;
    }
  });
  return d;
}

/** A short light arc near the top-left of each clump, where the light hits. */
function leafGlints(circles: Circle[]) {
  return circles
    .filter(([, , r]) => r >= 12)
    .map(([cx, cy, r]) => {
      const R = r * 0.62;
      const at = (deg: number) => [cx + R * Math.cos((deg * Math.PI) / 180), cy + R * Math.sin((deg * Math.PI) / 180)];
      const [x1, y1] = at(200);
      const [x2, y2] = at(245);
      return `M${f1(x1)} ${f1(y1)}A${f1(R)} ${f1(R)} 0 0 1 ${f1(x2)} ${f1(y2)}`;
    })
    .join('');
}

/** Overlapping circles drawn as one leafy shape. A wide outline pass goes
 *  underneath, then a fill-only pass on top hides every inner arc, so only the
 *  outer edge shows. `base` is an optional strip hidden inside the circles that
 *  fills the dips between them along the bottom, giving a bush a flat foot.
 *  Texture (a soft shaded crescent, leaf marks, highlights) is clipped to the
 *  shape, so the outer outline stays clean. */
function Foliage({ circles, base }: { circles: Circle[]; base?: Rect }) {
  const clip = `leaf-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const shapes = () => [
    ...circles.map(([cx, cy, r]) => <circle key={`c-${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />),
    ...(base ? [<rect key="base" x={base[0]} y={base[1]} width={base[2]} height={base[3]} />] : []),
  ];
  return (
    <g className="sc-leaf">
      <defs>
        <clipPath id={clip}>{shapes()}</clipPath>
      </defs>
      <g className="sc-leaf-edge">{shapes()}</g>
      <g className="sc-leaf-shade">{shapes()}</g>
      <g clipPath={`url(#${clip})`}>
        {/* The lit body, nudged up-left: what's left uncovered is the shade. */}
        <g className="sc-leaf-body">
          {circles.map(([cx, cy, r]) => (
            <circle key={`b-${cx}-${cy}-${r}`} cx={cx - r * 0.1} cy={cy - r * 0.16} r={r * 0.94} />
          ))}
        </g>
        <path className="sc-leaf-marks" d={leafMarks(circles)} />
        <path className="sc-leaf-glints" d={leafGlints(circles)} />
      </g>
    </g>
  );
}

function Tree({ x, scale = 1 }: { x: number; scale?: number }) {
  const s = (n: number) => n * scale;
  return (
    <g>
      <rect className="sc-trunk" x={x - 4} y={GROUND - s(48)} width="8" height={s(48)} rx="3" />
      <Foliage
        circles={[
          [x, GROUND - s(70), s(30)],
          [x - s(18), GROUND - s(56), s(18)],
          [x + s(19), GROUND - s(58), s(20)],
        ]}
      />
    </g>
  );
}

function StreetProps() {
  // Everything here stands on the road: clip it to stop just above the road
  // line (2px stroke centred on GROUND), so bushes sit flat on it, never across it.
  const clip = `street-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className="scene-svg" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <clipPath id={clip}>
          <rect x="0" y="0" width={W} height={GROUND - 1} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <Lamp x={70} />
        <Tree x={300} />
        <g>
          <rect className="sc-fill" x="440" y="176" width="64" height="6" rx="3" />
          <rect className="sc-fill" x="440" y="190" width="64" height="6" rx="3" />
          <path className="sc-stroke" d={`M448 196V${GROUND}M496 196V${GROUND}`} />
        </g>
        <Lamp x={640} />
        <Foliage
          circles={[
            [770, 202, 16],
            [792, 198, 20],
            [814, 204, 13],
          ]}
          base={[762, 204, 58, GROUND - 204]}
        />
        <Tree x={940} scale={1.25} />
        <g>
          <path className="sc-stroke" d={`M1110 ${GROUND}V142`} />
          <circle className="sc-sign" cx="1110" cy="134" r="12" />
        </g>
      </g>
    </svg>
  );
}

function Ground() {
  const tiles = Array.from({ length: W / 48 }, (_, i) => i * 48);
  return (
    <svg className="scene-svg" viewBox={`0 0 ${W} ${H}`}>
      <line className="sc-ground" x1="0" y1={GROUND} x2={W} y2={GROUND} />
      {tiles.map((x) => (
        <line key={x} className="sc-tile" x1={x + 8} y1={GROUND + 9} x2={x + 26} y2={GROUND + 9} />
      ))}
    </svg>
  );
}

function Layer({ name, speed, children }: { name: string; speed: string; children: ReactNode }) {
  return (
    <div className={`scene-layer scene-layer--${name}`} style={cssVars({ '--speed': speed })}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="scene-strip">
          {children}
        </div>
      ))}
    </div>
  );
}

/** A street the cat gallops along. Animation pauses while it's off screen.
 *  Everything standing on the pavement (lamps, trees, benches) moves with the
 *  ground at one speed, matched to the cat's stride so its paws don't slide:
 *  in the run frames a planted paw moves ~69.4px per frame (277px-tall frames)
 *  at 16 frames/s (Cat.css --cat-run-cycle), with the cat 26% of the scene tall
 *  (.scene-cat) and each ground strip 5× the scene's height wide
 *  → 5 × 277 / (69.4 × 16 × 0.26) ≈ 4.8s per strip. Change the cat's size or
 *  frame rate and this must change with it.
 *  The distant skyline drifts ~2.4× slower, for depth. */
const STREET_SPEED = '4.8s';
const SKYLINE_SPEED = '11.6s';

export default function StreetScene({ mode = 'run' }: { mode?: 'run' | 'idle' }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0, rootMargin: '0px' });
  return (
    <div ref={ref} className={`scene scene--${mode}`} data-in={inView} aria-hidden="true">
      <span className="scene-orb" />
      <Layer name="far" speed={SKYLINE_SPEED}>
        <Skyline />
      </Layer>
      <Layer name="mid" speed={STREET_SPEED}>
        <StreetProps />
      </Layer>
      <Layer name="ground" speed={STREET_SPEED}>
        <Ground />
      </Layer>
      <div className="scene-cat">
        <Cat mode={mode} />
      </div>
    </div>
  );
}

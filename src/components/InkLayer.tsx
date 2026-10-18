import { useEffect, useRef, useState } from 'react';
import './InkLayer.css';

type Point = [number, number];

const INTERACTIVE = 'a, button, input, textarea, select, label, [data-no-ink]';
const MAX_STROKES = 60;

/** Smooths raw pointer samples into quadratic curves through their midpoints. */
function toPath(points: Point[]) {
  const [x0, y0] = points[0];
  let d = `M${x0} ${y0}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += `Q${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d}L${lx} ${ly}`;
}

/**
 * Lets visitors doodle on the element that contains it (mouse and pen only, so
 * touch still scrolls). Clicks on links and buttons pass straight through.
 * Double-click clears the drawing.
 */
export default function InkLayer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<string[]>([]);
  const [live, setLive] = useState<string | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;

    let points: Point[] = [];
    let drawing = false;
    let raf = 0;
    let originX = 0;
    let originY = 0;

    const flush = () => {
      raf = 0;
      setLive(toPath(points));
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      if ((e.target as Element).closest(INTERACTIVE)) return;
      e.preventDefault(); // no text selection while drawing
      const rect = host.getBoundingClientRect();
      originX = rect.left;
      originY = rect.top;
      points = [[e.clientX - originX, e.clientY - originY]];
      drawing = true;
      host.setPointerCapture(e.pointerId);
      host.classList.add('is-inking');
    };

    const onMove = (e: PointerEvent) => {
      if (!drawing) return;
      const p: Point = [e.clientX - originX, e.clientY - originY];
      const [lx, ly] = points[points.length - 1];
      if (Math.hypot(p[0] - lx, p[1] - ly) < 2) return;
      points.push(p);
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onUp = () => {
      if (!drawing) return;
      drawing = false;
      host.classList.remove('is-inking');
      cancelAnimationFrame(raf);
      raf = 0;
      if (points.length > 1) {
        const d = toPath(points);
        setStrokes((s) => [...s.slice(-(MAX_STROKES - 1)), d]);
      }
      setLive(null);
      points = [];
    };

    const onDoubleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) return;
      setStrokes([]);
    };

    host.addEventListener('pointerdown', onDown);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerup', onUp);
    host.addEventListener('pointercancel', onUp);
    host.addEventListener('dblclick', onDoubleClick);
    return () => {
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp);
      host.removeEventListener('pointercancel', onUp);
      host.removeEventListener('dblclick', onDoubleClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} className="ink" aria-hidden="true">
        {strokes.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {live && <path d={live} />}
      </svg>
      <p className="ink-hint mono" aria-hidden="true">
        {strokes.length ? 'Double-click to clear' : '✎ Draw anywhere'}
      </p>
    </>
  );
}

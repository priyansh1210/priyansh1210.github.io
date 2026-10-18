import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const NUMBER = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/;
const DURATION = 1400;

/** Counts up to a value like "150+", "1,000+", "$0.02" or "Top 50" when it scrolls into view. */
export default function Counter({ value }: { value: string }) {
  const match = NUMBER.exec(value);
  const digits = match?.[2] ?? '';
  const target = match ? parseFloat(digits.replace(/,/g, '')) : 0;
  const decimals = digits.split('.')[1]?.length ?? 0;
  const format = (n: number) =>
    digits.includes(',')
      ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals);
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || !target) return;
    if (reduced) {
      setCurrent(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCurrent(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="counter">
      <span className="visually-hidden">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {format(current)}
        {match[3]}
      </span>
    </span>
  );
}

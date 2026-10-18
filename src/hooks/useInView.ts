import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Stop watching after the first time the element appears. */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInView<T extends Element>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView] as const;
}

import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { cssVars } from '../lib/css';

type RevealProps = {
  children: ReactNode;
  /** Milliseconds to wait after the element scrolls into view. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
  id?: string;
};

/** Fades and lifts its content in the first time it scrolls into view (styles in base.css). */
export default function Reveal({ children, delay = 0, className, as = 'div', id }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      data-in={inView}
      style={delay ? cssVars({ '--delay': `${delay}ms` }) : undefined}
    >
      {children}
    </Tag>
  );
}

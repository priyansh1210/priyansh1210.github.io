import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { site } from '../content/site';
import { useCopyEmail } from '../hooks/useCopyEmail';
import { useLocalTime } from '../hooks/useLocalTime';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cssVars } from '../lib/css';
import StreetScene from './art/StreetScene';
import InkLayer from './InkLayer';
import { ArrowRight, CheckIcon, CopyIcon } from './Icons';
import './Hero.css';

/** Splits text into words that rise in one after another, starting at word `start`.
 *  The space sits outside each inline-block, where it can't collapse. */
function Words({ text, start }: { text: string; start: number }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      <span className="hw">
        <span style={cssVars({ '--i': start + i })}>{word}</span>
      </span>{' '}
    </Fragment>
  ));
}

/** Cycles through words stacked in one grid cell. The slot's width eases to fit
 *  each word in turn, so short words don't leave a gap before the next one. */
function RotatingWord({ words, index }: { words: string[]; index: number }) {
  const reduced = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setCurrent((n) => (n + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  // Measure every word, and again whenever one changes size — the web font
  // swapping in, or the viewport resizing the type.
  useLayoutEffect(() => {
    const els = wordRefs.current.filter((el): el is HTMLSpanElement => el !== null);
    const measure = () => setWidths(els.map((el) => el.offsetWidth));
    measure();
    const ro = new ResizeObserver(measure);
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [words]);

  const previous = (current - 1 + words.length) % words.length;
  const width = widths[current];
  return (
    <span className="hw">
      <span className="rot" style={cssVars(width ? { '--i': index, '--w': `${width}px` } : { '--i': index })}>
        {words.map((w, n) => (
          <span
            key={w}
            ref={(el) => {
              wordRefs.current[n] = el;
            }}
            className={`rot-word${n === current ? ' is-on' : ''}${n === previous ? ' is-off' : ''}`}
          >
            {w}
          </span>
        ))}
        <svg className="rot-line" key={current} viewBox="0 0 200 12" preserveAspectRatio="none">
          <path d="M2 8c40-6 90-7 196-2" />
        </svg>
      </span>
    </span>
  );
}

export default function Hero() {
  const { hero, availability, location, timeZone } = site;
  const { copied, copy } = useCopyEmail();
  const { time, zone } = useLocalTime(timeZone);
  const leadCount = hero.lead.split(' ').length;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <InkLayer />
      <div className="container hero-inner">
        <div className="hero-top">
          <p className="hero-status">
            <span className={`pulse-dot ${availability.open ? '' : 'is-off'}`} />
            {availability.label}
          </p>
          <p className="hero-meta mono">
            {location} · {time} {zone}
          </p>
        </div>

        {/* Headline left, intro and actions right — compact enough that the street
            below stays in the first screen, as on pleurat.com. */}
        <div className="hero-main">
          <h1 id="hero-title" className="hero-title">
            <span className="visually-hidden">
              {hero.lead} {hero.words[0]} {hero.tail}
            </span>
            <span aria-hidden="true">
              <Words text={hero.lead} start={0} />
              <RotatingWord words={hero.words} index={leadCount} />{' '}
              <Words text={hero.tail} start={leadCount + 1} />
            </span>
          </h1>

          <div className="hero-side">
            <p className="lead hero-intro">{hero.intro}</p>
            <div className="hero-actions">
              <Link to="/work" className="btn btn--primary">
                View selected work <ArrowRight size={16} />
              </Link>
              <button type="button" className="btn btn--ghost hero-copy" onClick={copy} aria-live="polite">
                {copied ? 'Email copied' : 'Copy email'}
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <StreetScene />
    </section>
  );
}

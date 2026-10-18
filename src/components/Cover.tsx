import type { Media } from '../content/types';
import { cssVars } from '../lib/css';
import './Cover.css';

type Props = {
  title: string;
  hue: number;
  media?: Media;
  className?: string;
  /** 'ui' draws a mock app window; 'word' just sets the title large. */
  variant?: 'ui' | 'word';
};

/** Shows the real image when `media.src` is set, otherwise tinted placeholder artwork. */
export default function Cover({ title, hue, media, className = '', variant = 'ui' }: Props) {
  if (media?.src) {
    return (
      <div className={`cover ${className}`}>
        <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div
      className={`cover cover--art ${className}`}
      style={cssVars({ '--h': hue })}
      role="img"
      aria-label={media?.alt ?? `${title} — placeholder artwork`}
    >
      <div className="cover-orb" />
      {variant === 'ui' ? (
        <div className="cover-window">
          <div className="cover-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="cover-body">
            <div className="cover-side">
              <b />
              <b />
              <b />
              <b />
              <b />
            </div>
            <div className="cover-main">
              <span className="cover-title">{title}</span>
              <b className="cover-line" />
              <b className="cover-line cover-line--short" />
              <div className="cover-tiles">
                <b />
                <b />
                <b />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span className="cover-word">{title}</span>
      )}
    </div>
  );
}

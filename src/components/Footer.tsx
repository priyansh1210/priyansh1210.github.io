import { Link } from 'react-router';
import { site } from '../content/site';
import { useLocalTime } from '../hooks/useLocalTime';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cssVars } from '../lib/css';
import { ArrowUp, ArrowUpRight } from './Icons';
import './Footer.css';

export default function Footer() {
  const { time, zone } = useLocalTime(site.timeZone);
  const reduced = usePrefersReducedMotion();
  const pages = [{ label: 'Home', to: '/' }, ...site.nav, { label: 'Contact', to: '/contact' }];

  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr-grid">
          <div className="ftr-intro">
            <p className="ftr-title">{site.name}</p>
            <p className="muted">
              {site.role}
              <br />
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Pages</p>
            <ul className="ftr-list">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="tlink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="ftr-list">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="ftr-ext">
                    <span className="tlink">{s.label}</span> <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <ul className="ftr-list">
              <li>
                <a href={`mailto:${site.email}`} className="tlink">
                  {site.email}
                </a>
              </li>
              <li className="muted mono ftr-time">
                {time} {zone} · {site.location}
              </li>
            </ul>
          </div>
        </div>

        <p className="ftr-word" aria-hidden="true" style={cssVars({ '--chars': site.name.length })}>
          {site.name}
        </p>

        <div className="ftr-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <button
            type="button"
            className="ftr-top"
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

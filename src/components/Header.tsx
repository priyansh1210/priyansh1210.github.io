import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { site } from '../content/site';
import { useLocalTime } from '../hooks/useLocalTime';
import { cssVars } from '../lib/css';
import PalettePicker from './PalettePicker';
import ThemeToggle from './ThemeToggle';
import { ArrowUpRight } from './Icons';
import './Header.css';

export default function Header() {
  const { pathname } = useLocation();
  const { time, zone } = useLocalTime(site.timeZone);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Solid background once scrolled; slide away on scroll down, back on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 8);
        if (Math.abs(y - lastY) > 6) {
          setHidden(y > lastY && y > 240);
          lastY = y;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  const menuLinks = [{ label: 'Home', to: '/' }, ...site.nav, { label: 'Contact', to: '/contact' }];

  return (
    <header
      className={['hdr', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container hdr-inner">
        <Link to="/" className="hdr-brand" aria-label={`${site.name} — home`}>
          <span className="hdr-mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="hdr-name">{site.name}</span>
        </Link>

        <nav className="hdr-nav" aria-label="Main">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="hdr-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr-tools">
          <span className="hdr-time mono" title={`Local time in ${site.location}`}>
            {time} {zone}
          </span>
          {site.appearance.palettePicker && <PalettePicker />}
          <ThemeToggle />
          <Link to="/contact" className="btn btn--primary btn--sm hdr-cta">
            Let’s talk
          </Link>
          <button
            type="button"
            className="hdr-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <i />
            <i />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="hdr-menu" inert={!open}>
        <nav className="container hdr-menu-inner" aria-label="Mobile">
          <ul className="hdr-menu-links">
            {menuLinks.map((item, i) => (
              <li key={item.to} style={cssVars({ '--i': i })}>
                <NavLink to={item.to} end={item.to === '/'}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="hdr-menu-foot">
            <a href={`mailto:${site.email}`} className="tlink">
              {site.email}
            </a>
            <ul className="hdr-menu-socials">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label} <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

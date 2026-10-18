import { Link } from 'react-router';
import { site } from '../content/site';
import { useCopyEmail } from '../hooks/useCopyEmail';
import Reveal from './Reveal';
import { ArrowRight, ArrowUpRight, CheckIcon, CopyIcon } from './Icons';
import './ContactCta.css';

export default function ContactCta() {
  const { copied, copy } = useCopyEmail();

  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <span className="cta-ghost" aria-hidden="true">
          Hello
        </span>
        <Reveal className="cta-content">
          <p className="cta-status">
            <span className={`pulse-dot ${site.availability.open ? '' : 'is-off'}`} />
            {site.availability.label}
          </p>
          <h2 id="cta-title" className="cta-title">
            Building something hard with AI?
            <br />
            <span className="cta-title-soft">I’d love to help.</span>
          </h2>

          <div className="cta-actions">
            <button type="button" className="cta-email" onClick={copy}>
              <span className="cta-email-addr">{site.email}</span>
              <span className="cta-email-hint mono" aria-live="polite">
                {copied ? (
                  <>
                    <CheckIcon size={14} /> Copied
                  </>
                ) : (
                  <>
                    <CopyIcon size={14} /> Copy
                  </>
                )}
              </span>
            </button>
            <Link to="/contact" className="btn btn--ghost">
              Other ways to reach me <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="cta-socials">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

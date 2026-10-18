import { useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { useCopyEmail } from '../hooks/useCopyEmail';
import { useLocalTime } from '../hooks/useLocalTime';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArrowRight, ArrowUpRight, CheckIcon, CopyIcon, MailIcon } from '../components/Icons';
import PageHeader from '../components/PageHeader';
import './Contact.css';

const TOPICS = ['Full-time role', 'Internship', 'Project collaboration', 'Hackathon team', 'Something else'];

/*
 * There's no backend yet, so the form composes an email in the visitor's own
 * mail app. Swap the body of `send` for a real API call once one exists.
 */
export default function Contact() {
  usePageMeta('Contact', `Get in touch — ${site.email}. ${site.responseTime}.`);
  const { copied, copy } = useCopyEmail();
  const { time, zone } = useLocalTime(site.timeZone);
  const [topic, setTopic] = useState(TOPICS[0]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const company = String(data.get('company') ?? '').trim();
    const subject = `${topic} — from ${name}${company ? `, ${company}` : ''}`;
    const body = [
      `Name: ${name}`,
      `Email: ${data.get('email')}`,
      ...(company ? [`Company: ${company}`] : []),
      `Topic: ${topic}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk."
        intro={`Hiring for 2027, putting together a hackathon team, or building something hard with AI? Tell me a little about it — I reply ${site.responseTime.toLowerCase()}.`}
      />

      <section className="container section--tight contact">
        <form className="cform" onSubmit={send}>
          <fieldset className="cform-topics">
            <legend className="eyebrow">I’m interested in</legend>
            <div className="cform-chips">
              {TOPICS.map((t) => (
                <label key={t} className={`cform-chip${t === topic ? ' is-on' : ''}`}>
                  <input
                    type="radio"
                    name="topic"
                    value={t}
                    checked={t === topic}
                    onChange={() => setTopic(t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="cform-row">
            <label className="cfield">
              <span className="eyebrow">Your name</span>
              <input name="name" required autoComplete="name" placeholder="Jane Doe" />
            </label>
            <label className="cfield">
              <span className="eyebrow">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
            </label>
          </div>

          <label className="cfield">
            <span className="eyebrow">Company or team (optional)</span>
            <input name="company" autoComplete="organization" placeholder="Where you’re writing from" />
          </label>

          <label className="cfield">
            <span className="eyebrow">Message</span>
            <textarea name="message" required rows={6} placeholder="The role, the project or the idea — and anything I should know…" />
          </label>

          <div className="cform-foot">
            <button type="submit" className="btn btn--primary">
              Compose email <ArrowRight size={16} />
            </button>
            <p className="cform-note muted">Opens your email app with this filled in — nothing is sent from the site.</p>
          </div>
        </form>

        <aside className="contact-aside" aria-label="Other ways to reach me">
          <button type="button" className="ccard ccard--email" onClick={copy}>
            <MailIcon size={22} />
            <span className="ccard-label eyebrow">Email</span>
            <span className="ccard-value">{site.email}</span>
            <span className="ccard-hint mono" aria-live="polite">
              {copied ? (
                <>
                  <CheckIcon size={14} /> Copied
                </>
              ) : (
                <>
                  <CopyIcon size={14} /> Click to copy
                </>
              )}
            </span>
          </button>

          <div className="ccard">
            <span className="ccard-label eyebrow">Elsewhere</span>
            <ul className="ccard-links">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label} <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ccard">
            <span className="ccard-label eyebrow">Details</span>
            <dl className="ccard-details">
              <div>
                <dt>Status</dt>
                <dd>
                  <span className={`pulse-dot ${site.availability.open ? '' : 'is-off'}`} />
                  {site.availability.label}
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Local time</dt>
                <dd className="mono">
                  {time} {zone}
                </dd>
              </div>
              <div>
                <dt>Replies</dt>
                <dd>{site.responseTime}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </div>
  );
}

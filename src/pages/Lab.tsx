import { lab } from '../content/lab';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactCta from '../components/ContactCta';
import Cover from '../components/Cover';
import { ArrowUpRight } from '../components/Icons';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './Lab.css';

export default function Lab() {
  usePageMeta('Lab', 'Side projects, hackathon entries and experiments in AI, ML and backend engineering.');

  return (
    <div className="page">
      <PageHeader
        eyebrow="Lab"
        title="Side projects & experiments"
        intro="Hackathon entries, take-home challenges and experiments — the smaller builds where I try a new model, a new stack, or an idea that wouldn’t leave me alone."
      />

      <section className="container section--tight" aria-label="Projects">
        <div className="lab-grid">
          {lab.map((item, i) => (
            <Reveal as="article" key={item.name} className="lab-card" delay={(i % 2) * 100}>
              <Cover title={item.name} hue={item.hue} media={item.image} variant="word" />
              <div className="lab-body">
                <div className="lab-top">
                  <h2 className="lab-name">{item.name}</h2>
                  <span className="lab-status" data-status={item.status}>
                    {item.status}
                  </span>
                </div>
                <p className="lab-desc">{item.description}</p>
                <div className="lab-foot">
                  <ul className="lab-tags">
                    {item.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                    <li className="chip mono">{item.year}</li>
                  </ul>
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                      {item.href.includes('github.com') ? 'Code' : 'Visit'} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </div>
  );
}

import { about } from '../content/about';
import { site } from '../content/site';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactCta from '../components/ContactCta';
import Cover from '../components/Cover';
import ExperienceList from '../components/ExperienceList';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import './About.css';

export default function About() {
  usePageMeta('About', about.bio[0]);

  return (
    <div className="page">
      <header className="container about-head">
        <div className="about-intro">
          <p className="eyebrow phead-eyebrow">About</p>
          <h1 className="about-title">{about.title}</h1>
          <div className="about-bio">
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <figure className="about-portrait">
          {about.portrait?.src ? (
            <img src={about.portrait.src} alt={about.portrait.alt} />
          ) : (
            <Cover title={site.initials} hue={84} variant="word" media={{ alt: 'Portrait placeholder' }} />
          )}
          <figcaption className="mono">
            {site.name} · {site.location}
          </figcaption>
        </figure>
      </header>

      <section className="container section" aria-labelledby="skills-title">
        <SectionHead index="01" eyebrow="Skills" id="skills-title" title="What I bring to a team." />
        <div className="skills">
          {about.skills.map((g, i) => (
            <Reveal key={g.group} className="skill-group" delay={i * 80}>
              <h3 className="skill-title">{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container section--tight" aria-labelledby="principles-title">
        <SectionHead index="02" eyebrow="Principles" id="principles-title" title="How I make decisions." />
        <ol className="principles">
          {about.principles.map((p, i) => (
            <Reveal as="li" key={p.title} className="principle" delay={i * 100}>
              <span className="principle-no mono">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-body">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="about-xp-title">
        <SectionHead index="03" eyebrow="Experience" id="about-xp-title" title="Where I’ve worked." />
        <ExperienceList items={site.experience} />
      </section>

      <section className="container section--tight" aria-labelledby="now-title">
        <SectionHead index="04" eyebrow="Now" id="now-title" title="Currently." />
        <ul className="now">
          {about.currently.map(([label, value]) => (
            <li key={label}>
              <span className="eyebrow">{label}</span>
              <span className="now-value">{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </div>
  );
}

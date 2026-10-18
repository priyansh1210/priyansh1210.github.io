import { projects } from '../content/projects';
import { site } from '../content/site';
import { usePageMeta } from '../hooks/usePageMeta';
import FocusArt from '../components/art/FocusArt';
import ContactCta from '../components/ContactCta';
import Counter from '../components/Counter';
import ExperienceList from '../components/ExperienceList';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import Terminal from '../components/Terminal';
import './Home.css';

export default function Home() {
  usePageMeta();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="page">
      <Hero />
      <Marquee items={site.disciplines} />

      <section className="section container" aria-labelledby="work-title">
        <SectionHead
          index="01"
          eyebrow="Selected work"
          id="work-title"
          title="AI systems and software I’ve built, tested and shipped."
          link={{ to: '/work', label: 'Explore all work' }}
        />
        <div className="work-grid">
          {featured.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container home-focus" aria-labelledby="focus-title">
        <SectionHead
          index="02"
          eyebrow="What I do"
          id="focus-title"
          title="The model, the product, and the tests that keep both honest."
          intro="Most real projects need all three, so I’ve learned to own the whole path — from retrieval and prompts to the API, the UI and the CI pipeline."
        />
        <div className="focus-grid">
          {site.focus.map((f, i) => (
            <Reveal as="article" key={f.title} className="focus-card" delay={i * 100}>
              <FocusArt art={f.art} />
              <p className="focus-meta mono">{f.meta}</p>
              <h3 className="focus-title">{f.title}</h3>
              <p className="focus-desc">{f.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--tight container" aria-label="In numbers">
        <ul className="stats">
          {site.stats.map((s, i) => (
            <Reveal as="li" key={s.label} className="stat" delay={i * 80}>
              <span className="stat-value">
                <Counter value={s.value} />
              </span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="console-title">
        <div className="console">
          <Reveal className="console-copy">
            <p className="shead-meta">
              <span className="shead-index mono">03</span>
              <span className="eyebrow">Console</span>
            </p>
            <h2 id="console-title" className="console-title">
              Prefer the keyboard? Browse from the command line.
            </h2>
            <p className="lead">
              Type <code>ls</code> to list my projects, <code>open</code> one by name, or{' '}
              <code>theme</code> to flip the lights. It felt wrong for an engineer’s site not to have a terminal.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Terminal />
          </Reveal>
        </div>
      </section>

      <section className="section container" aria-labelledby="xp-title">
        <SectionHead
          index="04"
          eyebrow="Experience"
          id="xp-title"
          title="Where I’ve been learning and shipping."
          link={{ to: '/about', label: 'More about me' }}
        />
        <ExperienceList items={site.experience} />
      </section>

      <section className="section--tight container home-tools" aria-labelledby="tools-title">
        <SectionHead index="05" eyebrow="Toolbox" id="tools-title" title="What I reach for." />
        <Reveal>
          <ul className="tools">
            {site.tools.map((t) => (
              <li key={t.name} className={`tool${t.daily ? ' is-daily' : ''}`}>
                {t.name}
              </li>
            ))}
          </ul>
          <p className="tools-legend mono">
            <span className="pulse-dot" /> daily driver
          </p>
        </Reveal>
      </section>

      <ContactCta />
    </div>
  );
}

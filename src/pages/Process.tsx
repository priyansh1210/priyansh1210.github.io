import { process } from '../content/process';
import { site } from '../content/site';
import { usePageMeta } from '../hooks/usePageMeta';
import FocusArt from '../components/art/FocusArt';
import ContactCta from '../components/ContactCta';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import './Process.css';

export default function Process() {
  usePageMeta('Process', process.intro);

  return (
    <div className="page">
      <PageHeader eyebrow="Process" title={process.title} intro={process.intro} />

      <section className="container section--tight" aria-label="Steps">
        <ol className="steps">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="step">
              <span className="step-no mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="step-dot" aria-hidden="true" />
              <div className="step-main">
                <h2 className="step-title">{step.title}</h2>
                <p className="step-desc">{step.description}</p>
              </div>
              <ul className="step-outputs" aria-label="Deliverables">
                {step.outputs.map((o) => (
                  <li key={o} className="chip">
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="ai-title">
        <div className="process-ai">
          <SectionHead
            eyebrow="With AI in the loop"
            id="ai-title"
            title="AI writes code with me. Tests decide what ships."
            intro="I used Claude Code on 19 of my 41 commits during my internship, and maintained the team’s CLAUDE.md guide that steers it. Every change it makes still goes through review and the test suite."
          />
          <Reveal delay={120}>
            <FocusArt art="orbit" />
          </Reveal>
        </div>
      </section>

      <section className="container section--tight" aria-labelledby="engage-title">
        <SectionHead eyebrow="Working together" id="engage-title" title="Ways we can work." />
        <div className="engage-grid">
          {process.engagements.map((e, i) => (
            <Reveal as="article" key={e.title} className="engage-card" delay={i * 100}>
              <h3 className="engage-title">{e.title}</h3>
              <p className="engage-desc">{e.description}</p>
              <p className="engage-detail mono">{e.detail}</p>
            </Reveal>
          ))}
        </div>
        <p className="engage-tools muted">
          Usual toolkit: {site.tools.map((t) => t.name).join(' · ')}
        </p>
      </section>

      <ContactCta />
    </div>
  );
}

import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { findProject, projects } from '../content/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import Counter from '../components/Counter';
import Cover from '../components/Cover';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckIcon } from '../components/Icons';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import './CaseStudy.css';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = findProject(slug);
  usePageMeta(project?.title, project?.summary);

  if (!project) return <NotFound />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const meta: [string, ReactNode][] = [
    ['Role', project.role],
    ['Status', project.status],
    ['Tools', project.tools.join(', ')],
    [
      project.live ? 'Live' : 'Code',
      project.live ? (
        <a href={project.live.href} target="_blank" rel="noreferrer" className="case-live">
          {project.live.label} <ArrowUpRight size={14} />
        </a>
      ) : project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer" className="case-live">
          GitHub <ArrowUpRight size={14} />
        </a>
      ) : (
        'Private'
      ),
    ],
  ];
  if (project.live && project.repo) {
    meta.push([
      'Code',
      <a href={project.repo} target="_blank" rel="noreferrer" className="case-live">
        GitHub <ArrowUpRight size={14} />
      </a>,
    ]);
  }

  return (
    <article className="page case">
      <header className="container case-head">
        <Link to="/work" className="case-back">
          <ArrowLeft size={16} /> All work
        </Link>
        <p className="eyebrow">
          {project.client} · {project.year}
        </p>
        <h1 className="case-title">{project.title}</h1>
        <p className="lead case-lead">{project.summary}</p>
        <ul className="case-tags">
          {project.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <dl className="case-meta">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container">
        <Cover title={project.title} hue={project.hue} media={project.cover} className="case-cover" />
      </div>

      {project.stats.length > 0 && (
        <section className="container case-stats" aria-label="Results">
          {project.stats.map((s) => (
            <div key={s.label} className="case-stat">
              <span className="case-stat-value">
                <Counter value={s.value} />
              </span>
              <span className="case-stat-label">{s.label}</span>
            </div>
          ))}
        </section>
      )}

      <div className="container case-body">
        {project.sections.map((s, i) => (
          <Reveal as="section" key={s.title} className="case-sec">
            <p className="eyebrow case-sec-eyebrow">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s.eyebrow}
            </p>
            <div className="case-sec-text">
              <h2 className="case-sec-title">{s.title}</h2>
              {s.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
            {s.image && (
              <figure className="case-fig">
                <Cover title={project.title} hue={(project.hue + 24 * (i + 1)) % 360} media={s.image} />
                {s.image.caption && <figcaption className="mono">{s.image.caption}</figcaption>}
              </figure>
            )}
          </Reveal>
        ))}

        {project.outcomes.length > 0 && (
          <Reveal as="section" className="case-sec">
            <p className="eyebrow case-sec-eyebrow">
              <span className="mono">✦</span>Outcome
            </p>
            <div className="case-sec-text">
              <h2 className="case-sec-title">What changed</h2>
              <ul className="case-outcomes">
                {project.outcomes.map((o) => (
                  <li key={o}>
                    <CheckIcon size={18} /> {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className="case-next">
        <div className="container case-next-inner">
          <div>
            <p className="eyebrow">Next project</p>
            <p className="case-next-title">
              {next.title} <ArrowRight size={40} />
            </p>
            <p className="muted">{next.summary}</p>
          </div>
          <Cover title={next.title} hue={next.hue} media={next.cover} className="case-next-cover" />
        </div>
      </Link>
    </article>
  );
}

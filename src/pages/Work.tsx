import { useState } from 'react';
import { projects } from '../content/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import { cssVars } from '../lib/css';
import ContactCta from '../components/ContactCta';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import './Work.css';

const ALL = 'All';
const category = (tags: string[]) => tags[0] ?? 'Other';
const categories = [ALL, ...new Set(projects.map((p) => category(p.tags)))];

export default function Work() {
  usePageMeta('Work', 'Case studies in AI engineering and software development — what I built, what broke, and how I fixed it.');
  const [filter, setFilter] = useState(ALL);
  const shown = filter === ALL ? projects : projects.filter((p) => category(p.tags) === filter);

  return (
    <div className="page">
      <PageHeader
        eyebrow={`Work · ${projects.length} projects`}
        title="Selected work"
        intro="AI systems, full-stack products and a little systems programming — what I built, what broke along the way, and how I fixed it."
      >
        <div className="filters" role="group" aria-label="Filter by category">
          {categories.map((c) => {
            const count = c === ALL ? projects.length : projects.filter((p) => category(p.tags) === c).length;
            return (
              <button
                key={c}
                type="button"
                className={`filter${c === filter ? ' is-on' : ''}`}
                aria-pressed={c === filter}
                onClick={() => setFilter(c)}
              >
                {c} <span className="filter-count mono">{count}</span>
              </button>
            );
          })}
        </div>
      </PageHeader>

      <section className="container section--tight" aria-label="Projects">
        {/* Keyed by filter so the cards replay their entrance when it changes. */}
        <div className="work-grid" key={filter}>
          {shown.map((p, i) => (
            <div key={p.slug} className="work-item" style={cssVars({ '--i': i })}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </div>
  );
}

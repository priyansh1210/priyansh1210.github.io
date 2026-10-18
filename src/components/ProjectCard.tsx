import { Link } from 'react-router';
import type { Project } from '../content/types';
import Cover from './Cover';
import { ArrowUpRight } from './Icons';
import './ProjectCard.css';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}`} className="pcard">
      <div className="pcard-media">
        <Cover title={project.title} hue={project.hue} media={project.cover} />
        <span className="pcard-go" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <h3 className="pcard-title">{project.title}</h3>
          <span className="pcard-year mono">{project.year}</span>
        </div>
        <p className="pcard-summary">{project.summary}</p>
        <ul className="pcard-tags" aria-label="Tags">
          {project.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

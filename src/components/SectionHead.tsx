import type { ReactNode } from 'react';
import { Link } from 'react-router';
import Reveal from './Reveal';
import { ArrowRight } from './Icons';
import './SectionHead.css';

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
  link?: { to: string; label: string };
};

export default function SectionHead({ index, eyebrow, title, id, intro, link }: Props) {
  return (
    <Reveal className="shead">
      <p className="shead-meta">
        {index && <span className="shead-index mono">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </p>
      <div className="shead-main">
        <h2 id={id} className="shead-title">
          {title}
        </h2>
        {intro && <p className="lead shead-intro">{intro}</p>}
      </div>
      {link && (
        <Link to={link.to} className="btn btn--ghost btn--sm shead-link">
          {link.label} <ArrowRight size={16} />
        </Link>
      )}
    </Reveal>
  );
}

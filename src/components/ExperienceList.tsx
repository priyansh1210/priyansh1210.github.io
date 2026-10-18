import type { Experience } from '../content/types';
import Reveal from './Reveal';
import './ExperienceList.css';

export default function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="xp">
      {items.map((x, i) => (
        <Reveal as="li" key={`${x.company}-${x.period}`} className="xp-row" delay={i * 70}>
          <span className="xp-period mono">{x.period}</span>
          <span className="xp-company">{x.company}</span>
          <span className="xp-role">{x.role}</span>
          <span className="xp-note">{x.note}</span>
        </Reveal>
      ))}
    </ol>
  );
}

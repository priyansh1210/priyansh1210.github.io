import type { ReactNode } from 'react';
import './PageHeader.css';

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

export default function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <header className="container phead">
      <p className="eyebrow phead-eyebrow">{eyebrow}</p>
      <h1 className="phead-title">{title}</h1>
      {intro && <p className="lead phead-intro">{intro}</p>}
      {children}
    </header>
  );
}

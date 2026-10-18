import { Link } from 'react-router';
import { usePageMeta } from '../hooks/usePageMeta';
import StreetScene from '../components/art/StreetScene';
import { ArrowRight } from '../components/Icons';
import './NotFound.css';

export default function NotFound() {
  usePageMeta('Page not found');

  return (
    <div className="page nf">
      <div className="container nf-inner">
        <p className="eyebrow">Error 404</p>
        <h1 className="nf-title">This page wandered off.</h1>
        <p className="lead">The link may be old, or the page moved. Let’s get you back somewhere useful.</p>
        <div className="nf-actions">
          <Link to="/" className="btn btn--primary">
            Back home <ArrowRight size={16} />
          </Link>
          <Link to="/work" className="btn btn--ghost">
            See the work
          </Link>
        </div>
      </div>
      <StreetScene mode="idle" />
    </div>
  );
}

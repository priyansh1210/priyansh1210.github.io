import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page-rules" aria-hidden="true" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loader" aria-hidden="true" />}>
          {/* Keyed by path so moving between case studies remounts the page and replays its entrance. */}
          <Outlet key={pathname} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

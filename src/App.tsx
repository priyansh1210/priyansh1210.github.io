import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';

// Each page is its own chunk, fetched the first time it's visited.
const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Lab = lazy(() => import('./pages/Lab'));
const Process = lazy(() => import('./pages/Process'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="lab" element={<Lab />} />
        <Route path="process" element={<Process />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

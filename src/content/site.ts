// Explicit extension: vite.config.ts loads this file too, outside the bundler.
import type { Site } from './types.ts';

/*
 * Everything about Priyansh lives in src/content/. Every fact and number here
 * comes from his resume or his GitHub READMEs, so keep them in sync when either changes.
 */
export const site: Site = {
  appearance: {
    theme: 'dark',
    palette: 'coral', // 'lime' | 'paper' | 'ocean' | 'violet' | 'coral' | 'mint' | 'mono'
    palettePicker: true, // set to false once you've settled on one
    catStripes: true, // false = plain ginger cat, no stripes
  },

  name: 'Priyansh Kabra',
  initials: 'PK',
  role: 'AI Engineer & Software Developer',
  description:
    'Priyansh Kabra — final-year Computer Science (AI) student in Bengaluru who takes AI systems to production: RAG pipelines, local LLM apps and full-stack products, built with tests, CI and privacy from day one.',
  location: 'Bengaluru, India',
  timeZone: 'Asia/Kolkata',
  email: 'kabrapriyansh12@gmail.com',
  responseTime: 'Within a day',
  availability: { open: true, label: 'Open to work · 2027' },

  hero: {
    lead: 'I build',
    words: ['reliable', 'private', 'tested', 'offline-first'],
    tail: 'AI software.',
    intro:
      'Final-year Computer Science (AI) student at MIT Bengaluru. I take AI out of the notebook and into production — RAG pipelines on air-gapped GPUs, local LLM apps, full-stack products — and I don’t call it done until it’s tested.',
  },

  nav: [
    { label: 'Work', to: '/work' },
    { label: 'Lab', to: '/lab' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/priyansh1210' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyansh-kabra' },
  ],

  disciplines: [
    'AI engineering',
    'RAG pipelines',
    'LLM evaluation',
    'AI agents',
    'Full-stack web apps',
    'REST APIs',
    'Automated testing',
    'CI/CD',
    'Privacy by design',
    'Systems programming',
  ],

  stats: [
    { value: '1,000+', label: 'Automated tests written across my projects' },
    { value: '20+', label: 'Repositories on GitHub' },
    { value: 'Top 50', label: 'of 15,000+ teams at HackOn with Amazon' },
    { value: '70+', label: 'Students taught to code at CodeX' },
  ],

  focus: [
    {
      title: 'AI & LLM systems',
      meta: 'RAG · Agents · Evals',
      description:
        'Retrieval pipelines, agents, Text-to-SQL and LLM evals — measured against real scorers and deployed to real servers, including ones with no internet.',
      art: 'orbit',
    },
    {
      title: 'Full-stack products',
      meta: 'Next.js · FastAPI · Postgres',
      description:
        'Web apps and REST APIs with accounts, data jobs, streaming results and a clean UI — built for the people who will actually use them.',
      art: 'artboard',
    },
    {
      title: 'Tested & shipped',
      meta: 'Specs · Tests · CI/CD',
      description:
        'Specs before code, then unit and end-to-end tests, CI on every push, security scans and runbooks — so it keeps working after the demo.',
      art: 'stack',
    },
  ],

  experience: [
    {
      company: 'EthifyAI Pvt. Ltd.',
      role: 'AI Intern',
      period: 'Jul — Nov 2026',
      note: 'Built an offline RAG system for our client, a National Government Security Agency — deployed to an air-gapped H200 server — and Inspector, the team’s evaluation dashboard.',
    },
    {
      company: 'HackOn with Amazon · Code for Bharat',
      role: 'Hackathons',
      period: '2025',
      note: 'Top 50 of 15,000+ teams at HackOn with Amazon (Season 5), and Top 10 of 2,500+ at Code for Bharat (Season 2).',
    },
    {
      company: 'CodeX coding club, MIT Bengaluru',
      role: 'Technical Head',
      period: '2024 — 2025',
      note: 'Taught programming basics to 70+ students and organised CodeForge, a coding contest with 100+ participants.',
    },
    {
      company: 'Manipal Institute of Technology, Bengaluru',
      role: 'B.Tech, Computer Science (AI)',
      period: '2023 — 2027',
      note: 'CGPA 8.3/10. Data structures and algorithms, databases, operating systems, networks, machine learning and NLP.',
    },
  ],

  tools: [
    { name: 'Python', daily: true },
    { name: 'TypeScript', daily: true },
    { name: 'SQL', daily: true },
    { name: 'Rust' },
    { name: 'C' },
    { name: 'FastAPI' },
    { name: 'Next.js' },
    { name: 'React' },
    { name: 'PostgreSQL' },
    { name: 'vLLM' },
    { name: 'Milvus' },
    { name: 'PyTorch' },
    { name: 'scikit-learn' },
    { name: 'Docker', daily: true },
    { name: 'GitHub Actions' },
    { name: 'Linux', daily: true },
    { name: 'Claude Code', daily: true },
  ],
};

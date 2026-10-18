import type { Process } from './types';

/* How Priyansh builds — drawn from how his own repos actually work. */
export const process: Process = {
  title: 'How I build',
  intro:
    'The same loop on every project, from a hackathon build to a client deadline: decide what done means, build it in small pieces, prove it works, and keep measuring after it ships.',
  steps: [
    {
      title: 'Spec',
      description:
        'Write down what the system must do and how we’ll know it does — user stories, acceptance criteria and open questions — before any code.',
      outputs: ['Specs', 'User stories', 'Acceptance criteria'],
    },
    {
      title: 'Design',
      description:
        'Pick the simplest architecture that meets the spec, and plan for failure up front: timeouts, fallbacks, caps and cost limits.',
      outputs: ['Architecture', 'Data model', 'Failure modes'],
    },
    {
      title: 'Build',
      description:
        'Small pull requests on a protected main branch, with every requirement traced to a component and a test.',
      outputs: ['Pull requests', 'Typed code', 'Traceability'],
    },
    {
      title: 'Test',
      description:
        'Unit, integration and end-to-end tests — and, when a model is involved, a golden evaluation set that runs in CI.',
      outputs: ['Unit & E2E tests', 'Model evals', 'Security scans'],
    },
    {
      title: 'Ship & measure',
      description:
        'Deploy, watch the numbers, write the runbook, and fix what real usage reveals.',
      outputs: ['CI/CD', 'Dashboards', 'Runbooks'],
    },
  ],
  engagements: [
    {
      title: 'Full-time role',
      description: 'Software engineering and AI engineering roles, after I graduate in July 2027.',
      detail: 'From July 2027',
    },
    {
      title: 'Hackathons',
      description: 'A hard problem, a small team and a deadline — the format HiveMindOS was born in.',
      detail: 'Top 50 · HackOn with Amazon',
    },
    {
      title: 'Open source',
      description: 'Cursora is built in the open — ideas, issues and pull requests are welcome.',
      detail: 'github.com/priyansh1210/cursora',
    },
  ],
};

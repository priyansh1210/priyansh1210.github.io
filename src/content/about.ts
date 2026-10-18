import type { About } from './types';

/* Add `portrait: { src: '/portrait.webp', alt: 'Priyansh Kabra' }` once you have a photo in /public. */
export const about: About = {
  title: 'I care about what happens after the demo.',
  bio: [
    'I’m Priyansh, a final-year Computer Science (AI) student at Manipal Institute of Technology, Bengaluru. I build AI systems and the software around them — and the part I enjoy most is making them hold up in the real world.',
    'This year at EthifyAI, I helped take a retrieval-augmented generation system onto an air-gapped server with two H200 GPUs. Much of the work was detective work — a reranker quietly calling the internet, a vector index silently falling back to brute force — so I built Inspector, the dashboard that let our team see exactly where an answer went wrong.',
    'On my own projects I write the spec before the code, test more than most people think is reasonable, and keep personal data away from models unless it truly has to go. And sometimes I go very deep, just to understand how things work: PlantOS is a 64-bit operating system I wrote from scratch in C — down to its own TCP/IP stack.',
    'As Technical Head of CodeX, our college coding club, I taught programming basics to 70+ students and ran CodeForge, a contest with 100+ participants.',
  ],
  skills: [
    {
      group: 'AI & LLMs',
      items: ['RAG pipelines', 'Prompt engineering', 'AI agents & tool calling', 'Text-to-SQL', 'RAGAS & LLM-as-judge evals', 'Guardrails', 'vLLM · llama.cpp'],
    },
    {
      group: 'Software',
      items: ['Python · TypeScript · SQL', 'C · Rust', 'FastAPI · REST · WebSockets', 'Next.js · React', 'Streamlit · Plotly Dash'],
    },
    {
      group: 'ML & data',
      items: ['scikit-learn · XGBoost', 'PyTorch · TensorFlow', 'Hugging Face', 'PostgreSQL · MySQL · dbt', 'Milvus · ChromaDB · Redis'],
    },
    {
      group: 'Shipping',
      items: ['Unit, integration & E2E tests', 'GitHub Actions CI/CD', 'Docker · Linux · CUDA', 'Vercel · Render · Supabase', 'Claude Code'],
    },
  ],
  principles: [
    {
      title: 'Spec first',
      body: 'Write down what “done” means before writing code. In Domain Trail and Cursora, every requirement has an ID and every ID has a test.',
    },
    {
      title: 'Measure, don’t guess',
      body: 'If a model is in the loop, an evaluation is in the pipeline. Inspector caught three silent bugs that no one had noticed by reading code.',
    },
    {
      title: 'Private by default',
      body: 'Send the model only what it needs, strip personal data from logs, and make “local only” a real option, not a footnote.',
    },
  ],
  currently: [
    ['Building', 'Cursora — an AI assistant at your cursor'],
    ['Exploring', 'The Fly Colony — simulating a fruit-fly brain'],
    ['Finishing', 'Final year of B.Tech CSE (AI)'],
  ],
};

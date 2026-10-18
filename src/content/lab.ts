import type { LabItem } from './types';

/* Side projects, hackathon entries and take-homes — each one from a public repo. */
export const lab: LabItem[] = [
  {
    name: 'The Fly Colony',
    year: '2026',
    status: 'In progress',
    description:
      'Virtual fruit flies whose behaviour comes only from simulated brains. A PyTorch engine runs the real fruit-fly connectome — 139,255 neurons and 15.1M connections — on CPU or any NVIDIA GPU, validated against the published Brian2 model.',
    tags: ['PyTorch', 'Simulation', 'Spec-driven'],
    hue: 120,
    href: 'https://github.com/priyansh1210/the-fly-colony',
  },
  {
    name: 'Student Focus Monitor',
    year: '2026',
    status: 'Live',
    description:
      'A Chrome extension reads learning behaviour — tab switches, replays, skips — and an ML backend classifies each moment as focused, distracted, confused or bored, with a personal model per student. XGBoost leads at 96.6% accuracy on a 40,000-snapshot synthetic dataset.',
    tags: ['Machine learning', 'Flask', 'Chrome extension'],
    hue: 200,
    href: 'https://github.com/priyansh1210/Focus_Tracking_Monitor',
  },
  {
    name: 'Peblo AI Quiz Engine',
    year: '2026',
    status: 'Complete',
    description:
      'Turns PDFs into adaptive quizzes with a local LLM. Sentence-aware chunking, embedding-based duplicate detection, two-phase question validation, and difficulty that adapts to each student’s last ten answers.',
    tags: ['LLMs', 'FastAPI', 'PostgreSQL'],
    hue: 270,
    href: 'https://github.com/priyansh1210/Peblo_Challenge',
  },
  {
    name: 'Reconciliation Engine',
    year: '2026',
    status: 'Complete',
    description:
      'Built for KoinX’s backend take-home: streams two messy crypto transaction feeds, matches them within configurable tolerances, and explains every conflict, gap and bad row in the report.',
    tags: ['TypeScript', 'Express', 'MongoDB'],
    hue: 45,
    href: 'https://github.com/priyansh1210/koinx',
  },
  {
    name: 'Finance API',
    year: '2026',
    status: 'Complete',
    description:
      'A role-based finance REST API: JWT auth, a viewer < analyst < admin hierarchy, Zod validation, soft deletes for audit trails, rate limiting, and 51 integration assertions.',
    tags: ['TypeScript', 'REST API', 'Security'],
    hue: 160,
    href: 'https://github.com/priyansh1210/finance-api',
  },
  {
    name: 'DocOutliner',
    year: '2025',
    status: 'Complete',
    description:
      'For the Adobe India Hackathon 2025: extracts a PDF’s title and H1–H3 outline offline on CPU, in 20+ languages — under 8 seconds for 50 pages, at about 75 MB against a 200 MB limit.',
    tags: ['Document AI', 'Python', 'Hackathon'],
    hue: 350,
    href: 'https://github.com/priyansh1210/DocOutliner',
  },
  {
    name: 'Product Price Predictor',
    year: '2025',
    status: 'Complete',
    description:
      'Built for an ML challenge: predicts product prices from text and images together — sentence-transformer embeddings plus ResNet18 features — with a stacking ensemble at about 17.8% SMAPE.',
    tags: ['Multimodal ML', 'XGBoost', 'PyTorch'],
    hue: 20,
    href: 'https://github.com/priyansh1210/Product-Price-Predictor',
  },
  {
    name: 'Football AI Analytics',
    year: '2025',
    status: 'Complete',
    description:
      'YOLOv8 detection of players, goalkeepers, referees and the ball in match footage, with a full pipeline from CSV annotations to training, evaluation and video inference.',
    tags: ['Computer vision', 'YOLOv8'],
    hue: 100,
    href: 'https://github.com/priyansh1210/Football-AI-Analytics',
  },
  {
    name: 'Runway Segmentation',
    year: '2025',
    status: 'Complete',
    description:
      'DeepLabV3+ segments runways in 1920×1080 images, then RANSAC and polynomial fitting extract the left edge, right edge and centreline — exported as coordinates.',
    tags: ['Computer vision', 'PyTorch'],
    hue: 230,
    href: 'https://github.com/priyansh1210/Runway-Detection',
  },
  {
    name: 'GiggleGauge',
    year: '2025',
    status: 'Complete',
    description:
      'Can a model tell when text is funny? Trained on 200,000 samples, the best model reaches 89.2% accuracy, served through a Gradio app and written up as an IEEE-style paper.',
    tags: ['NLP', 'scikit-learn', 'Gradio'],
    hue: 300,
    href: 'https://github.com/priyansh1210/GiggleGauge',
  },
];

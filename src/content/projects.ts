import type { Project } from './types';

/*
 * Case studies. `slug` becomes the URL (/work/<slug>). Every number comes from
 * Priyansh's resume or the project's README.
 * To add screenshots, put them in /public and add `cover: { src, alt }` to a
 * project, or `image: { src, alt, caption }` to a section.
 */
export const projects: Project[] = [
  {
    slug: 'inspector',
    title: 'Inspector',
    client: 'EthifyAI · AI internship',
    year: '2026',
    tags: ['AI systems', 'RAG', 'LLM evaluation'],
    summary:
      'An X-ray for a RAG system: follow any query from search to answer, score it exactly like the official scorer, and see whether retrieval or generation is to blame — on a server with no internet.',
    hue: 222,
    featured: true,
    role: 'AI Intern',
    tools: ['Python', 'Streamlit', 'asyncio', 'vLLM', 'Milvus', 'RAGAS', 'BERTScore', 'SQLite'],
    status: 'Running air-gapped',
    stats: [
      { value: '343', label: 'Automated tests, on built-in unittest' },
      { value: '7', label: 'Views, from one query to the whole corpus' },
      { value: '3', label: 'Silent bugs caught with it' },
    ],
    outcomes: [
      'Every number on screen is either measured or clearly marked unmeasurable — no more silent zeros.',
      'Official retrieval metrics computed by the same scorer code the pipeline runs, and pinned by parity tests.',
      'Three silent bugs caught, including a chunk-ID format change that zeroed every retrieval score.',
      'No limit on run size: the same dashboard opens a small test run or a run of any number of queries.',
    ],
    sections: [
      {
        eyebrow: 'Context',
        title: 'Seeing inside a RAG system with no internet',
        body: [
          'At EthifyAI, we built an offline retrieval-augmented generation system over government documents for our client, a National Government Security Agency: hybrid keyword and vector search in Milvus, reranking, and a fine-tuned LLM served with vLLM, running on an air-gapped server.',
          'A system like that is only as good as your ability to see inside it. Inspector is the tool I built for that — a read-only dashboard over the pipeline’s runs that never changes what it reads.',
        ],
      },
      {
        eyebrow: 'The problem',
        title: 'A wrong answer doesn’t say whose fault it is',
        body: [
          'A RAG answer can be wrong because retrieval never found the right documents, or because generation fumbled good context. Fix the wrong stage, and the real problem is still there.',
          'Worse, evaluation fails quietly. Point a scorer at a run and a dataset that don’t line up — a renamed collection, a changed chunk-ID format, a different file layout — and it doesn’t error. It shows 0.000, which looks exactly like a broken pipeline.',
        ],
      },
      {
        eyebrow: 'The X-ray',
        title: 'Follow one query from search to answer',
        body: [
          'Inspector is a Streamlit dashboard with seven views. Pick a query and it shows the golden answer beside the generated one, then the full retrieval funnel — hybrid search, reranking, ensemble — with every chunk marked as gold or not, and how far it got before it was dropped.',
          'It also shows what the model actually read. The pipeline retrieves small chunks but feeds the generator their whole parent section, so the text that was scored and the text that produced the answer are different — and Inspector shows both. A local LLM judge gives each answer a verdict with a written reason, and you can chat with it about any single query.',
          'Run-level views separate retrieval failures from generation failures, compare two runs side by side, and look at the corpus itself: how each document was converted, which documents never made it into Milvus, how chunk lengths compare with the chunker’s budget, and a semantic map of the chunk vectors.',
        ],
      },
      {
        eyebrow: 'Trust',
        title: 'Numbers you can believe',
        body: [
          'Instead of keeping its own copy of the metrics, Inspector loads the pipeline’s official evaluator itself — so “official” means the exact same code, not a lookalike. Its own diagnostic metrics sit beside them, clearly labelled, and a parity test suite pins both.',
          'Before showing a number, health checks ask whether that number can exist at all, and print the command that fixes it when it can’t. A command-line doctor answers the same question over SSH before the dashboard is even started. This is how Inspector caught three silent bugs, including a chunk-ID format change that had set every retrieval score to zero.',
          'It reads every run layout the pipeline writes — batch, stream and query-adaptive — by looking at the files themselves, never at folder names, and for adaptive runs it shows what the adaptive loop actually changed: the queries it rewrote, why it stopped, and what it submitted compared with its first attempt.',
        ],
      },
      {
        eyebrow: 'Scoring',
        title: 'One click to score a whole run',
        body: [
          'A single button runs answer scoring in the background — token F1, BERTScore, an LLM verdict, then RAGAS factual correctness through the local judge. Each job runs as its own process with a log and an exit code, so it survives browser refreshes, and two jobs that write the same file are never allowed to run together.',
          'The judge itself can be started, stopped and watched from the dashboard. And because the same answers can score differently from one run to the next, Inspector forces the judge to temperature 0, sends one request at a time and turns off prompt caching, so a score means the same thing every time.',
        ],
      },
      {
        eyebrow: 'Air gap',
        title: 'Built for a server that can’t call out',
        body: [
          'On an air-gapped machine, code that tries to reach the internet doesn’t fail — it hangs. So a preflight check blocks every non-local connection and names the exact line that tried, and the dashboard is tested to never load PyTorch or any model library. Inspector also switches off RAGAS’s usage analytics before RAGAS is even imported, and keeps BERTScore from trying to download its model.',
          'All 343 tests run on Python’s built-in unittest, with no extra test tooling, because the tool ships to the server on a physical disk where no new dependency can be installed.',
        ],
      },
      {
        eyebrow: 'Scale',
        title: 'Any number of queries',
        body: [
          'Inspector has no limit on how many queries a run holds. Every run-level computation is linear: a run summary that once rebuilt every query from scratch now uses a single group-by, and per-query lookups come from an offset index instead of one table per query — 97 MB and under a second for 80,000 queries in the scale tests, down from 313 MB and 7.4 seconds.',
          'Corpus scans read chunk metadata only, never vectors, so memory grows with the number of documents rather than chunks. Any view that shows part of the data says exactly how much it left out, and defaults adapt to the machine it runs on.',
        ],
      },
    ],
  },
  {
    slug: 'domain-trail',
    title: 'Domain Trail',
    client: 'Personal product · live',
    year: '2026',
    tags: ['Full-stack', 'AI ranking', 'Responsible AI'],
    summary:
      'Describe your website, get domain names you can actually buy — checked live with each registry, priced in your currency, and tested like a production system.',
    hue: 152,
    featured: true,
    role: 'Product, design & engineering',
    tools: ['TypeScript', 'Next.js', 'PostgreSQL', 'Supabase', 'Redis', 'Vercel AI Gateway', 'GitHub Actions', 'Playwright'],
    status: 'Live',
    live: { label: 'domain-trail.vercel.app', href: 'https://domain-trail.vercel.app' },
    repo: 'https://github.com/priyansh1210/domain-trail',
    stats: [
      { value: '441', label: 'Unit tests, plus 36 end-to-end' },
      { value: '16', label: 'GitHub Actions workflows' },
      { value: '0.965', label: 'NDCG@10 for the rule-based ranker' },
    ],
    outcomes: [
      'A live product that runs entirely on free plans — $0 a month.',
      'Every name is checked with its registry before it’s shown; taken names never appear.',
      'Privacy built in: a logger that strips personal data, minimal data to the model, self-serve export and deletion.',
    ],
    sections: [
      {
        eyebrow: 'The problem',
        title: 'Name ideas are easy. Available ones aren’t.',
        body: [
          'Most domain tools hand you clever names that turn out to be taken, or prices that jump at renewal. Domain Trail starts from a plain description of your website and returns names you can actually register.',
          'Every name is checked live through DNS and the registry that runs its extension (RDAP), shown with first-year and renewal prices in your currency, and grouped by budget: Free, $1–100, $101–300 and $300+.',
        ],
      },
      {
        eyebrow: 'How it works',
        title: 'Understand, generate, rank, verify, stream',
        body: [
          'The site detects what the website is about — type, industry, audience, country, tone — and shows it as editable chips. It generates candidates with several naming strategies, ranks them on fit, brand risk and extension suitability, verifies availability, and streams results to the browser as each one is checked.',
          'For signed-in users, an LLM decision model (Jev) can read the description and rank the names, with every answer validated. If the model doesn’t answer, the rule-based ranker takes over — and it scores 0.965 NDCG@10 on its own.',
        ],
      },
      {
        eyebrow: 'Responsible AI',
        title: 'Designed for DPDP and GDPR from the first spec',
        body: [
          'The logger strips descriptions, emails and IP addresses. Only the minimum is sent to the model. Users can export or delete their own data. AI spend is capped by a circuit breaker, token budgets and cost alerts, so a bad day can’t become a big bill.',
        ],
      },
      {
        eyebrow: 'Engineering',
        title: 'Specs first, then 477 tests',
        body: [
          'Before writing code I wrote 18 specs — 78 Agile user stories with acceptance criteria — and every requirement links to a test through a traceability check that runs in CI.',
          'It shipped with 441 unit and 36 end-to-end tests and 16 GitHub Actions workflows: CI, secret and dependency scanning, a weekly 45-case golden evaluation of the model, daily price and registry jobs, and encrypted weekly backups.',
        ],
      },
    ],
  },
  {
    slug: 'cursora',
    title: 'Cursora',
    client: 'Personal project · pre-alpha',
    year: '2026',
    tags: ['AI systems', 'Rust', 'Local LLMs'],
    summary:
      'Select anything in any app, press a hotkey, and an AI answer streams into a bubble at your cursor — from a model on your own machine, fully offline.',
    hue: 280,
    featured: true,
    role: 'Design & engineering',
    tools: ['Rust', 'Tauri', 'llama.cpp', 'React', 'TypeScript'],
    status: 'Pre-alpha',
    repo: 'https://github.com/priyansh1210/cursora',
    stats: [
      { value: '160', label: 'Automated tests' },
      { value: '2', label: 'Platforms in CI: Windows and Ubuntu' },
      { value: '0', label: 'Telemetry, analytics or update checks' },
    ],
    outcomes: [
      'An on-device engine that never leaves a model stuck in memory.',
      'A privacy guard that masks personal data before any optional cloud call.',
      'Works in browsers, editors, terminals, PDFs and even on selected files.',
    ],
    sections: [
      {
        eyebrow: 'The idea',
        title: 'No copy, no paste, no switching windows',
        body: [
          'You’re reading an error in a terminal or a clause in a contract, and you have a question. With Cursora you select it, press Ctrl+G, and a chat bubble opens right where your mouse is, with your selection already attached.',
          'It reads selections through Windows UI Automation and X11, snips any region of the screen, and comes with one-word skills like /summary, /explain and /bugs — plus your own, written as plain Markdown files.',
        ],
      },
      {
        eyebrow: 'On-device engine',
        title: 'A local model that cleans up after itself',
        body: [
          'The built-in engine runs llama-server as a child process bound to 127.0.0.1, with health checks, idle unloading and crash-safe cleanup, so no model is left sitting in your RAM.',
          'It auto-detects LM Studio, works with any OpenAI-compatible server, and suggests a model size that fits your PC’s memory. With a local model, setup, answers, settings and history all work with no internet at all.',
        ],
      },
      {
        eyebrow: 'Privacy',
        title: 'Cloud is opt-in — and masked',
        body: [
          'Cloud LLMs are off in local-only mode. When they are on, a privacy guard first masks emails, phone numbers, checksum-validated card, Aadhaar and IBAN numbers, PAN and API keys, then puts them back in the answer on your side.',
          'API keys live in the OS keychain, password managers are never read, your clipboard is restored, and terminals never receive Ctrl+C — so a running process keeps running.',
        ],
      },
      {
        eyebrow: 'Engineering',
        title: 'Spec-first, tested on two operating systems',
        body: [
          'Every behaviour starts in a spec, and every test is named after the criterion it covers. 160 tests run in CI on Windows and Ubuntu, and a tagged release builds installers for both.',
        ],
      },
    ],
  },
  {
    slug: 'hivemindos',
    title: 'HiveMindOS',
    client: 'Hackathon · built solo',
    year: '2026',
    tags: ['AI systems', 'Multi-agent', 'FastAPI'],
    summary:
      'One prompt, five AI agents — HR, Sales, Finance, Support and Ops — that plan, delegate to each other and finish a business workflow in under 90 seconds, live.',
    hue: 32,
    featured: true,
    role: 'Solo — design, backend & frontend',
    tools: ['Python', 'FastAPI', 'WebSockets', 'Next.js', 'Supabase', 'Gemini', 'Groq'],
    status: 'Live demo',
    live: { label: 'hivemindos.vercel.app', href: 'https://hivemindos.vercel.app' },
    repo: 'https://github.com/priyansh1210/HiveMindOS',
    stats: [
      { value: '5', label: 'Specialist agents that talk to each other' },
      { value: '<90 s', label: 'From prompt to finished workflow' },
      { value: '3', label: 'LLM providers in the failover chain' },
    ],
    outcomes: [
      'Collaboration graphs that emerge at runtime instead of being scripted.',
      'An LLM layer that fails over across three providers and never hangs.',
      'Every message streamed live to a dashboard — no polling.',
    ],
    sections: [
      {
        eyebrow: 'The brief',
        title: 'They asked for one bot. I built five that work together.',
        body: [
          '“Launch a summer campaign under $20K” turns into dozens of messages between Sales, Finance, Ops and HR. A single bot can write the copy, but it can’t ask Finance for a budget or check with Ops on timing.',
          'In HiveMindOS, a planner breaks the request into sub-tasks for specialist agents, and the agents delegate to each other — all of it visible on a real-time dashboard.',
        ],
      },
      {
        eyebrow: 'Orchestration',
        title: 'Agents that delegate by mentioning each other',
        body: [
          'An agent can spawn new work mid-task by writing “→ @finance_agent: please validate this forecast”. The orchestrator parses these mentions, de-duplicates them so agents can’t ping-pong forever, and enforces hard caps on rounds and sub-tasks.',
          'Tool calls use a plain-text JSON protocol instead of one vendor’s function calling, so the same 25 demo tools — budgeting, forecasting, ticketing and more — work on every model provider.',
        ],
      },
      {
        eyebrow: 'Reliability',
        title: 'Fails fast, never hangs',
        body: [
          'Every LLM call walks a failover chain — two Gemini keys, then Groq’s Llama 3.3 70B — in about 50 lines of explicit code, with a 45-second timeout per call. When I hit a real quota wall during testing, the chain kept the demo running.',
          'A FastAPI WebSocket broadcaster streams every message and status change to the Next.js dashboard, and every message is persisted to Postgres. The whole system runs on free tiers.',
        ],
      },
    ],
  },
  {
    slug: 'ai-workforce-platform',
    title: 'AI Workforce Platform',
    client: 'Personal project',
    year: '2026',
    tags: ['AI systems', 'Text-to-SQL', 'Data engineering'],
    summary:
      'An HR analytics platform where you can ask questions in plain English — Text-to-SQL with guardrails, cited RAG over policies, and an attrition model in the warehouse.',
    hue: 190,
    role: 'Design & engineering',
    tools: ['Python', 'PostgreSQL', 'dbt', 'scikit-learn', 'Gemini API', 'ChromaDB', 'Plotly Dash', 'Docker'],
    status: 'Complete',
    repo: 'https://github.com/priyansh1210/AI_Workforce_Intelligence_Platform',
    stats: [
      { value: '12', label: 'Schema-tested dbt models' },
      { value: '500', label: 'Employees in a correlation-rich synthetic dataset' },
      { value: '8', label: 'Policy documents behind cited RAG' },
    ],
    outcomes: [
      'Plain-English questions answered with SQL that can only ever read.',
      'Policy answers that cite their source — or decline without evidence.',
      'The whole pipeline runs with one command on Docker Compose.',
    ],
    sections: [
      {
        eyebrow: 'Data',
        title: 'A warehouse first, with dbt as the contract',
        body: [
          'A generator creates 500 employees whose engagement, overtime, reviews and exits are deliberately correlated, so the models have something real to find. dbt turns it into 12 schema-tested models in PostgreSQL, and every downstream consumer reads from those marts.',
          'A four-page Plotly Dash app shows KPIs, attrition risk, engagement and an “Ask AI” page.',
        ],
      },
      {
        eyebrow: 'ML & NLP',
        title: 'Risk scores that live in the warehouse',
        body: [
          'A Random Forest attrition model writes its risk scores back into the warehouse. Survey and exit-interview comments are tagged with VADER sentiment and Gemini topics, using batched JSON prompts over a fixed taxonomy.',
        ],
      },
      {
        eyebrow: 'LLMs, with guardrails',
        title: 'Text-to-SQL that can’t hurt the database',
        body: [
          'Business questions become SQL through a schema-grounded prompt, and four guardrails sit in front of the warehouse: SELECT-only, a single statement, an enforced LIMIT, and a read-only connection.',
          'Policy questions go to RAG over eight HR documents. Every answer cites its source — and when there’s no evidence, it declines instead of guessing. A weekly report turns KPIs and themes into an executive brief automatically.',
        ],
      },
    ],
  },
  {
    slug: 'plantos',
    title: 'PlantOS',
    client: 'Personal project',
    year: '2026',
    tags: ['Systems', 'C', 'Operating systems'],
    summary:
      'A 64-bit operating system written from scratch in C and assembly — with its own TCP/IP stack, window manager, and a neural network that trains on bare metal.',
    hue: 8,
    role: 'Everything, from the bootloader up',
    tools: ['C', 'x86-64 assembly', 'NASM', 'QEMU', 'GCC cross-compiler'],
    status: 'Runs in QEMU',
    repo: 'https://github.com/priyansh1210/PlantOS',
    stats: [
      { value: '30', label: 'Milestones, from boot to backprop' },
      { value: '29', label: 'System calls' },
      { value: '0', label: 'External libraries' },
    ],
    outcomes: [
      'Preemptive multitasking with per-process address spaces and copy-on-write fork.',
      'A working network stack: ping, DNS, and an HTTP server running inside the OS.',
      'A neural network that learns XOR and a circular decision boundary on bare metal.',
    ],
    sections: [
      {
        eyebrow: 'Why',
        title: 'To understand what every layer below my code is doing',
        body: [
          'PlantOS boots in QEMU and implements everything itself — no external libraries and no standard C library. Every byte, from the boot stub to printf, is written by hand.',
        ],
      },
      {
        eyebrow: 'The kernel',
        title: 'Processes, memory and files',
        body: [
          'x86-64 long mode, paging, a round-robin preemptive scheduler and Ring 3 user mode with 29 system calls. Virtual memory supports demand paging, copy-on-write fork, mmap and Unix signals with pipes.',
          'Storage goes through a VFS over a RAM filesystem and FAT32, with an ATA driver, a 64-sector LRU buffer cache and an ELF64 loader for user programs.',
        ],
      },
      {
        eyebrow: 'Networking & GUI',
        title: 'From the NIC driver to an HTTP server',
        body: [
          'An Intel E1000 driver feeds a TCP/IP stack written from scratch: Ethernet, ARP, IPv4, ICMP, UDP and TCP with a full state machine and retransmission, plus DNS, a sockets API, and an HTTP client and server.',
          'On top sit a framebuffer, a window manager with draggable windows, a terminal emulator, and a shell with 40+ commands, history, tab completion and pipes.',
        ],
      },
      {
        eyebrow: 'Machine learning',
        title: 'Backpropagation with no libraries at all',
        body: [
          'In user space, a matrix library and a neural network library — dense layers, five activations, cross-entropy, SGD with momentum — train using the x87 FPU directly. The OS manages floating-point state per process.',
          'The demo learns XOR to 4/4 accuracy, classifies points inside a circle, saves the trained model to the FAT32 disk in a custom format, and loads it back.',
        ],
      },
    ],
  },
];

export const findProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);

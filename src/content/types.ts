export type Link = { label: string; href: string };

export type Stat = { value: string; label: string };

/** An image. Leave `src` out and the site draws placeholder artwork instead. */
export type Media = { src?: string; alt: string; caption?: string };

export type FocusArea = {
  title: string;
  /** A short line above the title, e.g. the key tools. */
  meta: string;
  description: string;
  /** Which animated illustration sits on the card. */
  art: 'artboard' | 'orbit' | 'stack';
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  note: string;
};

export type PaletteId = 'lime' | 'paper' | 'ocean' | 'violet' | 'coral' | 'mint' | 'mono';

export type Site = {
  /** How the site looks on a visitor's first visit. Their own choices are remembered after that. */
  appearance: {
    theme: 'dark' | 'light';
    /** One of the palettes in src/theme/palettes.ts. */
    palette: PaletteId;
    /** Show the palette switcher in the header. */
    palettePicker: boolean;
    /** Soft tabby stripes on the street cat. */
    catStripes: boolean;
  };
  name: string;
  /** Two letters for the logo mark. */
  initials: string;
  role: string;
  /** One or two sentences for search results and link previews. */
  description: string;
  location: string;
  /** IANA time zone for the live clock, e.g. 'Asia/Kolkata' or 'Europe/London'. */
  timeZone: string;
  email: string;
  responseTime: string;
  availability: { open: boolean; label: string };
  hero: {
    lead: string;
    /** Rotates in the middle of the headline. */
    words: string[];
    tail: string;
    intro: string;
  };
  nav: { label: string; to: string }[];
  socials: Link[];
  /** Scrolls across the strip under the hero. */
  disciplines: string[];
  stats: Stat[];
  focus: FocusArea[];
  experience: Experience[];
  tools: { name: string; daily?: boolean }[];
};

export type CaseSection = {
  eyebrow?: string;
  title: string;
  body: string[];
  image?: Media;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** The first tag doubles as the project's category in the Work page filter. */
  tags: string[];
  summary: string;
  /** 0–360. Tints the placeholder artwork until real images are added. */
  hue: number;
  /** Shown on the home page. */
  featured?: boolean;
  cover?: Media;
  role: string;
  tools: string[];
  /** Where the project stands, e.g. "Live" or "Pre-alpha". */
  status: string;
  live?: Link;
  /** Source code link (shown as "Code" on the case study). */
  repo?: string;
  stats: Stat[];
  outcomes: string[];
  sections: CaseSection[];
};

export type LabItem = {
  name: string;
  year: string;
  status: 'Live' | 'In progress' | 'Complete';
  description: string;
  tags: string[];
  hue: number;
  href?: string;
  image?: Media;
};

export type About = {
  title: string;
  portrait?: Media;
  bio: string[];
  skills: { group: string; items: string[] }[];
  principles: { title: string; body: string }[];
  currently: [label: string, value: string][];
};

export type Process = {
  title: string;
  intro: string;
  steps: { title: string; description: string; outputs: string[] }[];
  engagements: { title: string; description: string; detail: string }[];
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { projects } from '../content/projects';
import { site } from '../content/site';
import { useCopyEmail } from '../hooks/useCopyEmail';
import { useInView } from '../hooks/useInView';
import { useLocalTime } from '../hooks/useLocalTime';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { isPalette, PALETTES } from '../theme/palettes';
import { useTheme } from '../theme/ThemeProvider';
import './Terminal.css';

type Kind = 'cmd' | 'out' | 'note' | 'ok' | 'warn';
type Line = { id: number; kind: Kind; text: string };

const HELP: [string, string][] = [
  ['help', 'list commands'],
  ['ls', 'list projects'],
  ['open <slug>', 'open a case study'],
  ['whoami', 'who made this'],
  ['contact', 'copy my email'],
  ['socials', 'find me elsewhere'],
  ['theme [light|dark]', 'switch the theme'],
  ['palette [name]', 'change the colours'],
  ['time', 'my local time'],
  ['clear', 'clear the screen'],
];

const QUICK = ['help', 'ls', 'whoami', 'theme', 'palette', 'contact'];
const DEMO = 'whoami';
const handle = site.name.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'portfolio';

/** A small fake shell: a playful second way to browse the portfolio. */
export default function Terminal() {
  const navigate = useNavigate();
  const { theme, setTheme, palette, setPalette } = useTheme();
  const { copy } = useCopyEmail();
  const { time, zone } = useLocalTime(site.timeZone);
  const reduced = usePrefersReducedMotion();
  const [rootRef, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: 'note', text: 'type `help`, or tap a command below' },
  ]);
  const [value, setValue] = useState('');
  const [last, setLast] = useState('');
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const touched = useRef(false);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const print = useCallback((...entries: [Kind, string][]) => {
    setLines((prev) => [...prev, ...entries.map(([kind, text]) => ({ id: nextId.current++, kind, text }))]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;
      setLast(input);
      const [cmd, arg] = input.toLowerCase().split(/\s+/);
      print(['cmd', input]);

      switch (cmd) {
        case 'help':
          print(...HELP.map(([c, d]): [Kind, string] => ['out', `${c.padEnd(20)}${d}`]));
          break;
        case 'ls':
        case 'work':
          print(
            ...projects.map((p): [Kind, string] => ['out', `${p.slug.padEnd(22)}${p.title} · ${p.year}`]),
            ['note', 'try `open <slug>`'],
          );
          break;
        case 'open': {
          const project = projects.find((p) => p.slug === arg || p.title.toLowerCase() === arg);
          if (!project) {
            print(['warn', arg ? `open: no project called "${arg}" — \`ls\` lists them` : 'usage: open <slug>']);
            break;
          }
          print(['ok', `opening /work/${project.slug} …`]);
          later(() => navigate(`/work/${project.slug}`), 450);
          break;
        }
        case 'whoami':
          print(['out', `${site.name} — ${site.role}`], ['out', site.location]);
          break;
        case 'contact':
        case 'email':
          void copy().then((ok) => print(ok ? ['ok', `copied ${site.email}`] : ['note', 'opening your mail app …']));
          break;
        case 'socials':
          print(...site.socials.map((s): [Kind, string] => ['out', `${s.label.padEnd(12)}${s.href}`]));
          break;
        case 'theme': {
          const next = arg === 'light' || arg === 'dark' ? arg : theme === 'dark' ? 'light' : 'dark';
          setTheme(next);
          print(['ok', `theme → ${next}`]);
          break;
        }
        case 'palette':
        case 'colors':
        case 'colours': {
          if (isPalette(arg)) {
            setPalette(arg);
            print(['ok', `palette → ${arg}`]);
          } else {
            if (arg) print(['warn', `palette: no palette called "${arg}"`]);
            print(
              ...PALETTES.map((p): [Kind, string] => [
                p.id === palette ? 'ok' : 'out',
                `${p.id === palette ? '● ' : '  '}${p.id.padEnd(10)}${p.note}`,
              ]),
              ['note', 'try `palette ocean`'],
            );
          }
          break;
        }
        case 'time':
        case 'date':
          print(['out', `${time} ${zone} in ${site.location}`]);
          break;
        case 'clear':
          setLines([]);
          break;
        case 'sudo':
          print(['warn', 'nice try.']);
          break;
        default:
          print(['warn', `${cmd}: command not found — \`help\` lists them`]);
      }
    },
    [copy, navigate, palette, print, setPalette, setTheme, theme, time, zone],
  );

  // Keep the newest line in view — scroll the output box, never the page.
  useEffect(() => {
    const out = outRef.current;
    if (out) out.scrollTop = out.scrollHeight;
  }, [lines]);

  // First time the terminal is seen, type a demo command (unless the visitor got there first).
  useEffect(() => {
    if (!inView || touched.current) return;
    touched.current = true;
    if (reduced) {
      run(DEMO);
      return;
    }
    DEMO.split('').forEach((_, i) => later(() => setValue(DEMO.slice(0, i + 1)), 400 + i * 90));
    later(() => {
      run(DEMO);
      setValue('');
    }, 400 + DEMO.length * 90 + 350);
    // Deliberately keyed on inView alone: this runs once, on first sight.
  }, [inView]);

  const submit = (cmd: string) => {
    touched.current = true;
    run(cmd);
    setValue('');
  };

  return (
    <div ref={rootRef} className="term" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title mono">~/{handle} — zsh</span>
      </div>

      <div ref={outRef} className="term-out mono" role="log" aria-live="polite">
        {lines.map((line) => (
          <p key={line.id} className={`term-line term-line--${line.kind}`}>
            {line.kind === 'cmd' && <span className="term-prompt">❯ </span>}
            {line.text}
          </p>
        ))}
        <form
          className="term-input"
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
        >
          <label htmlFor="term-input" className="term-prompt">
            ❯<span className="visually-hidden">Command</span>
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              touched.current = true;
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' && last) {
                e.preventDefault();
                setValue(last);
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="term-chips" aria-label="Quick commands">
        {QUICK.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="term-chip mono"
            onClick={(e) => {
              e.stopPropagation();
              submit(cmd);
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

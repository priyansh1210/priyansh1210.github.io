import { useTheme } from '../theme/ThemeProvider';
import { MoonIcon, SunIcon } from './Icons';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      data-current={theme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    >
      <SunIcon className="theme-toggle-sun" />
      <MoonIcon className="theme-toggle-moon" />
    </button>
  );
}

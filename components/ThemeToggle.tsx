'use client';

import { useTheme, type Theme } from '@/components/ThemeProvider';
import { MoonIcon, SunIcon } from '@/components/icons';
import styles from './ThemeToggle.module.css';

const SEGMENTS: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light theme', Icon: SunIcon },
  { value: 'dark', label: 'Dark theme', Icon: MoonIcon },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.pill} data-mode={theme} role="group" aria-label="Theme">
      <span className={styles.thumb} aria-hidden="true" />
      {SEGMENTS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className={styles.segment}
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;

'use client';

import { TABS, hrefFor, type TabId } from '@/lib/nav';
import styles from './NavTabs.module.css';

export type NavVariant = 'sidebar' | 'stack';

interface NavTabsProps {
  active: TabId;
  label: string;
  variant?: NavVariant;
  onSelect?: (id: TabId) => void;
}

/**
 * The one rendering of the tab list. The sidebar and the mobile sheet both use
 * this so there is a single source of markup and styling.
 */
export function NavTabs({ active, label, variant = 'sidebar', onSelect }: NavTabsProps) {
  return (
    <nav className={styles.nav} data-variant={variant} aria-label={label}>
      <ul className={styles.list}>
        {TABS.map((tab) => (
          <li key={tab.id}>
            <a
              className={styles.link}
              href={hrefFor(tab.id)}
              aria-current={active === tab.id ? 'page' : undefined}
              onClick={() => onSelect?.(tab.id)}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavTabs;

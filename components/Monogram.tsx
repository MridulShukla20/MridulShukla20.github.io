'use client';

import { hrefFor } from '@/lib/nav';
import { profile } from '@/content/profile';
import styles from './Monogram.module.css';

/**
 * The avatar fallback described in public/README.md — used as the home link
 * until a real avatar.png exists.
 */
export function Monogram({ onSelect }: { onSelect?: () => void }) {
  return (
    <a
      className={styles.monogram}
      href={hrefFor('home')}
      aria-label={`${profile.name} — home`}
      onClick={onSelect}
    >
      <span aria-hidden="true">{profile.name.charAt(0)}</span>
    </a>
  );
}

export default Monogram;

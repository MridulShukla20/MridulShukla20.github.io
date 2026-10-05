'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GratitudeTicker } from '@/components/GratitudeTicker';
import { useTheme } from '@/components/ThemeProvider';
import { profile } from '@/content/profile';
import styles from './Footer.module.css';

/* Both files are the same 1120x232 aspect; the dark one is a 2x webp. */
const ART = {
  dark: '/footer-dark.webp',
  light: '/footer-light.png',
} as const;

/** Sits at the end of the shell, full width. The art is flush to the bottom. */
export function Footer() {
  const { theme } = useTheme();
  const [broken, setBroken] = useState<string[]>([]);

  const src = ART[theme];
  const artMissing = broken.includes(src);

  return (
    <footer className={styles.footer}>
      {/* The only grain in the app rides on this wrapper. */}
      <div className={styles.inner}>
        <GratitudeTicker />

        <div className={styles.quoteBlock}>
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className={styles.quote}>{profile.quote}</blockquote>
        </div>

        <div className={styles.creditsRow}>
          <div className={styles.credits}>
            <p className={styles.crafted}>{profile.craftedLine}</p>
            <p className={styles.craftedSub}>
              {profile.craftedSublineParts.before}
              <span className={styles.craftedAccent}>
                {profile.craftedSublineParts.accent}
              </span>
              {profile.craftedSublineParts.after}
            </p>
          </div>
          <p className={styles.copyright}>© 2026 Mridul Shukla</p>
        </div>

        {/* A missing file drops the art and leaves the rest of the footer intact. */}
        {!artMissing && (
          <Image
            className={styles.art}
            src={src}
            alt=""
            width={1120}
            height={232}
            sizes="(max-width: 1011px) 100vw, 1120px"
            priority={false}
            onError={() => setBroken((prev) => (prev.includes(src) ? prev : [...prev, src]))}
          />
        )}
      </div>
    </footer>
  );
}

export default Footer;

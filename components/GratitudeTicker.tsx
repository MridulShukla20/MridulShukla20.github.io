'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { gratitude } from '@/content/gratitude';
import { graphemes, poolFor } from '@/lib/scramble';
import styles from './GratitudeTicker.module.css';

/** How long the settled word holds before it transitions. */
const DWELL_MS = 2000;
const DWELL_REDUCED_MS = 4000;

/** Scramble window, and the slice of it in which each position may settle. */
const SCRAMBLE_MS = 600;
const SETTLE_MIN = 0.15;
const SETTLE_MAX = 0.7;

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/* Read from the media query rather than mirrored into state — same pattern the
 * theme and preloader use, and it keeps the server render deterministic. */
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getMotionSnapshot(): boolean {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getMotionServerSnapshot(): boolean {
  return false;
}

/*
 * One word at a time between two rules. Every word — Latin, Devanagari, Arabic,
 * CJK, Thai — morphs through the same grapheme scramble, drawn from its own
 * script's pool. Reduced motion just swaps the text, more slowly.
 */
export function GratitudeTicker() {
  const [index, setIndex] = useState(0);
  /** Non-null only while a scramble is mid-flight. */
  const [scrambled, setScrambled] = useState<string | null>(null);

  const reduced = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  /*
   * Keyed on index, so the dwell restarts from the moment a word settles and
   * the closure below reads the word that is actually on screen.
   */
  useEffect(() => {
    if (gratitude.length < 2) return;

    let raf = 0;
    let busy = false;

    const scramble = (from: string, to: string) => {
      const fromParts = graphemes(from);
      const toParts = graphemes(to);
      const pool = poolFor(to, [...fromParts, ...toParts]);

      const maxLength = Math.max(fromParts.length, toParts.length);
      const settle = Array.from(
        { length: maxLength },
        () => SETTLE_MIN + Math.random() * (SETTLE_MAX - SETTLE_MIN),
      );
      const lastSettle = Math.max(...settle);
      const start = performance.now();

      const frame = (now: number) => {
        const progress = Math.min((now - start) / SCRAMBLE_MS, 1);

        // Every position has landed — drop back to the real string.
        if (progress >= lastSettle) {
          setScrambled(null);
          setIndex((current) => (current + 1) % gratitude.length);
          busy = false;
          return;
        }

        let text = '';
        for (let i = 0; i < maxLength; i += 1) {
          if (progress >= settle[i]) {
            text += i < toParts.length ? toParts[i] : '';
          } else {
            text += pool[Math.floor(Math.random() * pool.length)];
          }
        }
        setScrambled(text);
        raf = requestAnimationFrame(frame);
      };

      raf = requestAnimationFrame(frame);
    };

    const tick = window.setInterval(
      () => {
        // A stalled transition (a hidden tab pauses rAF) must not stack another.
        if (busy) return;

        if (reduced) {
          setIndex((current) => (current + 1) % gratitude.length);
          return;
        }

        busy = true;
        scramble(gratitude[index], gratitude[(index + 1) % gratitude.length]);
      },
      reduced ? DWELL_REDUCED_MS : DWELL_MS,
    );

    return () => {
      window.clearInterval(tick);
      cancelAnimationFrame(raf);
    };
  }, [index, reduced]);

  if (gratitude.length === 0) return null;

  return (
    <div className={styles.gratitude} aria-hidden="true">
      <span className={styles.rule} />
      <span className={styles.word}>{scrambled ?? gratitude[index]}</span>
      <span className={styles.rule} />
    </div>
  );
}

export default GratitudeTicker;

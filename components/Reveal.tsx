'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './Reveal.module.css';

/** Stagger moves in 40ms steps and never runs past four of them. */
const STEP = 40;
const MAX_DELAY = STEP * 4;

function snapDelay(delay: number): number {
  if (!Number.isFinite(delay) || delay <= 0) return 0;
  return Math.min(Math.round(delay / STEP) * STEP, MAX_DELAY);
}

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds. Snapped to 40ms steps, capped at 160ms. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /*
     * Reduced motion never gets an observer. The stylesheet already forces the
     * wrapper visible for those users, so there is nothing to wait for.
     */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setShown(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, shown && 'anim-fade', className].filter(Boolean).join(' ')}
      data-reveal={shown ? 'in' : 'pending'}
      style={{ ...style, ['--reveal-delay' as string]: `${snapDelay(delay)}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;

'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import styles from './Preloader.module.css';

const STORAGE_KEY = 'preloaded';

/** pl-out is delayed 900ms and runs for 280ms. */
const LIFETIME_MS = 1180;

/**
 * Runs in <head> before the first paint, so the overlay is already display:none
 * on a repeat visit or under reduced motion. Kept here so one file owns the rule.
 */
export const preloadScript = `(function(){try{var s=true;try{s=sessionStorage.getItem("${STORAGE_KEY}")==="1";}catch(e){s=true;}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){s=true;}document.documentElement.dataset.preload=s?"skip":"play";}catch(e){document.documentElement.dataset.preload="skip";}})();`;

/* The decision is made before hydration, so React reads it rather than owns it. */
function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  return document.documentElement.dataset.preload === 'play';
}

function getServerSnapshot(): boolean {
  return true;
}

export function Preloader() {
  const shouldPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!shouldPlay) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage disabled — the overlay still plays, just every time.
    }

    const timer = window.setTimeout(() => setFinished(true), LIFETIME_MS);
    return () => window.clearTimeout(timer);
  }, [shouldPlay]);

  if (!shouldPlay || finished) return null;

  return (
    <div className={`${styles.overlay} anim-pl-out`} aria-hidden="true">
      <span className={`${styles.text} anim-pl-in`}>hello you!</span>
    </div>
  );
}

export default Preloader;

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock } from '@/components/Clock';
import { Monogram } from '@/components/Monogram';
import { NavTabs } from '@/components/NavTabs';
import { Socials } from '@/components/Socials';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ChevronIcon } from '@/components/icons';
import { profile } from '@/content/profile';
import { TABS, type TabId } from '@/lib/nav';
import styles from './MobileBar.module.css';

/** 'idle' means never opened, so the chevron sits still on first paint. */
type SheetState = 'idle' | 'open' | 'closed';

/* Rotation lives in globals.css, beside the play-spin keyframe it uses. */
const SPIN: Record<SheetState, string> = {
  idle: '',
  open: 'anim-spin-open',
  closed: 'anim-spin-close',
};

/** The 68px bar that replaces the sidebar below 1012px. */
export function MobileBar({ active }: { active: TabId }) {
  const [state, setState] = useState<SheetState>('idle');
  const open = state === 'open';

  const rowRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);

  const activeLabel = TABS.find((tab) => tab.id === active)?.label ?? '';

  /* Closing must never leave focus on a node that is about to unmount. */
  const close = useCallback((restoreFocus: boolean) => {
    setState('closed');
    const inSheet = sheetRef.current?.contains(document.activeElement);
    if (restoreFocus || inSheet) chevronRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      close(true);
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (rowRef.current?.contains(target) || sheetRef.current?.contains(target)) return;
      close(false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    /*
     * The main column owns the scroll, not the body, so the lock is a flag on
     * <html> that ViewSwitcher.module.css reads. The body rule is belt-and-braces.
     */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.sheet = 'open';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.sheet;
    };
  }, [open, close]);

  return (
    <div className={styles.bar}>
      <div className={styles.row} ref={rowRef}>
        <Monogram onSelect={() => setState((s) => (s === 'idle' ? s : 'closed'))} />
        <span className={styles.current}>{activeLabel}</span>
        <button
          type="button"
          ref={chevronRef}
          className={styles.chevron}
          data-state={state}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          onClick={() => (open ? close(true) : setState('open'))}
        >
          <span className={`${styles.chevronIcon} ${SPIN[state]}`.trim()}>
            <ChevronIcon />
          </span>
        </button>
      </div>

      {open && (
        <div className={styles.sheet} id="mobile-nav-sheet" ref={sheetRef}>
          <NavTabs
            active={active}
            label="Sections"
            variant="stack"
            onSelect={() => close(true)}
          />

          <div className={styles.sheetFoot}>
            <ThemeToggle />
            <Socials />
          </div>

          <div className={styles.sheetMeta}>
            <Clock />
            <span>{profile.location}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileBar;

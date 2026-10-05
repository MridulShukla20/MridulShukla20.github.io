'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from 'react';
import { Footer } from '@/components/Footer';
import { MobileBar } from '@/components/MobileBar';
import { Preloader } from '@/components/Preloader';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CaseStudiesView } from '@/components/views/CaseStudiesView';
import { ExperienceView } from '@/components/views/ExperienceView';
import { HomeView } from '@/components/views/HomeView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { StackView } from '@/components/views/StackView';
import { profile } from '@/content/profile';
import { DEFAULT_TAB, tabFromHash, type TabId } from '@/lib/nav';
import styles from './ViewSwitcher.module.css';

const VIEWS: Record<TabId, ComponentType> = {
  home: HomeView,
  experience: ExperienceView,
  stack: StackView,
  projects: ProjectsView,
  'case-studies': CaseStudiesView,
};

/*
 * The URL hash is the state. useSyncExternalStore lets the server render the
 * default tab while a deep link resolves on the client without a mismatch
 * warning, and hashchange covers back/forward for free.
 */
function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function getSnapshot(): TabId {
  return tabFromHash(window.location.hash);
}

function getServerSnapshot(): TabId {
  return DEFAULT_TAB;
}

export function ViewSwitcher() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mainRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const previous = useRef<TabId | null>(null);

  /**
   * How far the shell has slid up off the footer, 0 to the footer's height.
   * The ref is the live value the wheel handler reads and writes; the state
   * exists only to re-render the transform.
   */
  const [shellOffset, setShellOffset] = useState(0);
  const offsetRef = useRef(0);

  /*
   * The travel limit is read live on each gesture; this only has to catch the
   * footer shrinking while the shell is already lifted, which no gesture would
   * otherwise correct.
   */
  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const clampToFooter = () => {
      const height = node.getBoundingClientRect().height;
      if (offsetRef.current > height) {
        offsetRef.current = height;
        setShellOffset(height);
      }
    };

    const observer = new ResizeObserver(clampToFooter);
    observer.observe(node);
    window.addEventListener('resize', clampToFooter);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', clampToFooter);
    };
  }, []);

  /*
   * Two phases off one gesture. While the column has scrolling left, the wheel
   * is left alone and .scroll handles it natively. Only once it bottoms out do
   * we take the delta and spend it on sliding the shell — and on the way back
   * up the shell has to return before the column moves again.
   *
   * The offset tracks the delta 1:1 with no transition; a curve here would
   * lag behind the wheel instead of following it.
   */
  const consume = useCallback((delta: number, target: EventTarget | null): boolean => {
    const el = scrollRef.current;
    /*
     * Measured here rather than read from the observer's last callback. The
     * footer's height follows its width — the statue scales — so a viewport
     * resize changes the travel limit, and clamping to a stale value parks the
     * shell past the footer's top edge with backdrop showing through the gap.
     */
    const footerHeight = footerRef.current?.getBoundingClientRect().height ?? 0;
    if (!el || footerHeight === 0) return false;

    const current = offsetRef.current;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    const inPhaseOne = delta > 0 ? !atBottom : current <= 0;

    if (inPhaseOne) {
      /*
       * The listener is on the window, so a gesture over the gutters, the
       * sidebar or the footer never reaches the column on its own. Over the
       * column itself we stand aside and let the browser scroll it natively,
       * momentum and all.
       */
      if (target instanceof Node && el.contains(target)) return false;
      el.scrollTop += delta;
      return true;
    }

    const next =
      delta > 0
        ? Math.min(current + delta, footerHeight)
        : Math.max(current + delta, 0);

    if (next !== current) {
      offsetRef.current = next;
      setShellOffset(next);
    }
    return true;
  }, []);

  /*
   * On the window, not the shell. Anywhere the pointer sits — gutter, sidebar,
   * the revealed footer — the gesture has to reach the same two phases, or a
   * reader who scrolls down to the footer and moves the mouse is stranded.
   */
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (consume(event.deltaY, event.target)) event.preventDefault();
    };

    // Touch mirrors wheel: dragging up is a positive delta, like scrolling down.
    let lastY: number | null = null;

    const onTouchStart = (event: TouchEvent) => {
      lastY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (y === undefined || lastY === null) return;
      const delta = lastY - y;
      lastY = y;
      if (consume(delta, event.target)) event.preventDefault();
    };

    const onTouchEnd = () => {
      lastY = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [consume]);

  // A new view starts at the top, with the shell back down over the footer.
  useEffect(() => {
    if (previous.current !== null && previous.current !== active) {
      scrollRef.current?.scrollTo(0, 0);
      offsetRef.current = 0;
      setShellOffset(0);
    }
    previous.current = active;
  }, [active]);

  const View = VIEWS[active];

  return (
    <>
      <Preloader />

      {/* Focus is moved by hand — writing #main into the hash would switch views. */}
      <a
        className={styles.skip}
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
          scrollRef.current?.scrollTo(0, 0);
        }}
      >
        Skip to content
      </a>

      {/*
       * Fixed to the viewport floor and behind the shell, revealed when the
       * shell lifts off it. Deliberately outside both the shell and the
       * scroller — nothing about it moves.
       */}
      <div
        className={styles.footerLayer}
        ref={footerRef}
        /*
         * Full viewport width, so at rest it would paint in the gutters either
         * side of the shell. Held hidden until the shell actually lifts, and
         * faded in over the first 80px of travel — inline, so it tracks the
         * wheel 1:1 the way the transform does.
         */
        style={{
          opacity: Math.min(shellOffset / 80, 1),
          visibility: shellOffset > 0 ? 'visible' : 'hidden',
        }}
      >
        <Footer />
      </div>

      {/*
       * The shell never scrolls; only .scroll inside it does. That is what
       * holds the sidebar and the status row still by construction, rather
       * than by sticky offsets.
       */}
      <div
        className={styles.shell}
        /* -50% is what centres a fixed element; margin auto cannot. */
        style={{ transform: `translate(-50%, ${-shellOffset}px)` }}
      >
        <Sidebar active={active} />

        <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
          <MobileBar active={active} />

          <div className={styles.top}>
            <div className={styles.status}>
              <span className={styles.available}>{profile.statusLabel}</span>
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
              <span className={styles.role}>
                {profile.roleLabelParts.before}
                <span className={styles.roleAccent}>{profile.roleLabelParts.accent}</span>
                {profile.roleLabelParts.after}
              </span>
            </div>

            <div className={styles.toggle}>
              <ThemeToggle />
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.scroll} ref={scrollRef}>
            <div className={styles.reading}>
              <div key={active} className="anim-fade">
                <View />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ViewSwitcher;

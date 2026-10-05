import type { ReactNode } from 'react';
import { marquee } from '@/content/marquee';
import styles from './ToolPopover.module.css';

/*
 * Wraps a phrase in the bio and floats a pill of tool logos above it on hover.
 * The pill is decorative — the sentence carries the meaning — so it is hidden
 * from assistive tech and adds no tab stop; nothing is lost by not reaching it.
 *
 * Motion comes from `.anim-ai-scroll` in globals.css, not from this module: a
 * CSS Module renames every keyframe it references, so `animation: ai-scroll`
 * declared here would resolve to nothing. `marquee-track` is the class the
 * reduced-motion block in globals.css switches off by selector.
 */
export function ToolPopover({ children }: { children: ReactNode }) {
  // Twice through, so the halfway point of the track is a seamless loop.
  const logos = [...marquee, ...marquee];

  return (
    <span className={styles.trigger}>
      {children}

      {marquee.length > 0 && (
        <span className={styles.pill} aria-hidden="true">
          <span className={`${styles.track} marquee-track anim-ai-scroll`}>
            {logos.map((logo, index) => (
              <span key={`${logo.name}-${index}`} className={styles.cell}>
                {/* eslint-disable-next-line @next/next/no-img-element -- 20px inline SVGs; next/image would need dangerouslyAllowSVG. */}
                <img
                  className={styles.logo}
                  src={logo.src}
                  alt={logo.alt ?? logo.name}
                  width={20}
                  height={20}
                  decoding="async"
                  draggable={false}
                />
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

export default ToolPopover;

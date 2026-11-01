import type { CoverArt } from '@/content/types';
import styles from './WaffleCover.module.css';

/*
 * The YouTube Premium case study starts from one finding: 40% of subscribers
 * consider cancelling. A hundred subscribers, forty lit — the number drawn as
 * the thing it counts, filled from the bottom the way a waffle chart is read.
 */

const CELLS = 100;

export function WaffleCover({ art }: { art: Extract<CoverArt, { kind: 'waffle' }> }) {
  const lit = Math.max(0, Math.min(CELLS, Math.round(art.filled)));

  return (
    <>
      <div className={styles.waffle}>
        {Array.from({ length: CELLS }, (_, i) => (
          <span key={i} className={styles.cell} data-on={i >= CELLS - lit ? 'true' : 'false'} />
        ))}
      </div>

      <div className={styles.copy}>
        <div className={styles.top}>
          {art.logo && (
            <span className={styles.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element -- mark, sized by CSS. */}
              <img src={art.logo} alt="" width={32} height={32} />
            </span>
          )}
          <span className={styles.badge}>{art.badge}</span>
        </div>
        <span className={styles.figure}>{art.figure}</span>
        <span className={styles.caption}>{art.caption}</span>
      </div>
    </>
  );
}

export default WaffleCover;

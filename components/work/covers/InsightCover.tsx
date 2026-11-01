import type { CoverArt } from '@/content/types';
import styles from './InsightCover.module.css';

/*
 * The YouTube Premium case study starts from one finding, so the cover is set
 * like the opening page of a feature: the number is the picture. Beneath it
 * runs a ruler — a hundred ticks, forty of them lit — which is the same
 * motif as the ruler gutters either side of the site, and says what a
 * percentage is: so many out of every hundred.
 */

const TICKS = 100;

export function InsightCover({ art }: { art: Extract<CoverArt, { kind: 'insight' }> }) {
  const lit = Math.max(0, Math.min(TICKS, Math.round(art.filled)));
  const hasUnit = art.figure.endsWith('%');
  const number = hasUnit ? art.figure.slice(0, -1) : art.figure;

  return (
    <>
      <span className={styles.badge}>{art.badge}</span>

      <div className={styles.numeral}>
        <span className={styles.digits}>{number}</span>
        {hasUnit && <span className={styles.unit}>%</span>}
      </div>

      <div className={styles.note}>
        {art.logo && (
          <span className={styles.tile}>
            {/* eslint-disable-next-line @next/next/no-img-element -- mark, sized by CSS. */}
            <img src={art.logo} alt="" width={32} height={32} />
          </span>
        )}
        <span className={styles.rule} />
        <span className={styles.caption}>{art.caption}</span>
      </div>

      <div className={styles.ruler}>
        <div className={styles.ticks}>
          {Array.from({ length: TICKS }, (_, i) => (
            <i key={i} data-on={i < lit ? 'true' : 'false'} data-major={i % 10 === 0 ? 'true' : 'false'} />
          ))}
        </div>
        <span className={styles.scale}>Out of every 100 subscribers</span>
      </div>
    </>
  );
}

export default InsightCover;

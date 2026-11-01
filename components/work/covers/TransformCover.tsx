import type { CoverArt } from '@/content/types';
import styles from './TransformCover.module.css';

/*
 * MakeDecks' idea is in its tagline: a deck from what you already have. So the
 * cover is a conversion — three kinds of source on the left, a slide on the
 * right, and the slide is editable (a live selection, with handles, and the
 * rest of the deck waiting below it).
 */

/* Where the three wires start, on the 40 x 25 artboard. */
const WIRES = [
  'M10.6 7.8 C14.2 7.8 14.2 11.2 17.9 11.2',
  'M10.6 13.4 C14.2 13.4 14.2 11.8 17.9 11.8',
  'M10.6 19 C14.2 19 14.2 12.4 17.9 12.4',
];

function Source({ kind, name }: { kind: number; name: string }) {
  return (
    <div className={styles.source} data-kind={kind}>
      <span className={styles.sourceName}>{name}</span>
      {kind === 1 ? (
        <div className={styles.sheet}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} data-head={i < 4 ? 'true' : 'false'} />
          ))}
        </div>
      ) : (
        <div className={styles.page}>
          <i />
          <i />
          <i data-short="true" />
          {kind === 2 && <i data-short="true" />}
        </div>
      )}
    </div>
  );
}

export function TransformCover({ art }: { art: Extract<CoverArt, { kind: 'transform' }> }) {
  return (
    <>
      <svg className={styles.wires} viewBox="0 0 40 25" preserveAspectRatio="none">
        {WIRES.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className={styles.sources}>
        {art.sources.slice(0, 3).map((name, i) => (
          <Source key={name} kind={i} name={name} />
        ))}
      </div>

      <span className={styles.join} />

      <div className={styles.slide}>
        <div className={styles.titleBox}>
          <span className={styles.title} />
          <b data-corner="tl" />
          <b data-corner="tr" />
          <b data-corner="bl" />
          <b data-corner="br" />
        </div>
        <span className={styles.sub} />
        <span className={styles.sub} data-short="true" />
        <div className={styles.chart}>
          <i style={{ height: '38%' }} />
          <i style={{ height: '62%' }} />
          <i style={{ height: '48%' }} />
          <i style={{ height: '82%' }} />
          <i style={{ height: '100%' }} />
        </div>
      </div>

      <div className={styles.strip}>
        <span data-current="true" />
        <span />
        <span />
      </div>
    </>
  );
}

export default TransformCover;

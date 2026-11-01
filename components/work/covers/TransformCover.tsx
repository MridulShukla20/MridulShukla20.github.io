import type { CoverArt } from '@/content/types';
import styles from './TransformCover.module.css';

/*
 * MakeDecks' promise is the line under its name: a deck from what you already
 * have. So the cover is a hand of source material — a PDF, a sheet, a page of
 * notes, fanned like cards — and, across a dashed flow, the one slide it
 * becomes. The slide is live: its title is selected, with handles, because the
 * point is that the result stays editable. The title is one of the sample
 * decks on the product's own page.
 */

function Sheet({ kind, name }: { kind: number; name: string }) {
  return (
    <div className={styles.sheet} data-n={kind + 1}>
      <span className={styles.name}>{name}</span>
      {kind === 1 ? (
        <div className={styles.grid}>
          {Array.from({ length: 20 }, (_, i) => (
            <i key={i} data-head={i < 4 ? 'true' : 'false'} />
          ))}
        </div>
      ) : (
        <div className={styles.text}>
          <i data-heading="true" />
          <i />
          <i />
          <i data-short="true" />
          {kind === 2 && (
            <>
              <i data-gap="true" />
              <i />
              <i data-short="true" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function TransformCover({ art }: { art: Extract<CoverArt, { kind: 'transform' }> }) {
  return (
    <>
      <div className={styles.deck}>
        <span className={styles.under} data-depth="2" />
        <span className={styles.under} data-depth="1" />
      </div>

      <div className={styles.hand}>
        {art.sources.slice(0, 3).map((name, i) => (
          <Sheet key={name} kind={i} name={name} />
        ))}
      </div>

      <svg className={styles.flow} viewBox="0 0 40 25" preserveAspectRatio="none">
        <path d="M12.8 15.6 C14.8 15.6 14.8 12.4 17.2 12.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.node} data-end="start" />
      <span className={styles.node} data-end="end" />

      <div className={styles.slide}>
        <div className={styles.titleBox}>
          <span className={styles.title}>{art.sample}</span>
          <b data-corner="tl" />
          <b data-corner="tr" />
          <b data-corner="bl" />
          <b data-corner="br" />
        </div>
        <span className={styles.sub} />
        <span className={styles.sub} data-short="true" />
        <div className={styles.chart}>
          <i style={{ height: '36%' }} />
          <i style={{ height: '58%' }} />
          <i style={{ height: '46%' }} />
          <i style={{ height: '78%' }} />
          <i style={{ height: '100%' }} />
        </div>
        <svg className={styles.cursor} viewBox="0 0 16 16">
          <path d="M2 1.5 L2 12.5 L5.2 9.6 L7.4 14.2 L9.6 13.2 L7.5 8.7 L12 8.4 Z" />
        </svg>
      </div>
    </>
  );
}

export default TransformCover;

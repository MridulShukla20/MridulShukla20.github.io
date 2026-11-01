import type { CSSProperties } from 'react';
import type { CoverArt } from '@/content/types';
import styles from './LayersCover.module.css';

/*
 * The PRD is about one job: putting the right environment on the right test
 * case. So two layers of one product — behind, the environment types and the
 * allocation they fill; in front, a command palette that does the choosing
 * (a filter with a pattern, rows ticked together, one bulk action). The test
 * cases are bars, not words: the cover names no particular test or device.
 */

/** Which of the three environments each row has landed in. */
const ASSIGNED: boolean[][] = [
  [true, true, false],
  [false, true, false],
  [true, false, true],
];

const NAME_WIDTHS = [74, 58, 82];

export function LayersCover({ art }: { art: Extract<CoverArt, { kind: 'layers' }> }) {
  return (
    <>
      <div className={styles.back}>
        <div className={styles.chrome}>
          <i />
          <i />
          <i />
        </div>

        <div className={styles.body}>
          <ul className={styles.sidebar}>
            {art.columns.map((column, i) => (
              <li key={column} data-active={i === 1 ? 'true' : 'false'}>
                <span className={styles.swatch} />
                {column}
              </li>
            ))}
          </ul>

          <div className={styles.table}>
            <div className={styles.head}>
              <span />
              <i />
              <i />
              <i />
            </div>
            {ASSIGNED.map((cells, row) => (
              <div key={row} className={styles.row}>
                <span
                  className={styles.nameBar}
                  style={{ '--w': `${NAME_WIDTHS[row]}%` } as CSSProperties}
                />
                {cells.map((on, col) => (
                  <span key={col} className={on ? styles.assigned : styles.empty} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.palette}>
        <div className={styles.query}>
          <span className={styles.glass} />
          <span className={styles.filter}>{art.filter}</span>
          <span className={styles.pattern}>{art.pattern}</span>
          <span className={styles.badge}>{art.badge}</span>
        </div>

        <ul className={styles.results}>
          {art.columns.map((column, i) => (
            <li key={column} data-on={i < 2 ? 'true' : 'false'}>
              <span className={styles.check} data-on={i < 2 ? 'true' : 'false'} />
              <span
                className={styles.resultBar}
                style={{ '--w': `${NAME_WIDTHS[i]}%` } as CSSProperties}
              />
              <span className={styles.env}>{column}</span>
            </li>
          ))}
        </ul>

        <div className={styles.foot}>
          <span className={styles.count}>{art.selected}</span>
          <span className={styles.action}>
            {art.action}
            <kbd>↵</kbd>
          </span>
        </div>
      </div>
    </>
  );
}

export default LayersCover;

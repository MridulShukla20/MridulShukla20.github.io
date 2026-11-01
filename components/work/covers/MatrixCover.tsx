import type { CSSProperties } from 'react';
import type { CoverArt } from '@/content/types';
import styles from './MatrixCover.module.css';

/*
 * The PRD's problem is a grid: test cases down one side, the three kinds of
 * environment across the top, and someone deciding which cell each belongs in.
 * The solution is the cover — a filter, rows ticked together, one bulk action,
 * and the allocation filling itself in.
 *
 * `ASSIGNED[row]` is which of the three columns that row has landed in.
 */
const ASSIGNED: boolean[][] = [
  [true, true, false],
  [false, true, false],
  [true, false, true],
  [false, false, false],
];

/** Test-case names are bars, not words: the cover claims no particular test. */
const NAME_WIDTHS = [72, 58, 80, 64];

const SELECTED_ROWS = 3;

export function MatrixCover({ art }: { art: Extract<CoverArt, { kind: 'matrix' }> }) {
  return (
    <>
      <div className={styles.panel}>
        <div className={styles.bar}>
          <span className={styles.field}>
            <span className={styles.fieldName}>{art.filter}</span>
            <span className={styles.pattern}>{art.pattern}</span>
          </span>
          <span className={styles.badge}>{art.badge}</span>
        </div>

        <div className={styles.table}>
          <div className={styles.head}>
            <span />
            {art.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>

          {ASSIGNED.map((cells, row) => (
            <div key={row} className={styles.row} data-selected={row < SELECTED_ROWS ? 'true' : 'false'}>
              <span className={styles.name}>
                <span className={styles.check} data-on={row < SELECTED_ROWS ? 'true' : 'false'} />
                <span
                  className={styles.nameBar}
                  style={{ '--w': `${NAME_WIDTHS[row]}%` } as CSSProperties}
                />
              </span>
              {cells.map((on, col) => (
                <span key={col} className={on ? styles.assigned : styles.empty} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bulk}>
        <span className={styles.count}>{art.selected}</span>
        <span className={styles.rule} />
        <span className={styles.action}>{art.action}</span>
      </div>
    </>
  );
}

export default MatrixCover;

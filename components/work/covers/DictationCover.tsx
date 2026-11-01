import type { CSSProperties } from 'react';
import type { CoverArt } from '@/content/types';
import styles from './DictationCover.module.css';

/*
 * ezflow's one idea: hold a key, and words appear in the app in front of you —
 * and none of it leaves the machine. The window is generic on purpose (any app
 * will do, that is the point), the key is held down, and the dashed outline is
 * the edge of the Mac.
 */

const WAVE = [
  0.25, 0.4, 0.3, 0.6, 0.45, 0.8, 0.55, 1, 0.7, 0.9, 0.5, 0.75, 0.4, 0.6, 0.3, 0.45, 0.25, 0.35,
];

/* Text arriving: the lines fade as they get further from the caret. */
const LINES: { w: number; o: number }[] = [
  { w: 88, o: 0.95 },
  { w: 94, o: 0.8 },
  { w: 72, o: 0.55 },
  { w: 38, o: 0.35 },
];

export function DictationCover({ art }: { art: Extract<CoverArt, { kind: 'dictation' }> }) {
  return (
    <>
      <div className={styles.boundary}>
        <span className={styles.boundaryTag}>{art.boundary}</span>
      </div>

      <div className={styles.window}>
        <div className={styles.chrome}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.lines}>
          {LINES.map((line, i) => (
            <div key={i} className={styles.row}>
              <span
                className={styles.line}
                style={{ '--w': `${line.w}%`, '--o': line.o } as CSSProperties}
              />
              {i === LINES.length - 1 && <span className={styles.caret} />}
            </div>
          ))}
        </div>
      </div>

      <span className={styles.drop} />

      <span className={styles.keycap}>
        <b>{art.key}</b>
      </span>

      <div className={styles.wave}>
        {WAVE.map((level, i) => (
          <span key={i} style={{ '--h': level } as CSSProperties} />
        ))}
      </div>

      <div className={styles.metric}>
        <span className={styles.value}>{art.metric}</span>
        <span className={styles.metricLabel}>{art.metricLabel}</span>
      </div>
    </>
  );
}

export default DictationCover;

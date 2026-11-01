import type { CSSProperties } from 'react';
import type { CoverArt } from '@/content/types';
import styles from './DictationCover.module.css';

/*
 * ezflow, as a line with three stops: a voice, a model on the Mac, and text.
 * The ring is the voice — a waveform bent round the key that is held down. The
 * chip is the model, with its pins out. The window is wherever the words land.
 * The dashed outline around all of it is the claim the product makes: none of
 * this leaves the machine. The number underneath is the speed it reports.
 */

/** A voice has a loud middle and quiet ends; the ring wraps the same shape twice. */
const RING = Array.from({ length: 56 }, (_, i) => {
  const a = (i / 56) * Math.PI * 2;
  return 0.18 + 0.82 * Math.abs(Math.sin(a * 3.5 + 0.6) * Math.cos(a * 1.5));
});

const PINS = [0, 1, 2, 3, 4];

/* The text resolves: solid where it has landed, dotted where it is still arriving. */
const LINES: { w: number; solid: boolean }[] = [
  { w: 90, solid: true },
  { w: 78, solid: true },
  { w: 84, solid: true },
  { w: 46, solid: false },
];

export function DictationCover({ art }: { art: Extract<CoverArt, { kind: 'dictation' }> }) {
  const [from, via, to] = art.stages;

  return (
    <>
      <div className={styles.boundary}>
        <span className={styles.boundaryTag}>{art.boundary}</span>
      </div>

      <svg className={styles.wire} viewBox="0 0 40 25" preserveAspectRatio="none">
        <path d="M13.9 11.7 H15.9" vectorEffect="non-scaling-stroke" />
        <path d="M24.1 11.7 H26.3" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Voice */}
      <div className={styles.voice}>
        <svg viewBox="0 0 100 100">
          {RING.map((level, i) => (
            <line
              key={i}
              x1="50"
              y1={50 - 28}
              x2="50"
              y2={50 - 28 - level * 20}
              transform={`rotate(${(i / RING.length) * 360} 50 50)`}
              style={{ opacity: 0.35 + level * 0.65 }}
            />
          ))}
        </svg>
        <span className={styles.keycap}>
          <b>{art.key}</b>
        </span>
      </div>
      <span className={styles.stage} data-n="1">
        <b>{from}</b>
      </span>

      {/* Model */}
      <div className={styles.chip}>
        {(['t', 'r', 'b', 'l'] as const).map((side) =>
          PINS.map((p) => <i key={side + p} data-side={side} style={{ '--p': p } as CSSProperties} />),
        )}
        <span className={styles.die}>
          <span className={styles.core} />
        </span>
      </div>
      <span className={styles.stage} data-n="2">
        <b>{via}</b>
      </span>

      {/* Text */}
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
                data-solid={line.solid ? 'true' : 'false'}
                style={{ '--w': `${line.w}%` } as CSSProperties}
              />
              {i === LINES.length - 1 && <span className={styles.caret} />}
            </div>
          ))}
        </div>
      </div>
      <span className={styles.stage} data-n="3">
        <b>{to}</b>
      </span>

      <div className={styles.metric}>
        <span className={styles.span} aria-hidden="true" />
        <span className={styles.value}>{art.metric}</span>
        <span className={styles.metricLabel}>{art.metricLabel}</span>
      </div>
    </>
  );
}

export default DictationCover;

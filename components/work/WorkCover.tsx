import type { ComponentType } from 'react';
import type { CoverArt, WorkItem } from '@/content/types';
import { DictationCover } from './covers/DictationCover';
import { FlowCover } from './covers/FlowCover';
import { InsightCover } from './covers/InsightCover';
import { LayersCover } from './covers/LayersCover';
import { TransformCover } from './covers/TransformCover';
import styles from './WorkCover.module.css';

type Kind = CoverArt['kind'];

/* Each cover takes the art that names it — the registry is what keeps that honest. */
const COVERS: { [K in Kind]: ComponentType<{ art: Extract<CoverArt, { kind: K }> }> } = {
  dictation: DictationCover,
  insight: InsightCover,
  layers: LayersCover,
  transform: TransformCover,
  flow: FlowCover,
};

/** One accent a cover, from the tokens already in the site. */
const ACCENT: Record<Kind, 'blue' | 'amber' | 'green'> = {
  dictation: 'blue',
  insight: 'amber',
  layers: 'green',
  transform: 'blue',
  flow: 'amber',
};

function Art({ art }: { art: CoverArt }) {
  const Cover = COVERS[art.kind] as ComponentType<{ art: CoverArt }>;
  return <Cover art={art} />;
}

/*
 * The thumbnail. A real image wins when one is set; otherwise the cover is the
 * bespoke composition for that item's `cover.art`. `size` is kept for the
 * callers — the picture scales itself from the width it is given.
 */
export function WorkCover({ item }: { item: WorkItem; size?: 'card' | 'hero' }) {
  const { image, art } = item.cover;

  return (
    <div
      className={styles.cover}
      data-accent={art ? ACCENT[art.kind] : undefined}
      data-kind={art?.kind}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- 16:10 cover, cropped by CSS.
        <img className={styles.image} src={image} alt="" loading="lazy" decoding="async" />
      ) : (
        art && (
          <>
            <span className={styles.lamp} aria-hidden="true" />
            {art.kind === 'dictation' && <span className={styles.grid} aria-hidden="true" />}
            <span className={styles.grain} aria-hidden="true" />
            <div className={styles.board} aria-hidden="true">
              <span className={styles.label}>{art.label}</span>
              <Art art={art} />
            </div>
          </>
        )
      )}
    </div>
  );
}

export default WorkCover;

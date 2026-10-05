import { Fragment } from 'react';
import { Reveal } from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/icons';
import type { Project } from '@/content/types';
import { isVisible } from '@/lib/content';
import styles from './CaseStudyList.module.css';

/** Cards reveal in order, 40ms apart. Reveal caps the run at four steps. */
const STAGGER = 40;

/*
 * The showcase card, shared by the case-studies and projects tabs. Each tab
 * hands in its own list; an empty one renders an empty column — no stub, no
 * heading.
 */
export function CaseStudyList({ items }: { items: Project[] }) {
  const visible = items.filter((item) => isVisible(item.status));

  return (
    <div className={styles.list}>
      {visible.map((item, index) => (
        <Fragment key={item.id}>
          {/* Hatched bands between cards, never above the first or below the last. */}
          {index > 0 && <div className={styles.hatch} aria-hidden="true" />}

          <Reveal delay={STAGGER * index}>
            <article className={styles.card}>
              <div className={styles.body}>
                <div className={styles.org}>
                  {/* The tile is the lockup; the mark sits inset inside it. */}
                  <span className={styles.logoTile}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- favicon, sized by CSS. */}
                    <img className={styles.logo} src={item.logo} alt="" width={32} height={32} />
                  </span>
                  <span className={styles.orgName}>{item.org}</span>
                </div>

                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>

                {item.stat && (
                  <>
                    <div className={styles.separator} aria-hidden="true" />
                    <div className={styles.stat}>
                      <div className={styles.statRow}>
                        <span className={styles.statValue}>{item.stat.value}</span>
                        <span className={styles.badge}>{item.stat.badge}</span>
                      </div>
                      <p className={styles.statLabel}>{item.stat.label}</p>
                    </div>
                  </>
                )}

                <a className={styles.cta} href={item.href} target="_blank" rel="noreferrer noopener">
                  {item.ctaLabel}
                  <span className={styles.ctaIcon} aria-hidden="true">
                    <ArrowRightIcon size={16} />
                  </span>
                </a>
              </div>

              {/*
                The stage. Decorative — the title and description carry the
                meaning. Its tint is the thumbnail itself, blurred and dimmed:
                a desaturated wash of that project's own palette, so every card
                gets its accent without any card being coloured by hand.
              */}
              <div className={styles.stage}>
                {/* eslint-disable-next-line @next/next/no-img-element -- blurred wash, sized by CSS. */}
                <img
                  className={styles.tint}
                  src={item.thumbnail}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                {/* eslint-disable-next-line @next/next/no-img-element -- 4:3 card art, cropped by CSS. */}
                <img
                  className={styles.mock}
                  src={item.thumbnail}
                  alt=""
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </Reveal>
        </Fragment>
      ))}
    </div>
  );
}

export default CaseStudyList;

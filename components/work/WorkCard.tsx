import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import type { WorkItem } from '@/content/types';
import { CategoryTag } from './CategoryTag';
import { WorkCover } from './WorkCover';
import styles from './WorkCard.module.css';

/*
 * One card for every kind of work. The whole card is the link: the title's
 * anchor stretches over it, so there is a single tab stop and a single name
 * for a screen reader, and the cover stays a plain picture.
 */
export function WorkCard({ item, featured = false }: { item: WorkItem; featured?: boolean }) {
  return (
    <article className={styles.card} data-featured={featured ? 'true' : 'false'} data-work-card>
      <WorkCover item={item} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <CategoryTag category={item.category} />
          {item.org && <span className={styles.org}>{item.org}</span>}
        </div>

        <h2 className={styles.title}>
          <Link className={styles.link} href={`/work/${item.slug}`}>
            {item.title}
          </Link>
        </h2>
        <p className={styles.summary}>{item.summary}</p>

        <div className={styles.foot}>
          {item.skills.length > 0 && (
            <p className={styles.skills}>{item.skills.join(' · ')}</p>
          )}
          <span className={styles.arrow} aria-hidden="true">
            <ArrowRightIcon size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default WorkCard;

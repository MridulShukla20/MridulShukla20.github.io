import { Reveal } from '@/components/Reveal';
import { workIntro } from '@/content/work';
import { hasCopy } from '@/lib/content';
import { visibleWork } from '@/lib/work';
import { WorkCard } from './WorkCard';
import styles from './WorkList.module.css';

/** Cards reveal in order, 40ms apart. Reveal caps the run at four steps. */
const STAGGER = 40;

/*
 * Featured work: the first item runs the full width, the rest sit two across.
 * An empty list renders nothing — no heading, no stub.
 */
export function WorkList() {
  const items = visibleWork();
  if (items.length === 0) return null;

  const [lead, ...rest] = items;

  return (
    <section className={styles.section} aria-labelledby="work-heading">
      <header className={styles.header}>
        {hasCopy(workIntro.label) && <p className={styles.label}>{workIntro.label}</p>}
        {hasCopy(workIntro.heading) && (
          <h1 id="work-heading" className={styles.heading}>
            {workIntro.heading}
          </h1>
        )}
        {hasCopy(workIntro.lede) && <p className={styles.lede}>{workIntro.lede}</p>}
      </header>

      <div className={styles.grid}>
        <Reveal className={styles.lead}>
          <WorkCard item={lead} featured />
        </Reveal>

        {rest.map((item, index) => (
          <Reveal key={item.slug} delay={STAGGER * (index % 2)} className={styles.cell}>
            <WorkCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default WorkList;

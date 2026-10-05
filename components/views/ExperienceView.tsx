import { Reveal } from '@/components/Reveal';
import { experience } from '@/content/experience';
import { hasCopy, isVisible, tenure } from '@/lib/content';
import styles from './ExperienceView.module.css';

/** Entries reveal in order, 40ms apart. Reveal caps the run at four steps. */
const STAGGER = 40;

export function ExperienceView() {
  /* The handwritten "Next?" row belongs to the home summary, not to a résumé. */
  const entries = experience.filter((entry) => !entry.annotation && isVisible(entry.status));

  return (
    <div className="view-inner">
      {/* The rail runs the full height of the list; each logo is a node on it. */}
      <ol className={styles.timeline}>
        {entries.map((entry, index) => {
          const employment = entry.employment && hasCopy(entry.employment) ? entry.employment : '';
          const location = entry.location && hasCopy(entry.location) ? entry.location : '';
          const span = entry.start && entry.end ? tenure(entry.start, entry.end) : '';
          const bullets = entry.bullets ?? [];

          return (
            <li key={entry.id} className={styles.entry}>
              <Reveal delay={STAGGER * index} className={styles.grid}>
                {entry.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element -- 32px favicon, sized by CSS. */
                  <img className={styles.logo} src={entry.logo} alt="" width={32} height={32} />
                ) : (
                  <span className={`${styles.logo} ${styles.logoEmpty}`} aria-hidden="true" />
                )}

                <div className={styles.head}>
                  <span className={styles.company}>{entry.company}</span>
                  {employment && (
                    <>
                      <span className={styles.dot} aria-hidden="true">
                        ·
                      </span>
                      <span className={styles.employment}>{employment}</span>
                    </>
                  )}
                </div>

                <h2 className={styles.role}>{entry.role}</h2>

                {/* Dates set upper, the rest as written — one line, one colour. */}
                <p className={styles.meta}>
                  <span className={styles.dates}>{entry.dateLong}</span>
                  {location && (
                    <>
                      <span className={styles.dot} aria-hidden="true">
                        ·
                      </span>
                      <span>{location}</span>
                    </>
                  )}
                  {span && (
                    <>
                      <span className={styles.dot} aria-hidden="true">
                        ·
                      </span>
                      <span>{span}</span>
                    </>
                  )}
                </p>

                {bullets.length > 0 && (
                  <ul className={styles.bullets}>
                    {bullets.map((bullet) => (
                      <li key={bullet} className={styles.bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* The "/////" band that closes the block, as it does on home. Nothing to close if the list is empty. */}
      {entries.length > 0 && <div className={styles.hatch} aria-hidden="true" />}
    </div>
  );
}

export default ExperienceView;

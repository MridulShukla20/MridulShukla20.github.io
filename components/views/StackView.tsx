import { Reveal } from '@/components/Reveal';
import { stack, stackIntro } from '@/content/stack';
import { hasCopy } from '@/lib/content';
import styles from './StackView.module.css';

/** Blocks reveal in order, 40ms apart. Reveal caps the run at four steps. */
const STAGGER = 40;

export function StackView() {
  /* An empty group is a group with nothing to say — it does not get a row. */
  const groups = stack.filter((group) => group.items.length > 0);

  return (
    <div className="view-inner">
      <div className={styles.stack}>
        {/*
          Header. Echoes the home masthead — micro label, heading, the same
          rule that holds solid across the measure and lets go at the right.
        */}
        <Reveal delay={0}>
          <header className={styles.head}>
            <p className={styles.label}>{stackIntro.label}</p>

            <h1 className={styles.heading}>
              {stackIntro.heading.before}
              <span className={styles.accent}>{stackIntro.heading.accent}</span>
              {stackIntro.heading.after}
            </h1>

            <div className={styles.rule} aria-hidden="true" />

            {hasCopy(stackIntro.lede) && <p className={styles.lede}>{stackIntro.lede}</p>}
          </header>
        </Reveal>

        {/*
          One row per group: the category annotates from the left column, the
          pills carry the content on the right. The label column is a fixed
          width, so every row's pills start on the same x.
        */}
        {groups.length > 0 && (
          <ol className={styles.groups}>
            {groups.map((group, index) => (
              <li key={group.title}>
                <Reveal delay={STAGGER * (index + 1)} className={styles.row}>
                  <h2 className={styles.groupTitle}>{group.title}</h2>

                  <ul className={styles.pills}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.pill}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        )}

        {/* The "/////" band that closes the block, as on home and experience. */}
        {groups.length > 0 && <div className={styles.hatch} aria-hidden="true" />}
      </div>
    </div>
  );
}

export default StackView;

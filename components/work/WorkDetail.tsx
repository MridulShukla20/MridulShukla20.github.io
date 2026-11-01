import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';
import type { WorkItem } from '@/content/types';
import { hasCopy } from '@/lib/content';
import { adjacentWork } from '@/lib/work';
import { CategoryTag } from './CategoryTag';
import { WorkCover } from './WorkCover';
import styles from './WorkDetail.module.css';

/*
 * The page behind a card. Every block is optional: a field left out, or left
 * as PLACEHOLDER, takes its whole block with it.
 */
export function WorkDetail({ item }: { item: WorkItem }) {
  const neighbours = adjacentWork(item.slug);
  const facts = (item.facts ?? []).filter((fact) => hasCopy(fact.value));
  const sections = (item.sections ?? []).filter((section) => hasCopy(section.heading));
  const links = item.links ?? [];
  const overview = hasCopy(item.overview ?? '') ? item.overview : item.summary;

  return (
    <div className="view-inner">
      <article className={`case-col ${styles.page}`}>
        <Link className={styles.back} href="/#work">
          <ArrowLeftIcon size={16} />
          Featured work
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <CategoryTag category={item.category} />
            {item.org && <span className={styles.org}>{item.org}</span>}
          </div>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.overview}>{overview}</p>

          {links.length > 0 && (
            <div className={styles.actions}>
              {links.map((link, index) => (
                <a
                  key={link.href}
                  className={styles.cta}
                  data-primary={index === 0 ? 'true' : 'false'}
                  href={link.href}
                  {...(link.external && { target: '_blank', rel: 'noreferrer noopener' })}
                >
                  {link.label}
                  <span className={styles.ctaIcon} aria-hidden="true">
                    <ArrowUpRightIcon size={16} />
                  </span>
                </a>
              ))}
            </div>
          )}
        </header>

        <Reveal>
          <div className={styles.hero}>
            <WorkCover item={item} size="hero" />
          </div>
        </Reveal>

        {(facts.length > 0 || item.skills.length > 0) && (
          <Reveal>
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
              {item.skills.length > 0 && (
                <div className={styles.fact}>
                  <dt>Skills</dt>
                  <dd>{item.skills.join(' · ')}</dd>
                </div>
              )}
            </dl>
          </Reveal>
        )}

        {sections.map((section) => (
          <Reveal key={section.heading}>
            <section className={styles.section}>
              <h2 className={styles.heading}>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={styles.body}>
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}

        {item.preview && (
          <Reveal>
            <section className={`${styles.section} ${styles.document}`}>
              <h2 className={styles.heading}>The document</h2>
              <iframe className={styles.frame} src={item.preview.src} title={item.preview.title} loading="lazy" />
            </section>
          </Reveal>
        )}

        {neighbours && (
          <nav className={styles.pager} aria-label="More work">
            <Link className={styles.pagerLink} data-dir="previous" href={`/work/${neighbours.previous.slug}`}>
              <span className={styles.pagerLabel}>
                <ArrowLeftIcon size={14} />
                Previous
              </span>
              <span className={styles.pagerTitle}>{neighbours.previous.title}</span>
            </Link>
            <Link className={styles.pagerLink} data-dir="next" href={`/work/${neighbours.next.slug}`}>
              <span className={styles.pagerLabel}>
                Next
                <ArrowRightIcon size={14} />
              </span>
              <span className={styles.pagerTitle}>{neighbours.next.title}</span>
            </Link>
          </nav>
        )}
      </article>
    </div>
  );
}

export default WorkDetail;

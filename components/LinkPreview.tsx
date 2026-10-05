import type { LinkPreview as LinkPreviewData } from '@/content/types';
import styles from './LinkPreview.module.css';

/** Derived rather than stored, so it can never drift from the href. */
function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

/*
 * The card is decorative — the link text and its href carry the meaning — so
 * it is hidden from assistive tech. It shows on focus as well as hover, since
 * the link itself is a tab stop.
 *
 * A screenshot fills the card by itself; the title/host block is the fallback
 * for entries that have no shot.
 */
export function LinkPreview({ link }: { link: LinkPreviewData }) {
  return (
    <a
      className={styles.link}
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {link.label}

      <span className={styles.card} aria-hidden="true">
        {link.image ? (
          /* eslint-disable-next-line @next/next/no-img-element -- decorative card art, sized by CSS. */
          <img className={styles.shot} src={link.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className={styles.body}>
            <span className={styles.title}>{link.title ?? link.label}</span>
            {link.description && <span className={styles.description}>{link.description}</span>}
            <span className={styles.host}>{hostOf(link.href)}</span>
          </span>
        )}
      </span>
    </a>
  );
}

export default LinkPreview;

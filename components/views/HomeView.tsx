'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CopyIcon, DownloadIcon } from '@/components/icons';
import { Reveal } from '@/components/Reveal';
import { LinkPreview } from '@/components/LinkPreview';
import { ToolPopover } from '@/components/ToolPopover';
import { about } from '@/content/about';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { hasCopy, isVisible } from '@/lib/content';
import styles from './HomeView.module.css';

/** Blocks reveal in order, 40ms apart. Reveal caps the run at four steps. */
const STAGGER = 40;

/** How long "Copied" holds before the label reverts. */
const COPIED_MS = 1600;

/*
 * Separators sit a step quieter than the words, and the closing phrase quieter
 * still — it is the aside, and it lifts to meet the others when the masthead is
 * hovered. Spacing comes from the separator's margin, not from literal spaces.
 */
function subtitleParts(subtitle: string): ReactNode[] {
  const parts = subtitle.split('·').map((part) => part.trim());

  return parts.flatMap((part, index) => {
    const word = (
      <span
        key={`part-${index}`}
        className={index === parts.length - 1 ? styles.subtitleAside : undefined}
      >
        {part}
      </span>
    );

    if (index === 0) return [word];

    return [
      <span key={`sep-${index}`} className={styles.subtitleSep} aria-hidden="true">
        ·
      </span>,
      word,
    ];
  });
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Denied clipboard permission is not worth an error state here.
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  const label = copied ? 'Copied' : 'Copy email';

  return (
    /* The address itself is not printed — the button carries it. */
    <button
      type="button"
      className={styles.copy}
      onClick={copy}
      title={profile.email}
      aria-label={`Copy email address ${profile.email}`}
    >
      {/* Keyed so the swap remounts and replays the fade. */}
      <span key={label} className="anim-fade" aria-live="polite">
        {label}
      </span>
      <CopyIcon size={16} />
    </button>
  );
}

export function HomeView() {
  const hasResume = hasCopy(profile.resumeUrl);

  return (
    <div className="view-inner">
      <div className={styles.home}>
        {/*
          Masthead. One line, set large and tracked in so the name reads as a
          nameplate rather than a heading; the ✦ that used to be its own divider
          row is now the mark that closes it.
        */}
        <Reveal delay={0}>
          <header className={styles.masthead}>
            <h1 className={styles.name}>
              {profile.name}
              <span className={styles.mark} aria-hidden="true">
                ✦
              </span>
            </h1>

            <div className={styles.mastheadRule} aria-hidden="true" />

            <p className={styles.subtitle}>{subtitleParts(profile.subtitle)}</p>
          </header>
        </Reveal>

        {/* Bio. The accent phrase floats the tool pill above it on hover. */}
        <Reveal delay={STAGGER}>
          <p className={styles.bio}>
            {profile.bio.before}
            <ToolPopover>{profile.bio.accent}</ToolPopover>
            {profile.bio.after}
          </p>
        </Reveal>

        {/* Dashed separator */}
        <Reveal delay={STAGGER * 2} className={styles.sepBlock}>
          <div className={styles.separator} aria-hidden="true" />
        </Reveal>

        {/* Current work. The company name floats a preview card on hover. */}
        <Reveal delay={STAGGER * 3}>
          <p className={styles.prose}>
            {profile.currentWork.before}
            <LinkPreview link={profile.currentWork.link} />
            {profile.currentWork.after}
          </p>
        </Reveal>

        {/* Off the clock. Nothing renders until the copy is written. */}
        {hasCopy(profile.offTheClock) && (
          <Reveal delay={STAGGER * 4}>
            <p className={styles.prose}>{profile.offTheClock}</p>
          </Reveal>
        )}

        {/*
          Experience. Hatched bands top and bottom set the block apart from the
          prose either side of it, and the actions row sits inside them.
        */}
        <Reveal delay={STAGGER * 5}>
          <section className={styles.expSection}>
            <div className={styles.hatch} aria-hidden="true" />

            <div className={styles.expHead}>
              <p className={styles.sectionLabel}>Experience</p>
              {profile.available && (
                <span className={styles.statusPill}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {profile.statusLabel}
                </span>
              )}
            </div>

            <ul className={styles.expList}>
              {experience.filter((entry) => isVisible(entry.status)).map((entry) => (
                <li
                  key={entry.id}
                  className={[styles.expRow, entry.annotation && styles.expNext]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={styles.expCompany}>
                    {entry.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element -- 28px favicon, sized by CSS. */
                      <img className={styles.expLogo} src={entry.logo} alt="" width={28} height={28} />
                    ) : (
                      <span className={styles.expLogoEmpty} aria-hidden="true" />
                    )}
                    <span className={styles.expName}>{entry.company}</span>
                  </span>

                  <span className={styles.expRole}>{entry.role}</span>
                  <span className={styles.expDate}>
                    {/* Only one of the pair is ever displayed, so only one is read out. */}
                    <span className={styles.dateLong}>{entry.dateLong}</span>
                    <span className={styles.dateShort}>{entry.dateShort}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              {hasResume ? (
                <a
                  className={styles.resume}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Get resume
                  <DownloadIcon size={16} />
                </a>
              ) : (
                <span className={`${styles.resume} ${styles.resumeDisabled}`} aria-disabled="true">
                  Get resume
                  <DownloadIcon size={16} />
                </span>
              )}

              <CopyEmail />
            </div>

            <div className={styles.hatch} aria-hidden="true" />
          </section>
        </Reveal>

        {/* About. Hidden entirely while its copy is unwritten. */}
        {(hasCopy(about.heading) || about.paragraphs.some(hasCopy)) && (
          <Reveal delay={STAGGER * 6}>
            <section>
              <p className={styles.sectionLabel}>About</p>
              {hasCopy(about.heading) && (
                <h3 className={styles.aboutHeading}>{about.heading}</h3>
              )}
              <div className={styles.aboutBody}>
                {about.paragraphs.filter(hasCopy).map((paragraph, index) => (
                  <p key={index} className={styles.prose}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default HomeView;

'use client';

import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { profile } from '@/content/profile';
import styles from './Socials.module.css';

const LINKS = [
  { key: 'github', label: 'GitHub', href: profile.socials.github, Icon: GitHubIcon },
  { key: 'linkedin', label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedInIcon },
] as const;

export function Socials({ className }: { className?: string }) {
  return (
    <div className={[styles.socials, className].filter(Boolean).join(' ')}>
      {LINKS.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          className={styles.social}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export default Socials;

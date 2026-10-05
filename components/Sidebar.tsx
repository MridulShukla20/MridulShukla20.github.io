'use client';

import { Clock } from '@/components/Clock';
import { NavTabs } from '@/components/NavTabs';
import { Socials } from '@/components/Socials';
import { profile } from '@/content/profile';
import type { TabId } from '@/lib/nav';
import styles from './Sidebar.module.css';

/**
 * The only navigation on desktop. Hidden below 1012px, where MobileBar and its
 * sheet take over.
 */
export function Sidebar({ active }: { active: TabId }) {
  return (
    <aside className={styles.sidebar}>
      <NavTabs active={active} label="Sections" variant="sidebar" />

      <div className={styles.spacer} />

      <div className={styles.foot}>
        <Socials />
        <div className={styles.meta}>
          <Clock />
          <span>{profile.location}</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

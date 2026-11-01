/**
 * The single source of truth for navigation.
 * The sidebar and the mobile sheet both read from here.
 */

export const TABS = [
  { id: 'home', label: 'home' },
  { id: 'experience', label: 'experience' },
  { id: 'stack', label: 'stack' },
  { id: 'work', label: 'featured work' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

export const DEFAULT_TAB: TabId = 'home';

/** Projects and case studies became one tab; old links still land on it. */
const LEGACY: Record<string, TabId> = {
  projects: 'work',
  'case-studies': 'work',
};

export function isTabId(value: string): value is TabId {
  return TABS.some((tab) => tab.id === value);
}

/** Resolves any hash — including an empty or unknown one — to a real tab. */
export function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, '');
  if (isTabId(id)) return id;
  return LEGACY[id] ?? DEFAULT_TAB;
}

/*
 * Rooted, so the same link works from a detail page: on `/` it is a plain hash
 * change, anywhere else it is a navigation back to the shell.
 */
export function hrefFor(id: TabId): string {
  return `/#${id}`;
}

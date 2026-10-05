/**
 * The single source of truth for navigation.
 * The sidebar and the mobile sheet both read from here.
 */

export const TABS = [
  { id: 'home', label: 'home' },
  { id: 'experience', label: 'experience' },
  { id: 'stack', label: 'stack' },
  { id: 'projects', label: 'projects' },
  { id: 'case-studies', label: 'case studies' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

export const DEFAULT_TAB: TabId = 'home';

export function isTabId(value: string): value is TabId {
  return TABS.some((tab) => tab.id === value);
}

/** Resolves any hash — including an empty or unknown one — to a real tab. */
export function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, '');
  return isTabId(id) ? id : DEFAULT_TAB;
}

export function hrefFor(id: TabId): string {
  return `#${id}`;
}

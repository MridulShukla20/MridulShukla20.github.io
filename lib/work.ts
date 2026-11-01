import { work } from '@/content/work';
import type { WorkItem } from '@/content/types';
import { isVisible } from '@/lib/content';

export function visibleWork(): WorkItem[] {
  return work.filter((item) => isVisible(item.status));
}

export function workBySlug(slug: string): WorkItem | undefined {
  return visibleWork().find((item) => item.slug === slug);
}

/** The neighbours in list order, wrapping at both ends. Null when there is only one item. */
export function adjacentWork(slug: string): { previous: WorkItem; next: WorkItem } | null {
  const items = visibleWork();
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1 || items.length < 2) return null;
  return {
    previous: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
  };
}

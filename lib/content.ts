import type { Status } from '@/content/types';

/**
 * Drafts are visible while developing and hidden in production builds.
 * Everything else is always visible.
 */
export function isVisible(status: Status): boolean {
  if (status === 'draft') return process.env.NODE_ENV !== 'production';
  return true;
}

/**
 * Copy that has not been written yet. PLACEHOLDER is the marker used across
 * content/, and a block with nothing to say renders nothing rather than
 * printing the marker.
 */
export function hasCopy(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== 'PLACEHOLDER';
}

/**
 * "1 year 1 month", "5 months" — from two ISO months, counted inclusively
 * the way a résumé counts them: Jun to Oct is five months, not four.
 * Returns '' for anything it cannot parse, so a bad value renders nothing
 * rather than "NaN months".
 */
export function tenure(start: string, end: string): string {
  const parse = (value: string): number | null => {
    const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
    if (!match) return null;
    return Number(match[1]) * 12 + (Number(match[2]) - 1);
  };

  const from = parse(start);
  const to = parse(end);
  if (from === null || to === null || to < from) return '';

  const months = to - from + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? 'month' : 'months'}`);
  return parts.join(' ');
}

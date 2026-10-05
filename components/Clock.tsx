'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/content/profile';

/* Rendered on the server and during hydration, then replaced on the first tick. */
const PLACEHOLDER = '--:--';
const REFRESH_MS = 30_000;

function timeIn(timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(new Date());

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';

  return `${part('hour')}:${part('minute')} ${part('dayPeriod').toUpperCase()}`;
}

/**
 * The clock is the one piece of the shell that cannot be rendered on the server,
 * so it renders a placeholder there and fills in after mount — no mismatch.
 */
export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setTime(timeIn(profile.timezone));
    tick();
    const id = window.setInterval(tick, REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  return <span className={className}>{time}</span>;
}

export default Clock;

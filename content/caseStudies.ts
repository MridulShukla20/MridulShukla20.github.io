import type { CaseStudy } from './types';

/*
 * Newest first. The stat is the number the card leads with — its badge says
 * what kind of number it is, so a research finding is never dressed up as a
 * shipped result.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'youtube-premium',
    org: 'YouTube Premium',
    logo: '/companies/youtube.png',
    title: 'Premium-Exclusive Content Hub',
    description:
      'Turning inactive Premium subscribers into habitual viewers with a members-only ' +
      'home for exclusive and early-access content.',
    stat: {
      value: '40%',
      badge: 'Research insight',
      label: 'of subscribers consider cancelling over a lack of unique value',
    },
    href: '/case-studies/youtube-premium.pdf',
    ctaLabel: 'read case study',
    thumbnail: '/case-studies/youtube-premium-thumb.webp',
    tags: [],
    status: 'live',
  },
];

export default caseStudies;

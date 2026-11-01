import type { ExperienceEntry } from './types';

/**
 * Newest first. The leading entry is the handwritten annotation row on the
 * home view, not a real post — `annotation` is what sets its type apart, and
 * the experience view leaves it out.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'next',
    company: 'Next?',
    logo: '',
    role: 'Your next PM',
    roleShort: 'Your next PM',
    dateLong: 'Immediate joiner',
    dateShort: 'Immediate',
    status: 'live',
    annotation: true,
  },
  {
    id: 'primerole',
    company: 'PrimeRole',
    logo: '/companies/primerole.png',
    role: 'Product Manager',
    roleShort: 'Product Manager',
    dateLong: 'Mar 2025 — Mar 2026',
    dateShort: "Mar '25 — Mar '26",
    start: '2025-03',
    end: '2026-03',
    employment: 'PLACEHOLDER',
    location: 'PLACEHOLDER',
    bullets: [
      'Owned the product lifecycle for AI employees end to end across 10+ enterprise ' +
        'deployments, from pre-launch scoping through stabilization, cutting deployment ' +
        'time by 30%.',
      'Took AI employees 0→1 in live customer environments, translating each site’s ' +
        'workflows and edge cases into agent requirements and configuration.',
      'Worked alongside Engineering, AI, and Support to diagnose 50+ site-specific ' +
        'issues, tracing failures to root cause and reducing average resolution time by 40%.',
      'Converted customer feedback into a prioritized product backlog, shipping 15+ ' +
        'enhancements that lifted adoption by 25%.',
      'Designed the deployment playbooks and onboarding standards that made rollouts ' +
        'repeatable, reducing time-to-value by 35% for new enterprise clients.',
      'Operated close to the system — agent behavior, integrations, and failure modes ' +
        '— so product decisions were grounded in how the thing actually ran, not how ' +
        'it was specced.',
    ],
    status: 'live',
  },
  {
    id: 'lambdatest',
    company: 'LambdaTest',
    logo: '/companies/lambdatest.png',
    role: 'Product Intern',
    roleShort: 'Product Intern',
    dateLong: 'Jun 2024 — Oct 2024',
    dateShort: "Jun '24 — Oct '24",
    start: '2024-06',
    end: '2024-10',
    employment: 'PLACEHOLDER',
    location: 'PLACEHOLDER',
    bullets: [
      'Supported Product Managers on HyperExecute, LambdaTest’s test orchestration platform, ' +
        'across experimentation, funnel analysis, and go-to-market.',
      'Ran A/B experiments across acquisition channels to improve user activation and ' +
        'trial conversion.',
      'Grew qualified top-of-funnel leads by 15% through sharper audience targeting and ' +
        'cleaner funnel tracking in Salesforce.',
      'Validated market demand in key tech segments, working with Account Executives on ' +
        'targeted outreach that converted prospects into product trials.',
    ],
    status: 'live',
  },
];

export default experience;

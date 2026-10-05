import type { Profile } from './types';

export const profile: Profile = {
  name: 'Mridul Shukla',
  bio: {
    before:
      'Product Manager based in India, with 1+ YOE building B2C products across ' +
      'fintech, edtech, SaaS, and AI. I work closely with founders, design, and engineering ' +
      'teams to turn ambiguous problems into clear product strategies, using data, ' +
      'user insights, and ',
    accent: 'AI-led workflows',
    after: ' to build, ship, and iterate end-to-end.',
  },
  currentWork: {
    before: 'Most recently, I worked with ',
    link: {
      label: 'PrimeRole',
      href: 'https://www.primerole.com/',
      image: '/companies/primerole-shot.webp',
    },
    after:
      ' as a Product Manager, working across product, design, and engineering to take ' +
      'ideas from 0 → 1 and turn them into products people actually want to use. From ' +
      'defining problems and shaping product strategy to writing specs, building ' +
      'prototypes, and shipping with engineering, I like being involved wherever the ' +
      'product needs to move forward.',
  },
  offTheClock: 'PLACEHOLDER',
  subtitle: 'Product Manager · Agent Builder · Turning ideas into products',
  roleLabelParts: {
    before: 'PRODUCT MANAG',
    accent: '(BUILD)',
    after: 'ER',
  },
  quote: 'Behind every great product is a question nobody asked yet.',
  craftedLine: 'Built with Figma, Claude, and too many open tabs.',
  craftedSublineParts: {
    before: 'All powered by ',
    accent: 'an epic coffee addiction',
    after: ' ❤️',
  },
  statusLabel: 'Open to work',
  available: true,
  location: 'Delhi NCR, INDIA',
  timezone: 'Asia/Kolkata',
  email: 'work.mridul2001@gmail.com',
  resumeUrl: '/mridul-shukla-resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/mridul-shukla-536444203/',
    github: 'https://github.com/MridulShukla20',
  },
};

export default profile;

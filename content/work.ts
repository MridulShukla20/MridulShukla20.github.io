import type { WorkCategory, WorkIntro, WorkItem } from './types';

/*
 * Featured work. Case studies, builds and experiments live in one list; the
 * category decides the tag, nothing else. The order here is the order on the
 * page, and the first item is shown large.
 *
 * Everything below is yours to edit: `summary` is the card, `overview` and
 * `sections` are the detail page, `cover.image` swaps the generated art for a
 * real screenshot (a 16:10 file under /public/work/).
 *
 * Skills and facts are claims about you — check them before you publish.
 */

export const workIntro: WorkIntro = {
  label: 'Featured work',
  heading: 'Case studies, builds and experiments.',
  lede: 'Written, shipped and explored — each one opens to the full story.',
};

export const categoryLabels: Record<WorkCategory, string> = {
  'case-study': 'Product Case Study',
  prd: 'PRD',
  build: 'Product Build',
  experiment: 'Experiment',
};

export const work: WorkItem[] = [
  {
    slug: 'ezflow',
    title: 'ezflow',
    summary:
      'A Mac dictation app that runs entirely on-device. Hold a key, speak, release — the words ' +
      'land in whatever app has focus, with no account and no uploads.',
    category: 'build',
    skills: ['Product design', 'On-device AI', 'Privacy by design'],
    cover: {
      art: {
        kind: 'dictation',
        label: 'Hold · speak · release',
        key: 'fn',
        boundary: 'On device',
        metric: '127 ms',
        metricLabel: 'Release to text, median',
      },
    },
    facts: [
      { label: 'Platform', value: 'macOS, Apple Silicon' },
      { label: 'Model', value: 'On-device, offline after setup' },
      { label: 'Pricing', value: 'Free now, one-time purchase planned' },
    ],
    overview:
      'ezflow is a hold-to-talk dictation app for the Mac. Speech recognition and text cleanup ' +
      'run locally, so a voice never leaves the machine.',
    sections: [
      {
        heading: 'How it works',
        paragraphs: [
          'Hold a key (Fn by default), speak, and release. The text is typed into the focused ' +
            'window, so it works in any app without a plugin.',
        ],
      },
      {
        heading: 'Product decisions worth noting',
        bullets: [
          'Privacy is the product: no account, no uploads, no telemetry.',
          'Offline after a one-time download of about 1.2 GB of voice models.',
          'A small model adds casing and punctuation; output that drifts too far from the ' +
            'transcript is discarded.',
          'Transcripts live in a single local file the user can read, delete or purge.',
          'Honest limits: English only, Apple Silicon only, no hands-free mode.',
        ],
      },
      {
        heading: 'Speed, as reported',
        paragraphs: [
          'The product page reports a median of about 127 ms from releasing the key to text ' +
            'appearing, and 439 ms at the 99th percentile, across 101 dictations.',
        ],
      },
    ],
    links: [{ label: 'Visit ezflow', href: 'https://ezflow.thisisamank.in/', external: true }],
    status: 'live',
  },
  {
    slug: 'youtube-premium',
    title: 'Premium-Exclusive Content Hub',
    summary:
      'Turning inactive Premium subscribers into habitual viewers with a members-only home ' +
      'for exclusive and early-access content.',
    category: 'case-study',
    org: 'YouTube Premium',
    skills: ['Product strategy', 'User research', 'Retention'],
    cover: {
      art: {
        kind: 'waffle',
        label: 'YouTube Premium',
        logo: '/companies/youtube.png',
        figure: '40%',
        caption: 'of subscribers consider cancelling over a lack of unique value',
        filled: 40,
        badge: 'Research insight',
      },
    },
    facts: [
      { label: 'Product', value: 'YouTube Premium' },
      { label: 'Format', value: 'Case study, PDF' },
    ],
    overview:
      'Turning inactive Premium subscribers into habitual viewers with a members-only home for ' +
      'exclusive and early-access content.',
    sections: [
      {
        heading: 'The insight it starts from',
        paragraphs: [
          '40% of subscribers consider cancelling over a lack of unique value. This is a ' +
            'research finding, not a shipped result.',
        ],
      },
    ],
    links: [
      { label: 'Read the case study', href: '/case-studies/youtube-premium.pdf', external: true },
    ],
    preview: { src: '/case-studies/youtube-premium.pdf', title: 'YouTube Premium case study' },
    status: 'live',
  },
  {
    slug: 'makedecks',
    title: 'MakeDecks',
    summary:
      'Turns the material you already have — a PDF, a spreadsheet, a page of notes — into a ' +
      'designed, editable deck.',
    category: 'build',
    skills: ['Product analysis', 'Generative AI', 'Workflow design'],
    cover: {
      art: {
        kind: 'transform',
        label: 'From what you have',
        sources: ['PDF', 'Sheet', 'Notes'],
      },
    },
    facts: [
      { label: 'Type', value: 'Web app' },
      { label: 'Plans', value: 'Pro, $15 a month' },
    ],
    overview:
      'MakeDecks is a presentation tool built around one idea: you rarely start from a blank ' +
      'page. It converts existing material into designed decks you can still edit.',
    sections: [
      {
        heading: 'What goes in',
        bullets: [
          'A PDF annual report or a spreadsheet of quarterly revenue',
          'A page of board notes or a recorded strategy talk',
          'An old pitch deck or a photo of a whiteboard',
        ],
      },
      {
        heading: 'Where it is used',
        paragraphs: [
          'Investor updates, quarterly reviews, and conversions such as PDF to PowerPoint and ' +
            'Excel to PowerPoint.',
        ],
      },
    ],
    links: [{ label: 'Visit MakeDecks', href: 'https://makedecks.com/new', external: true }],
    status: 'live',
  },
  {
    slug: 'lambdatest-configuration-management',
    title: 'Configuration Management for KaneAI & Test Manager',
    summary:
      'A PRD for allocating test configurations across desktop, real-device and virtual-device ' +
      'environments, so QA teams assign the right setup faster and with fewer errors.',
    category: 'prd',
    org: 'LambdaTest',
    skills: ['PRD writing', 'Metrics', 'Prioritisation'],
    cover: {
      art: {
        kind: 'matrix',
        label: 'Configuration allocation',
        columns: ['Desktop', 'Real device', 'Virtual'],
        filter: 'Device name',
        pattern: '.*',
        badge: 'Auto-assign',
        selected: '3 selected',
        action: 'Bulk assign',
      },
    },
    facts: [
      { label: 'Company', value: 'LambdaTest' },
      { label: 'Team', value: 'Product Development' },
      { label: 'Status', value: 'Ready for review' },
      { label: 'North star', value: 'Time saved per test case' },
    ],
    overview:
      'Managing test configurations across desktops, real devices and virtual devices is messy ' +
      'and error-prone. This PRD defines a configuration management system for KaneAI and Test ' +
      'Manager that automates allocation and reduces misconfiguration.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'QA engineers and development managers struggle to assign the right configurations to ' +
            'test cases and test runs. The result is misconfigurations, delays, and more time ' +
            'spent on maintenance than on testing.',
        ],
      },
      {
        heading: 'Goals, in priority order',
        bullets: [
          'Make assigning configurations to test cases and runs faster and less error-prone.',
          'Reduce manual intervention and human error.',
          'Scale the testing infrastructure by automating allocation.',
        ],
      },
      {
        heading: 'Chosen solution',
        paragraphs: [
          'Automated configuration allocation, picked over error-reduction tooling and ' +
            'application version management. It addresses the main frustration directly, ' +
            'scales with more environments, and cuts manual work.',
        ],
      },
      {
        heading: 'Key features',
        bullets: [
          'Personalised configuration allocation based on user behaviour',
          'Test run allocation',
          'Advanced filters by OS, device and browser',
          'Bulk allocation across many test cases',
          'Regex support for real-device parameters',
        ],
      },
      {
        heading: 'How success is measured',
        bullets: [
          'Time taken to assign configurations',
          'Configuration allocation success rate',
          'Share of configurations assigned by automation',
          'Reduction in errors caused by misconfiguration',
        ],
      },
    ],
    links: [
      {
        label: 'Read the PRD',
        href: '/work/lambdatest-test-manager-prd.pdf',
        external: true,
      },
    ],
    preview: {
      src: '/work/lambdatest-test-manager-prd.pdf',
      title: 'Configuration Management PRD',
    },
    status: 'live',
  },
  {
    slug: 'banking-app',
    title: 'Banking App',
    summary:
      'A mobile banking app designed end to end in Figma, with a clickable prototype you can ' +
      'walk through.',
    category: 'experiment',
    skills: ['UI design', 'Prototyping', 'Figma'],
    cover: {
      art: { kind: 'flow', label: 'Figma prototype' },
    },
    facts: [
      { label: 'Tool', value: 'Figma' },
      { label: 'Format', value: 'Interactive prototype' },
    ],
    overview:
      'A banking app designed in Figma and published as a clickable prototype. Open it to ' +
      'move through the screens as a user would.',
    links: [
      {
        label: 'Open the prototype',
        href:
          'https://www.figma.com/proto/s9Ali4mc9xj4yNkCv2xH4E/Banking-App?page-id=15%3A57' +
          '&node-id=935-2146&starting-point-node-id=18%3A114&t=quf0N2y8o9MtdkMD-1',
        external: true,
      },
    ],
    status: 'live',
  },
];

export default work;

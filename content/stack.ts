import type { StackGroup, StackIntro } from './types';

export const stackIntro: StackIntro = {
  label: 'Stack',
  heading: { before: 'Tools of the ', accent: 'trade', after: '.' },
  lede: 'What I actually reach for, grouped by the job it does.',
};

/*
 * Order is the argument: the AI work leads, the craft follows, the software
 * closes. Each group renders as one row; an empty `items` array drops the row.
 */
export const stack: StackGroup[] = [
  {
    title: 'AI & Agentic Systems',
    items: [
      'AI/ML Product Workflows',
      'Agentic AI Systems',
      'Prompt Engineering',
      'Data Flows & Guardrails',
      'AI-Led Workflows',
    ],
  },
  {
    title: 'Product Management',
    items: [
      'Product Lifecycle Management',
      'Roadmapping',
      'Backlog Prioritization',
      'Market & User Research',
      'Go-to-Market',
      'Agile/Scrum',
      'Stakeholder & Client Management',
    ],
  },
  {
    title: 'Delivery & Ops',
    items: [
      'Deployment Planning',
      'Go-live & Post-deployment Ops',
      'Deployment Playbooks',
      'Onboarding SOPs',
      'Workflow Configuration',
      'Process Standardization',
    ],
  },
  {
    title: 'Technical',
    items: [
      'APIs & Integrations',
      'System Design Fundamentals',
      'Cloud & SaaS',
      'Data Modelling',
    ],
  },
  {
    title: 'Analytics & Experimentation',
    items: [
      'SQL',
      'Mixpanel',
      'PostHog',
      'Google Analytics',
      'Power BI',
      'A/B Testing',
      'Data-Driven Decision Making',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      'JIRA',
      'Productboard',
      'Gainsight',
      'Salesforce',
      'Zoho',
      'Notion',
      'Slack',
      'Figma',
      'Whimsical',
      'Webflow',
      'Excel / Sheets',
    ],
  },
];

export default stack;

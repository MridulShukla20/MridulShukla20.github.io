import type { NextConfig } from 'next';

// Set only by .github/workflows/pages.yml; Vercel builds never see it.
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // `next dev` otherwise appends its own block to CLAUDE.md on every boot.
  agentRules: false,
  ...(isGithubPages && {
    output: 'export',
    images: { unoptimized: true },
  }),
};

export default nextConfig;

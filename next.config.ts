import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // `next dev` otherwise appends its own block to CLAUDE.md on every boot.
  agentRules: false,
};

export default nextConfig;

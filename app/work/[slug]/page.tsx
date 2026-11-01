import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { WorkDetail } from '@/components/work/WorkDetail';
import { profile } from '@/content/profile';
import { visibleWork, workBySlug } from '@/lib/work';

type Params = { slug: string };

/* Static export needs every detail page named up front. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return visibleWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} — ${profile.name}`, description: item.summary };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) notFound();

  return (
    <ViewSwitcher pinned="work">
      <WorkDetail item={item} />
    </ViewSwitcher>
  );
}

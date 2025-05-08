import {Suspense} from 'react';
import ScreenerClient from './ScreenerClient';
import ScreenerSkeleton from '@components/skeletons/ScreenerSkeleton';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    console.error("Slug is missing or undefined");
    return <div>Error: Slug is required</div>;
  }

  return <Suspense fallback={<ScreenerSkeleton />}><ScreenerClient slug={slug} /></Suspense>;
}

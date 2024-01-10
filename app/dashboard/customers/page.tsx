import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next'; 
import darkTheme from '@/app/lib/dark-theme';

export const metadata: Metadata = {
  title: 'Invoices',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>Customers</h1>
      </div>
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
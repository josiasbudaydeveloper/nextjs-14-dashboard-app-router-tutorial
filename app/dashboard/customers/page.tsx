import Table from '@/ui/customers/table';
import { lusitana } from '@/ui/fonts';
import { InvoicesTableSkeleton } from '@/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next'; 
import darkTheme from '@/lib/dark-theme';
import Pagination from '@/ui/customers/pagination';
import { fetchCustomersPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Invoices',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>Customers</h1>
      </div>
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
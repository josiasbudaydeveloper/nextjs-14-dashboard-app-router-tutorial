import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next'; 
import { auth } from '@/auth';
import { getUser } from '@/app/lib/data';
import { darkTheme, lightTheme, systemDefault, themeType } from '@/app/lib/theme';

export const metadata: Metadata = {
  title: 'Dashboard',
};
export default async function Page() {
  const session = await auth();
const userEmail = session?.user?.email!;
const user = await getUser(userEmail);
let theme: themeType;

switch(user.theme) {
  case 'system':
    theme = systemDefault;
    break;
  case 'dark':
    theme = darkTheme;
    break;
  case 'light':
    theme = lightTheme;
    break;
}

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${theme.title}`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton theme={theme} />}>
          <CardWrapper theme={theme} />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton theme={theme} />}>
          <RevenueChart theme={theme}  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton theme={theme} />}>
          <LatestInvoices theme={theme}  />
        </Suspense>
      </div>
    </main>
  );
}
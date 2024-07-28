import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import { auth } from '@/auth';
import { themeType } from '@/app/lib/theme';

export default async function LatestInvoices({theme}:{theme: themeType}) {
  const session = await auth();
  const userEmail = session?.user?.email!;

  const latestInvoices = await fetchLatestInvoices(userEmail);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${theme.title}`}>
        Latest Invoices
      </h2>
      <div className={`flex grow flex-col justify-between rounded-xl
        ${theme.container} p-4
      `}>
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className={`${theme.bg} px-6`}>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  `flex flex-row items-center justify-between py-4
                    ${theme.border}
                  `,
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-semibold md:text-base ${theme.title}`}>
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base 
                    ${theme.title}
                  `}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

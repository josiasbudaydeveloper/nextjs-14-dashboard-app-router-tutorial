import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';
import { auth } from '@/auth';

export default async function LatestInvoices() {
  const session = await auth();
  const userEmail = session?.user?.email!;

  const latestInvoices = await fetchLatestInvoices(userEmail);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}>
        Latest Invoices
      </h2>
      <div className={`flex grow flex-col justify-between rounded-xl
        bg-gray-50 ${darkTheme.container} p-4
      `}>
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className={`bg-white ${darkTheme.bg} px-6`}>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  `flex flex-row items-center justify-between py-4
                    ${darkTheme.border}
                  `,
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-semibold md:text-base ${darkTheme.title}`}>
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base 
                    ${darkTheme.title}
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

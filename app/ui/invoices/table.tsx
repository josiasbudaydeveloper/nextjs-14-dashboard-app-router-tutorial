import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, getUser } from '@/app/lib/data';
import { auth } from '@/auth';
import { themeType } from '@/app/lib/theme';

export default async function InvoicesTable({
  query,
  currentPage,
  theme
}: {
  query: string;
  currentPage: number;
  theme: themeType;
}) {
  const session = await auth();
  const userEmail = session?.user!.email!;

  const invoices = await fetchFilteredInvoices(query, currentPage, userEmail);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className={`rounded-lg ${theme.container} p-2 md:pt-0`}>
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className={`mb-2 w-full rounded-md p-4
                  ${theme.bg}
                `}
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className={`${theme.title}`}>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} theme={theme}  />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className={`text-xl font-medium ${theme.title}`}>
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p className={`${theme.title}`}>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} theme={theme} />
                    <DeleteInvoice id={invoice.id} theme={theme} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className={`hidden min-w-full ${theme.text} md:table`}>
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className={`${theme.bg}`}>
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none 
                    [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                    [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg
                    ${theme.border}
                  `}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} theme={theme} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} theme={theme} />
                      <DeleteInvoice id={invoice.id} theme={theme} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

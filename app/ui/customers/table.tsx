import Search from '@/app/ui/search';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { CreateCustomer, DeleteCustomer, UpdateCustomer } from '../invoices/buttons';
import { auth } from '@/auth';
import { themeType } from '@/app/lib/theme';

export default async function CustomersTable({
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
  const customers = await fetchFilteredCustomers(query, currentPage, userEmail);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." theme={theme} />
        <CreateCustomer />
      </div>

      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className={`
              overflow-hidden rounded-md ${theme.container}
              p-2 md:pt-0
            `}>
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className={`
                      mb-2 w-full ${theme.bg} p-4
                    `}>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p className={`${theme.title}`}>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className={`text-xs ${theme.title}`}>Pending</p>
                        <p className={`font-medium ${theme.title}`}>{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className={`text-xs ${theme.title}`}>Paid</p>
                        <p className={`font-medium ${theme.title}`}>{customer.total_paid}</p>
                      </div>
                    </div>
                    <div className={`pt-4 text-sm ${theme.title}`}>
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateCustomer id={customer.id} theme={theme} />
                      <DeleteCustomer id={customer.id} theme={theme} />
                    </div>
                  </div>
                ))}
              </div>
              <table className={`
                hidden min-w-full rounded-md ${theme.text} md:table
              `}>
                <thead className={`
                  ${theme.container}
                  text-left text-sm font-normal
                `}>
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className={`
                  divide-y ${theme.divide} 
                  ${theme.text}
                `}>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className={`
                        whitespace-nowrap ${theme.bg} py-5 pl-4 pr-3 text-sm 
                        ${theme.title} sm:pl-6 rounded-l-md
                      `}>
                        <div className="flex items-center gap-3">
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className={`
                        whitespace-nowrap ${theme.bg} ${theme.text} px-4 py-5 text-sm        
                      `}>
                        {customer.email}
                      </td>
                      <td className={`
                        whitespace-nowrap ${theme.bg} ${theme.text} px-4 py-5 text-sm        
                      `}>
                        {customer.total_invoices}
                      </td>
                      <td className={`
                        whitespace-nowrap ${theme.bg} px-4 py-5 text-sm ${theme.text}   
                      `}>
                        {customer.total_pending}
                      </td>
                      <td className={`whitespace-nowrap ${theme.bg} px-4 py-5 
                        ${theme.text}  
                        `}>
                        {customer.total_paid}
                      </td>
                      <td className={`whitespace-nowrap py-3 pl-6 pr-3 ${theme.bg} rounded-r-md`}>
                        <div className="flex justify-end gap-3">
                          <UpdateCustomer id={customer.id} theme={theme} />
                          <DeleteCustomer id={customer.id} theme={theme} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, getUser } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { darkTheme, lightTheme, systemDefault, themeType } from '@/app/lib/theme';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const session = await auth();
  const userEmail = session?.user?.email!;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id, userEmail),
    fetchCustomers(userEmail),
  ]);

  if (!invoice) {
    notFound();
  }

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
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
        theme={theme}
      />
      <Form invoice={invoice} customers={customers} theme={theme} />
    </main>
  )
}
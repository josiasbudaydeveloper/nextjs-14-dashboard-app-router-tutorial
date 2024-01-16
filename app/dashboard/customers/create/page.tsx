import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { auth } from '@/auth';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Create Customer',
};
 
export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email!;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form userEmail={userEmail} />
    </main>
  );
}
import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Edit Customer',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  const userEmail = session?.user?.email!;

  const customer = await fetchCustomerById(id, userEmail);

  if (!customer) {
    return notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Customers',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} userEmail={userEmail} />
    </main>
  )
}
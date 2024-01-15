import Form from '@/ui/customers/edit-form';
import Breadcrumbs from '@/ui/invoices/breadcrumbs';
import { fetchCustomerById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Edit Customer',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = await fetchCustomerById(id);

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
      <Form customer={customer} />
    </main>
  )
}
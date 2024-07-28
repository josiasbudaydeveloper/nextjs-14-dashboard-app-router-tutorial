import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deleteCustomer } from '@/app/lib/actions';
import { themeType } from '@/app/lib/theme';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ 
  id,
  theme 
}: 
{ 
  id: string;
  theme: themeType
}) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className={`rounded-md border p-2
        ${theme.border} ${theme.text} ${theme.hoverBg} ${theme.hoverText}
        ${theme.hoverBorder}
      `}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ 
  id,
  theme 
}: 
{ 
  id: string;
  theme: themeType
}) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
 
  return (
    <form action={deleteInvoiceWithId}>
      <button className={`rounded-md border p-2
        ${theme.border} ${theme.text} ${theme.hoverBg} ${theme.hoverText}
        ${theme.hoverBorder}
      `}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomer({ 
  id,
  theme 
}: 
{ 
  id: string;
  theme: themeType
}) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className={`rounded-md border p-2
        ${theme.border} ${theme.text} ${theme.hoverBg} ${theme.hoverText}
        ${theme.hoverBorder}
      `}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ 
  id,
  theme 
}: 
{ 
  id: string;
  theme: themeType
}) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
 
  return (
    <form action={deleteCustomerWithId}>
      <button className={`rounded-md border p-2
        ${theme.border} ${theme.text} ${theme.hoverBg} ${theme.hoverText}
        ${theme.hoverBorder}
      `}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { themeType } from '@/app/lib/theme';

export default function EditInvoiceForm({
  invoice,
  customers,
  theme
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
  theme: themeType;
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);

  return (
    <form action={dispatch}>
      <div className={`rounded-md p-4 md:p-6
        ${theme.container}
      `}>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className={`mb-2 block text-sm font-medium 
            ${theme.title}
          `}>
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className={`peer block w-full cursor-pointer rounded-md border 
              py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
              ${theme.border} ${theme.bg} ${theme.text}
              `}
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
              -translate-y-1/2 text-gray-500 ${theme.inputIcon}
            `}/>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className={`mb-2 block text-sm font-medium ${theme.text}`}>
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className={`peer block w-full rounded-md border
                  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                  ${theme.border} ${theme.bg} ${theme.text}
                `}
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 ${theme.inputIcon}
              `}/>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className={`mb-2 block text-sm font-medium ${theme.text}`}>
            Set the invoice status
          </legend>
          <div className={`rounded-md border px-[14px] py-3
            ${theme.bg} ${theme.border}
          `}>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className={`h-4 w-4 cursor-pointer  
                    text-gray-600 focus:ring-2 ${theme.container} ${theme.border}
                  `}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full 
                    px-3 py-1.5 text-xs font-medium text-gray-600
                    ${theme.container} ${theme.border} ${theme.text}
                  `}
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className={`h-4 w-4 cursor-pointer 
                    text-gray-600 focus:ring-2 ${theme.container} ${theme.border}
                  `}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {state?.message && (
          <p className="mt-2 text-sm text-red-500"  key={state.message}>
            {state.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className={`
            flex h-10 items-center rounded-lg px-4 text-sm font-medium 
            transition-colors
            ${theme.container} ${theme.border} ${theme.text}
            ${theme.hoverBg} ${theme.hoverText}
          `}
        >
          Cancel
        </Link>
        <Button type="submit">Update Invoice</Button>
      </div>
    </form>
  );
}

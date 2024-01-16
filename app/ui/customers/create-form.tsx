'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import darkTheme from '@/app/lib/dark-theme';

export default function Form({ 
  userEmail
} : { 
  userEmail: string
}) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="userEmail" value={userEmail} />

      <div className={`rounded-md bg-gray-50 ${darkTheme.container} p-4 md:p-6`}>
        <div className="mb-4">
          <label htmlFor="customer" className={`mb-2 block text-sm font-medium
            ${darkTheme.text}
          `}>
            Name: 
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Type the customer name"
              className={`peer block w-full rounded-md border border-gray-200 
                py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
              `}
              aria-describedby="name-error"
            />
            <UserCircleIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
              -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
            `}/>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className={`mb-2 block text-sm font-medium
            ${darkTheme.text}
          `}>
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="mail"
                placeholder="Enter the customer email"
                className={`peer block w-full rounded-md border border-gray-200 
                  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                  ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
                `}
                aria-describedby="email-error"
              />
              <AtSymbolIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${darkTheme.inputIcon}
              `}/>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {state.message && (
          <p className="mt-2 text-sm text-red-500"  key={state.message}>
            {state.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className={`
            flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium 
            text-gray-600 transition-colors hover:bg-gray-200
            ${darkTheme.container} ${darkTheme.border} ${darkTheme.text}
            ${darkTheme.hoverBg} ${darkTheme.hoverText}
          `}
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}

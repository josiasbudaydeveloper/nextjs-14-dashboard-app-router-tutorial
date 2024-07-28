'use client';

import {
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { User } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { themeType } from '@/app/lib/theme';

export default function Form({ 
  user,
  theme
} : { 
  user: User;
  theme: themeType;
}) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateUser, initialState);

  const searchParams = useSearchParams();
  const updatedUser = searchParams.get('user-updated');

  useEffect(() => {
    if (updatedUser) {
      toast.success("User updated successfully!!");
    }
  });

  return (
    <form action={dispatch}>
      <ToastContainer theme="colored" />
      <input type="hidden" name="userEmail" value={user.email} />

      <div className={`rounded-md ${theme.container} p-4 md:p-6`}>
        <div className="mb-4">
          { user.password === null ? (
              <p className={`
                mb-2 block text-sm font-light text-red-500
              `}>
                To allow you to login with your credentials (email and password),
                <br />
                in addition to your 
                OAuth provider, you just need to define a password.
              </p>
            ) : (
              <p className={`
                mb-2 block text-sm font-medium text-green-500
              `}>
                You&apos;re already able to login with your credentials (Login and Password). <br /><br />

                If your first login was through GitHub or Google and you  don&apos;t now <br />
                what&apos;s your credential email, it is the same as the OAuth provider <br />
                (GitHub or Google) account you used to login. <br /><br />

                You can also change your password whenever you want on this page.
              </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className={`mb-2 block text-sm font-medium
            ${theme.text}
          `}>
            Name: 
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              placeholder="Type the new user name"
              className={`peer block w-full rounded-md border 
                py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                ${theme.border} ${theme.bg} ${theme.text}
              `}
              aria-describedby="name-error"
            />
            <UserCircleIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
              -translate-y-1/2 text-gray-500 ${theme.inputIcon}
            `}/>
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
        <label
            className={`mt-5 block text-sm font-medium ${theme.text}`}
            htmlFor="password"
          >
            Password:
          </label>
          <p className={`mb-3 block text-xs font-medium ${theme.text}`}>
            The password must have at least 8 characters, <br /> 
            one special character, one upper case letter and one lower case letter.
          </p>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter the new user password"
                className={`peer block w-full rounded-md border
                  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                  ${theme.border} ${theme.bg} ${theme.text}
                `}
                aria-describedby="password-error"
              />
              <KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 ${theme.inputIcon}
              `}/>
            </div>

            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className={`mb-2 block text-sm font-medium
            ${theme.text}
          `}>
            Confirm password: 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm password"
                className={`peer block w-full rounded-md border
                  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                  ${theme.border} ${theme.bg} ${theme.text}
                `}
                aria-describedby="confirm-password-error"
              />
              <KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 ${theme.inputIcon}
              `}/>
            </div>

            <div id="confirm-password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.confirmPassword &&
                state.errors.confirmPassword.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {state?.message && (
          <p className="mt-2 text-sm text-red-500"  key={state.message}>
            {state.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
}
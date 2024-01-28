'use client';

import {
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import darkTheme from '@/app/lib/dark-theme';
import { User } from '@/app/lib/definitions';

export default function Form({ 
  user
} : { 
  user: User
}) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateUser, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="userEmail" value={user.email} />

      <div className={`rounded-md bg-gray-50 ${darkTheme.container} p-4 md:p-6`}>
        <div className="mb-4">
          { user.password === null ? (
              <p className={`
                mb-2 block text-sm font-light text-red-500
              `}>
                So you can login with your email and password, in addition to your <br />
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

                You can also change your password whatever you want on this page.
              </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className={`mb-2 block text-sm font-medium
            ${darkTheme.text}
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
            {state?.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className={`mb-2 block text-sm font-medium
            ${darkTheme.text}
          `}>
            Password: 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter the new user password"
                className={`peer block w-full rounded-md border border-gray-200 
                  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                  ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
                `}
                aria-describedby="password-error"
              />
              <AtSymbolIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${darkTheme.inputIcon}
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

        {/* <div className="mb-4">
          <label htmlFor="theme" className={`mb-2  block text-sm font-medium
            ${darkTheme.text}
          `}>
            Choose theme:
          </label>
          <div className="relative">
            <select
              id="theme"
              name="theme"
              className={`peer block w-full cursor-pointer rounded-md border 
                border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
                ${darkTheme.border} ${darkTheme.bg} ${darkTheme.text}
              `}
              defaultValue={user.theme}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a theme
              </option>
              <option value="0">
                Light
              </option>
              <option value="1">
                Dark
              </option>
              <option value="2">
                System Default
              </option>
            </select>
            <UserCircleIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
              -translate-y-1/2 text-gray-500 ${darkTheme.inputIcon}
            `}/>
          </div>

          <div id="theme-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.theme &&
              state.errors.theme.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}

        {state?.message && (
          <p className="mt-2 text-sm text-red-500"  key={state.message}>
            {state.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
}
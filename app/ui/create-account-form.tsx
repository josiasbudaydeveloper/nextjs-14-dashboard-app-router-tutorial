'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createUserWithCredentials } from '@/app/lib/actions';
import darkTheme from '../lib/dark-theme';
import { useRouter } from 'next/navigation';
 
export default function LoginForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUserWithCredentials, initialState);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 dark:bg-[#212121]
        px-6 pb-4 pt-8
      ">
        <h1 className={`${lusitana.className} mb-3 text-2xl ${darkTheme.title}`}>
          Fill in the blanks to create a new account
        </h1>
      <form action={dispatch} className="space-y-3">  
        <div className="w-full">
          <div>
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-gray-900 ${darkTheme.text}`}
              htmlFor="name"
            >
              Name:
            </ label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${darkTheme.border} 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${darkTheme.bg}
                  ${darkTheme.text}
                `}
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                required
              />
              <UserIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] 
                w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${darkTheme.inputIcon}
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
          <div>
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-gray-900 ${darkTheme.text}`}
              htmlFor="email"
            >
              Email:
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${darkTheme.border} 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${darkTheme.bg}
                  ${darkTheme.text}
                `}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] 
                w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${darkTheme.inputIcon}
              `}/>
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
          <div className="mt-4">
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-gray-900 ${darkTheme.text}`}
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${darkTheme.border}
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${darkTheme.bg}
                  ${darkTheme.text}
                `}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${darkTheme.inputIcon}
              `}/>
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </div>
        
        {state.message && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-10 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}

        <CreateAccountButton />
        
      </form>

      <ReturnToLoginPageButton />

    </div>
  );
}

function CreateAccountButton() {
  return (
    <Button className='mt-4 w-full'>
      Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}

function ReturnToLoginPageButton() {
  const { replace } = useRouter();

  return (
    <Button className='mt-4 w-full' onClick={() => {
      replace('/login');
    }}>
      Go back to the Login page <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}
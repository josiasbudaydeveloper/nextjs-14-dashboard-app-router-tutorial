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
import { systemDefault } from '../lib/theme';
import { useRouter } from 'next/navigation';
 
export default function LoginForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUserWithCredentials, initialState);

  return (
    <div className={`flex-1 rounded-lg ${systemDefault.container}
        px-6 pb-4 pt-8
      `}>
        <h1 className={`${lusitana.className} mb-3 text-2xl ${systemDefault.title}`}>
          Fill in the blanks to create a new account
        </h1>
      <form action={dispatch} className="space-y-3">  
        <div className="w-full">
          <div>
            <label
              className={`mb-3 mt-5 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="name"
            >
              Name:
            </ label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg}
                  ${systemDefault.text}
                `}
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                required
              />
              <UserIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] 
                w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${systemDefault.inputIcon}
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
              className={`mb-3 mt-5 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="email"
            >
              Email:
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border} 
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg}
                  ${systemDefault.text}
                `}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] 
                w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${systemDefault.inputIcon}
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
              className={`mt-5 block text-sm font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="password"
            >
              Password:
            </label>
            <p className={`mb-3 block text-xs font-medium text-gray-900 ${systemDefault.text}`}>
              The password must have at least 8 characters, 
              one special character, one upper case letter and one lower case letter.
            </p>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 ${systemDefault.border}
                  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${systemDefault.bg}
                  ${systemDefault.text}
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
                ${systemDefault.inputIcon}
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

        <div className="mb-4">
					<label htmlFor="confirm-password" className={`mb-2 block text-sm font-medium
						${systemDefault.text}
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
								className={`peer block w-full rounded-md border border-gray-200 
									py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
									${systemDefault.border} ${systemDefault.bg} ${systemDefault.text}
								`}
								aria-describedby="confirm-password-error"
							/>
							<KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] 
                -translate-y-1/2 text-gray-500 peer-focus:text-gray-900
                ${systemDefault.inputIcon}
              `}/>
						</div>
					</div>
				</div>
        
        {state.message && (
          <div
            className={`
              flex items-end space-x-1
              ${(state.message == 'Passwords are different.') ? 'h-4' : 'h-8'} 
              `}
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className={`
              ${(state.message == 'Passwords are different.') ? 'h-5' : 'h-10'} 
              w-5 text-red-500
            `} />
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
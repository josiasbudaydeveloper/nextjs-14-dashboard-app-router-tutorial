'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { forgotPassword } from '@/app/lib/actions';
import { systemDefault } from '../lib/theme';
import { useRouter } from 'next/navigation';
 
export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(forgotPassword, undefined);

  return (
    <div className={`flex-1 rounded-lg ${systemDefault.container}
        px-6 pb-4 pt-8
      `}>
        <h1 className={`${lusitana.className} mb-3 text-2xl ${systemDefault.title}`}>
          Please provide your email address for password reset
        </h1>
      <form action={dispatch} className="space-y-3">  
        <div className="w-full">
          <div>
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-gray-900 ${systemDefault.text}`}
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
          </div>
        </div>
        
        <ResetPassword />
        
        {errorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
        
      </form>

      <GoBack />
    </div>
  );
}
 
function ResetPassword() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Reset password  <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function GoBack() {
  const { pending } = useFormStatus();
  
  const { replace } = useRouter();
 
  return (
    <Button className="mt-2 w-full" aria-disabled={pending} onClick={() => {
      replace('/login');
    }}>
      Go back <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
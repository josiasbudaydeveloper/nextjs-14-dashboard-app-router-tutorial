'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticateWithCredentials } from '@/app/lib/actions';
import { systemDefault } from '../lib/theme';
import { authenticateWithOAuth } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const GitHubSignIn = authenticateWithOAuth.bind(null, 'github');
// const GoogleSignIn = authenticateWithOAuth.bind(null, 'google');
function GoogleSignIn() {
  toast.error(
    <>
      This login option <b>does not</b> work due to <b>Google&apos;s privacy protection rules</b>. <br />
      <br />
      As this is a <b>test project</b>, I cannot provide all the necessary <b>bureaucracy</b>.
    </>
  , {
    autoClose: 15000
  });
}
 
export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticateWithCredentials, undefined);

  const searchParams = useSearchParams();
  const params = {
    accountCreated: searchParams.get('account-created'),
    passwordUpdated: searchParams.get('password-updated') 
  };

  useEffect(() => {
    if (params.accountCreated) {
      toast.success("Account created successfully!!");
    }
    if (params.passwordUpdated) {
      toast.success("Password updated successfully!!");
    }
    if (!params.accountCreated && !params.passwordUpdated) {
      toast.warning(<><b>Note</b>: accounts are now automatically <b>deleted</b> after <b>one week</b>.</>);
    } 
  }, []);

  return (
    <div className={`flex-1 rounded-lg ${systemDefault.container}
        px-6 pb-4 pt-8
      `}>
        <ToastContainer theme="colored" />
        <h1 className={`${lusitana.className} mb-3 text-2xl ${systemDefault.title}`}>
          Please log in to continue.
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
          <div className="mt-4">
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-gray-900 ${systemDefault.text}`}
              htmlFor="password"
            >
              Password:
            </label>
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
          </div>
        </div>
        
        <LoginButton />
        
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

      <CreateAccount />
      <ForgotPassword />

      <p className={`
        ${systemDefault.text} pb-2 pt-[9px] text-center
      `}>
        or
      </p>

      <GitHubSignInButton />
      <GoogleSignInButton />
    </div>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function CreateAccount() {
  const { pending } = useFormStatus();
  
  const { replace } = useRouter();
 
  return (
    <Button className="mt-2 w-full" aria-disabled={pending} onClick={() => {
      replace('/create-account');
    }}>
      Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function ForgotPassword() {
  const { pending } = useFormStatus();
  
  const { replace } = useRouter();
 
  return (
    <Button className="mt-2 w-full" aria-disabled={pending} onClick={() => {
      replace('/forgot');
    }}>
      Forgot password? <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function GitHubSignInButton() {
  return (
    <form action={GitHubSignIn}>
      <button className={`
        flex h-10 items-center rounded-lg
        px-4 text-sm font-medium
        w-full bg-black hover:bg-[#101010]
        text-white
      `} type='submit'>
        <Image
          src='oauth-logos/github.svg'
          width={25}
          height={25}
          alt='GitHub logo'
        />
        <p className={`px-2 w-full`}>Sign in with GitHub</p>
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  )
}

function GoogleSignInButton() {
  return (
    <form action={GoogleSignIn}>
      <button className={`
        flex h-10 items-center rounded-lg
        px-4 text-sm font-medium
        w-full bg-white hover:bg-[#4287f5]
        text-black hover:text-white
        mt-2
      `} type='submit'>
        <Image
          src='oauth-logos/google.svg'
          width={25}
          height={25}
          alt='Google logo'
        />
        <p className={`px-2 w-full`}>Sign in with Google</p>
        <ArrowRightIcon className="ml-auto h-5 w-5" />
      </button>
    </form>
  )
}
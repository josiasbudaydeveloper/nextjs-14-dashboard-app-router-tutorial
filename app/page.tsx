import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { systemDefault } from './lib/theme';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className={`flex flex-col justify-center gap-6 rounded-lg bg-gray-50 ${systemDefault.container} 
          px-6 py-10 md:w-2/5 md:px-20
        `}>
          <p className={`${lusitana.className} text-xl text-gray-800 ${systemDefault.text}
          md:text-3xl md:leading-normal
          `}>
            <strong>Welcome to Acme.</strong> 
            A Multi-Tenant SAAS Dashboard where users can create an account and manage their customers and invoices. 
            It is based on the Next Learn Course, the official {' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a> {' '} created by Vercel 
            and which I modified to strengthen my skills, by adding the following features:
          </p>
          
          <ul className={`${lusitana.className} text-xl text-gray-800 ${systemDefault.text}
          md:text-3xl md:leading-normal
          `}>
              <li>Dark Mode</li>
              <li>Multiuser system</li>
              <li>OAuth Authentication</li>
              <li>
                Pagination for the customers, as they're going to be flexible at this version
                Dark Theme feature based on the user's browser theme
              </li>
            </ul>
          
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image 
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}

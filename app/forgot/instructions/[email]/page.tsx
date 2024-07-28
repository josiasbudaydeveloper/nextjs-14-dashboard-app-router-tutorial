import AcmeLogo from '@/app/ui/acme-logo';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { systemDefault } from '@/app/lib/theme';

export const metadata: Metadata = {
  title: 'Forgot password',
};
 
export default function LoginPage({params}: {params: {email: string}}) {
  let email = params.email.replace('%40','@');
  return (
    <main className="flex items-center justify-end">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-40 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-gray-50 dark:bg-[#212121]
					px-6 pb-4 pt-8
				">
					<h1 className={`${lusitana.className} mb-3 text-2xl ${systemDefault.title} text-ellipsis overflow-hidden`}>
						If you typed your email address correctly, a message with instructions 
            to reset your password was sent to {email}
					</h1>
        </div>
      </div>
    </main>
  );
}
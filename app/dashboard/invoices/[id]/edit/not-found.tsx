import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next'; 
import { auth } from '@/auth';
import { getUser } from '@/app/lib/data';
import { darkTheme, lightTheme, systemDefault, themeType } from '@/app/lib/theme';

export const metadata: Metadata = {
  title: 'Not-Found Invoice',
};
 
export default async function NotFound() {
  const session = await auth();
  const userEmail = session?.user?.email!;
  const user = await getUser(userEmail);
  let theme: themeType;

  switch(user.theme) {
    case 'system':
      theme = systemDefault;
      break;
    case 'dark':
      theme = darkTheme;
      break;
    case 'light':
      theme = lightTheme;
      break;
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className={`w-10 ${theme.text}`} />
      <h2 className={`text-xl font-semibold ${theme.title}`}>404 Not Found</h2>
      <p className={`${theme.text}`}>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
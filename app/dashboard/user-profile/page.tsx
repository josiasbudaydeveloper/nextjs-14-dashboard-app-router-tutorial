import Form from '@/app/ui/user-profile/edit-form';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import darkTheme from '@/app/lib/dark-theme';
import { getUser } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'User Profile',
};
 
export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email!;

  const user = await getUser(userEmail);
  
  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>Customers</h1>
      </div>
      <Form user={user} />
    </main>
  )
}
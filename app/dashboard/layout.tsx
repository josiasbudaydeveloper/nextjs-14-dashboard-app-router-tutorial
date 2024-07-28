import SideNav from '@/app/ui/dashboard/sidenav';
import { auth } from '@/auth';
import { getUser } from '../lib/data';
import { darkTheme, lightTheme, systemDefault, themeType } from '../lib/theme';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
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
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden ${theme.bg}`}>
      <div className="w-full flex-none md:w-64">
        <SideNav theme={theme} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
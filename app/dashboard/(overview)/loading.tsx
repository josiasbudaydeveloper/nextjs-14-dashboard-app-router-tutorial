import { getUser } from '@/app/lib/data';
import { darkTheme, lightTheme, systemDefault, themeType } from '@/app/lib/theme';
import DashboardSkeleton from '@/app/ui/skeletons';
import { auth } from '@/auth';
 
export default async function Loading() {
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

  return <DashboardSkeleton theme={theme} />;
}
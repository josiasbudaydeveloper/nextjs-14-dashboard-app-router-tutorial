"use client"

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  Cog6ToothIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { themeType } from '@/app/lib/theme';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'My Account', href: '/dashboard/user-profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon }
];

export default function NavLinks({theme}: {theme: themeType}) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md 
                p-3 text-sm font-medium hover:text-blue-600 
                md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname !== link.href && `${theme.container} ${theme.title} ${theme.hoverBg}`}
                ${pathname === link.href && `${theme.activeLink} text-blue-600`}
              `
            }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

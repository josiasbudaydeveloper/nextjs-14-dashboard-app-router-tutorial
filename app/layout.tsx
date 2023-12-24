import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import darkTheme from './lib/dark-theme';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  metadataBase: new URL('https://josiasbudaydeveloper-next-14-dashboard-app.vercel.app/'),
  description: 'The official Next.js Learn Dashboard built with App Router.',
  openGraph: {
    title: 'Next.js 14 Tutorial: Dashboard App',
    description: 'The official Next.js Learn Dashboard built with App Router.',
    siteName: 'Acme Dashboard',
    locale: 'en_US'
  }
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased ${darkTheme.bg}`}>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Rubik } from 'next/font/google';

import '@/styles/global.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/modules/navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik', weight: '400' });

export const metadata: Metadata = {
  title: 'Go!',
  description: 'Go oyunu demo',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={`dark ${geistSans.variable} ${geistMono.variable} ${rubik.variable} pt-14`}>
        <Navbar />

        {children}

        <Toaster />
      </body>
    </html>
  );
}

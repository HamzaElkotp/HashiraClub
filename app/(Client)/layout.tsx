'use client';

import "../Style/client-globals.css";
import { Inter } from 'next/font/google';
import { Providers } from './providers'; // react-query provider
import { ThemeProvider } from '@/components/theme-provider'; // shadcn theme
import SEO from '../../constants/next-seo.config';
import { NextSeo } from 'next-seo';


const inter = Inter({ subsets: ['latin'] });


export default function ClientLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <NextSeo {...SEO}/> */}
      </head>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers> */}
            {children}
          {/* </Providers>
        </ThemeProvider> */}
      </body>
    </html>
  );
}
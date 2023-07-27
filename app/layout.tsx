import React from 'react';
import './_assets/css/index.scss';
import './_assets/css/prism.css';
import 'katex/dist/katex.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import ThemeProv from './themeProvider';
import MuiTheme from './_components/muiTheme';
import NavBar from './navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 's.me',
  description: 'personal website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="absolute -z-10 select-none inset-x-0 flex justify-end">
          <Image className="w-[90rem]" src="/rainbow.avif" width={300} height={300} alt="" />
        </div>
        <ThemeProv>
          <MuiTheme>
            <NavBar />
            <div>
              {children}
            </div>
          </MuiTheme>
        </ThemeProv>
      </body>
    </html>
  );
}

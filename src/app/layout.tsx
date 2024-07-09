import '../styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import GlobalFooter from './layout/footer/GlobalFooter';
import GlobalHeader from './layout/header/GlobalHeader';
import ModalPortal from './layout/modal/ModalPotal';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'PRism',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.variable}>
        <GlobalHeader />
        {children}
        <GlobalFooter />
        <ModalPortal />
      </body>
    </html>
  );
}

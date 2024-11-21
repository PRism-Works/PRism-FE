import '../styles/globals.css';
import { ThemeProvider } from '@/components/common/theme/ThemeProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import GlobalHeaderWrapper from '../components/layout/header/GlobalHeaderWrapper';
import GlobalFooter from '../components/layout/footer/GlobalFooter';
import ModalPortal from '../components/layout/modal/ModalPotal';
import ReactQueryProviders from '@/hooks/useReactQuery';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prism-fe.vercel.app/'),
  title: 'PRism : AI 기반 소프트스킬 분석 및 개인 홍보 플랫폼',
  description:
    '팀원 평가를 통해 본인의 소프트스킬을 AI로 분석하여 검증하고, 포트폴리오로도 활용할 수 있는 무료 솔루션입니다.',
  keywords: [
    '소프트스킬',
    '협업',
    '개인 홍보',
    '동료 평가',
    '팀원 평가',
    '사이드프로젝트',
    '포트폴리오',
    '프로젝트',
    '팀빌딩',
    '경력 개발',
    '팀워크',
    '협업 툴',
    '프로젝트 관리',
  ],

  alternates: {
    canonical: 'https://prism-fe.vercel.app/',
  },

  // Open Graph
  openGraph: {
    title: 'PRism : AI 기반 소프트스킬 분석 및 개인 홍보 플랫폼',
    description:
      '팀원 평가를 통해 본인의 소프트스킬을 AI로 분석하여 검증하고, 포트폴리오로도 활용할 수 있는 무료 솔루션입니다.',
    url: 'https://prism-fe.vercel.app/',
    siteName: 'PRism',
    locale: 'ko_KR',
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'PRism : AI 기반 소프트스킬 분석 및 개인 홍보 플랫폼',
    description:
      '팀원 평가를 통해 본인의 소프트스킬을 AI로 분석하여 검증하고, 포트폴리오로도 활용할 수 있는 무료 솔루션입니다.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <script defer src="https://cdn.swygbro.com/public/widget/swyg-widget.js"></script>
      </head>
      <body className={cn(pretendard.variable, 'bg-gray-50 flex min-h-screen flex-col')}>
        <ReactQueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <GlobalHeaderWrapper />
            <main className="container mx-auto flex min-h-screen flex-col items-center">
              {children}
            </main>
            <Toaster />
            <GlobalFooter />
            <ModalPortal />
          </ThemeProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}

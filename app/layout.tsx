import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import StoreProvider from '../store/providers/StoreProvider';
import LoggedInProvider from '../store/providers/LoggedInProvider';
import ThemeProvider from '../store/providers/ThemeProvider';
import KakaoScript from '../components/external/KakaoScript';
import localFont from 'next/font/local'


const inter = Noto_Sans_KR({ subsets: ['latin'], preload:false});

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})


export const metadata: Metadata = {
  title: '네디플',
  description: '네일아트 디자인 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard`} suppressHydrationWarning={true}>
        <StoreProvider>          
          <LoggedInProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </LoggedInProvider>
        </StoreProvider>
      </body>
      <KakaoScript />
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '../store/providers/StoreProvider';
import LoggedInProvider from '../store/providers/LoggedInProvider';
import ThemeProvider from '../store/providers/ThemeProvider';
import KakaoScript from '../components/external/KakaoScript';
import AlarmSSEProvider from '../store/providers/AlarmSSEProvider';

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
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <LoggedInProvider>
            <AlarmSSEProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </AlarmSSEProvider>
          </LoggedInProvider>
        </StoreProvider>
      </body>
      <KakaoScript />
    </html>
  );
}

import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import StoreProvider from '../store/StoreProvider';
import ThemeProvider from '../store/ThemeProvider';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '네디플',
  description: '네일아트 디자인 플랫폼',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <StoreProvider>
          <ThemeProvider>
            {modal}
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

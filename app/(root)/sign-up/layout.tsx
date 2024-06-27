import TopBar from './components/TopBar';

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection flex-1 h-screen flex-col">
      <TopBar/>
      {children}
    </section>
  );
}
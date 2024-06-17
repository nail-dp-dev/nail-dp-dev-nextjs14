

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section className="w-screen min-h-screen bg-kakaoYellow">
        {children}
      </section>
  );
}

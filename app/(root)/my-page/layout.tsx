
export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="ContainerWrapper w-full h-full">
      {children}
    </section>
  );
}
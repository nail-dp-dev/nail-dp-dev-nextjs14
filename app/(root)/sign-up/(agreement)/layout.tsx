export default function AgreementLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="contentSection flex-1 h-screen flex-col">
      {children}
      {modal}
    </div>
  );
}
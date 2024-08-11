
export default function DesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="designContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="designContentContainer flex w-full h-full flex-1 relative">
        <div className="designContentsDiv relative w-full h-full flex flex-col ">
          {children}
        </div>
      </div>
    </section>
  );
}
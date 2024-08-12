
export default function BuyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="buyContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="buyContentContainer flex w-full h-full flex-1 relative">
        <div className="buyContentsDiv relative w-full h-full flex flex-col ">
          {children}
        </div>
      </div>
    </section>
  );
}
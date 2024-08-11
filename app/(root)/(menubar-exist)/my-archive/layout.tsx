import MyArchiveCategoryBar from './components/CategoryBar'

export default function MyArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="myArchiveContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="myArchiveContentContainer flex w-full h-full flex-1 relative">
        <div className="myArchiveContentsDiv relative w-full h-full flex flex-col ">
          <MyArchiveCategoryBar />
          {children}
        </div>
      </div>
    </section>
  );
}
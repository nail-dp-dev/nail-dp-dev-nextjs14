import DetailArchiveTopBar from './components/TopBar';

export default function DetailArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="detailArchiveContentSection h-screen flex-1 flex-col p-[20px] ">
      <div className="detailArchivecontentContainer relative flex h-full w-full flex-1">
        <div className="detailArchivecontentsDiv relative flex h-full w-full flex-col">
          <DetailArchiveTopBar />
          {children}
        </div>
      </div>
    </section>
  );
}

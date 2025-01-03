import SearchBar from '../../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../../components/notice/NotLoginNotice';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection flex-1 h-full flex-col p-[20px]">
      <div className="contentContainer relative flex h-full w-full flex-1">
        <div className="contentsDiv relative flex h-full w-full flex-col">
          <NotLoginNotice>
            <SearchBar />
            {children}
          </NotLoginNotice>
        </div>
      </div>
    </section>
  );
}

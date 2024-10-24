import RowMenuBar from '../../../../../components/bars/RowMenuBar';
import SearchBar from '../../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../../components/notice/NotLoginNotice';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection h-full flex-1 flex-col p-[20px]">
      <div className="contentContainer relative flex h-full w-full flex-1 flex-col">
        <NotLoginNotice>
          <SearchBar />
          {children}
        </NotLoginNotice>
      </div>
    </section>
  );
}

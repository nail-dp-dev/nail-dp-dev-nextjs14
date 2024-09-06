import MenuBar from '../../../../components/bars/MenuBar';
import SearchBar from '../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../components/notice/NotLoginNotice';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="contentSection h-screen flex-1 flex-col p-[20px]">
        <div className="contentContainer flex h-full w-full flex-1 ">
          <div className="contentWrapper flex h-full w-full flex-col">
            <NotLoginNotice>
              <SearchBar />
              {children}
            </NotLoginNotice>
          </div>
        </div>
      </section>
    </>
  );
}

import SearchBar from '../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../components/notice/NotLoginNotice';


export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="myPageContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="myPageContentContainer flex w-full h-full flex-1 relative">
        <div className="myPageContentsDiv relative w-full h-full flex flex-col">  
          <NotLoginNotice>
            <SearchBar />
            {children}
          </NotLoginNotice>
        </div>
      </div>
    </section>
  );
}

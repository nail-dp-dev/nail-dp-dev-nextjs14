import SearchBar from '../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../components/notice/NotLoginNotice';


export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="privacyContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="privacyContentContainer flex w-full h-full flex-1 relative">
        <div className="privacyContentsDiv relative w-full h-full flex flex-col">  
          {children}
        </div>
      </div>
    </section>
  );
}

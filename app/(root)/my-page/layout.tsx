import MenuBar from '../../../components/bars/MenuBar';
import SearchBar from '../../../components/bars/search/SearchBar';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="menuSection h-screen py-[20px] pl-[20px]">
        <MenuBar />
      </section>
      <section className="contentSection flex-1 h-screen flex-col p-[20px]">
        <div className="contentContainer flex w-full h-full flex-1 ">
          <div className="contentWrapper w-full h-full flex flex-col">
            <SearchBar />
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

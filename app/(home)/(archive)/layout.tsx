import CategoryBar from '../../../components/bars/CategoryBar';
import MenuBar from '../../../components/bars/MenuBar';
import SearchBar from '../../../components/bars/SearchBar';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <MenuBar />
    <section className="contentSection flex-1 flex-col px-[20px]">
      <div className="ContainerWrapper w-full h-full]">
        <div className="ContainerWrapper w-full h-full">
          <SearchBar /> 
          <CategoryBar />
          {children}
        </div>
      </div>
    </section>
    </>
  );
}
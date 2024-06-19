import CategoryBar from '../../../components/bars/CategoryBar';
import MenuBar from '../../../components/bars/MenuBar';
import SearchBar from '../../../components/bars/SearchBar';
import { archiveCategoryElements } from '../../../constants';

export default function ArchiveLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
    {modal}
    <MenuBar />
    <section className="contentSection flex-1 flex-col px-[20px]">
      <div className="containerWrapper w-full h-full]">
        <div className="containerWrapper w-full h-full">
          <SearchBar /> 
          <CategoryBar elements={archiveCategoryElements} />
          {children}
        </div>
      </div>
    </section>
    </>
  );
}
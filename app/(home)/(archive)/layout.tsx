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
    <section className='hidden'>
      {modal}
    </section>
    <section className='menuSection h-screen py-[20px] pl-[20px]'>
      <MenuBar />
    </section>
    <section className="contentSection flex-1 h-screen flex-col p-[20px]">
      <div className="contentContainer flex w-full max-h-full flex-1 ">
        <div className="contentWrapper w-full flex flex-col">
          <SearchBar /> 
          <CategoryBar elements={archiveCategoryElements} />
          {children}
        </div>
      </div>
    </section>
    </>
  );
}
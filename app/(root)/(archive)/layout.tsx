import CategoryBar from '../../../components/bars/CategoryBar';
import MenuBar from '../../../components/bars/MenuBar';
import SearchBar from '../../../components/bars/search/SearchBar';
import { archiveCategoryElements } from '../../../constants';
import LoginSuggestModal from '../../../components/modal/mini/LoginSuggestModal';

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
      <section className="contentSection flex-1 h-screen flex-col p-[20px] ">
        <div className="contentContainer flex w-full h-full flex-1 relative">
          <div className="contentsDiv relative w-full h-full flex flex-col">
            <SearchBar />
            <CategoryBar elements={archiveCategoryElements} />
            {children}
            <LoginSuggestModal />
          </div>
        </div>
      </section>
    </>
  );
}

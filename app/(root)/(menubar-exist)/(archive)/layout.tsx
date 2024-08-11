import CategoryBar from '../../../../components/bars/CategoryBar';
import MenuBar from '../../../../components/bars/MenuBar';
import SearchBar from '../../../../components/bars/search/SearchBar';
import { archiveCategoryElements } from '../../../../constants';
import LoginSuggestModal from '../../../../components/modal/mini/LoginSuggestModal';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="archiveContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="archiveContentContainer flex w-full h-full flex-1 relative">
        <div className="archiveContentsDiv relative w-full h-full flex flex-col ">
          <SearchBar />
          <CategoryBar elements={archiveCategoryElements} />
          {children}
          <LoginSuggestModal />
        </div>
      </div>
    </section>
  );
}

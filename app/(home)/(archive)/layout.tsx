import Link from 'next/link';
import CategoryBar from '../../../components/bars/CategoryBar';
import MenuBar from '../../../components/bars/MenuBar';
import SearchBar from '../../../components/bars/SearchBar';
import { archiveCategoryElements } from '../../../constants';
import LoginSuggestModal from '../../../components/modal/mini/LoginSuggestModal';

export default function ArchiveLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
    <section className='modalSection'>
      {modal}
    </section>
    <section className='menuSection h-screen py-[20px] pl-[20px]'>
      <MenuBar />
    </section>
    <section className="contentSection flex-1 h-screen flex-col p-[20px]">
      <div className="contentContainer flex w-full h-full flex-1 ">
        <div className="contentWrapper relative w-full h-full flex flex-col">
          <SearchBar /> 
          <CategoryBar elements={archiveCategoryElements} />
          {children}
          <LoginSuggestModal/>
        </div>
      </div>
    </section>
    </>
  );
}
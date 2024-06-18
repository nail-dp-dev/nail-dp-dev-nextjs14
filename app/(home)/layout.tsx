import MenuBar from '../../components/bars/MenuBar';
import SearchBar from '../../components/bars/SearchBar';
import CategoryBar from './(archive)/components/CategoryBar';

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-screen h-screen flex py-[20px] px-[25px]
      bg-white dark:bg-themeDark text-textBlack dark:text-white "
    >
      <MenuBar />
      <section className="contentSection flex-1 flex-col px-[20px]">
        <SearchBar /> 
        <CategoryBar />
      <div className="ContainerWrapper w-full h-full]">
        {children}
      </div>
      </section>
    </main>
  );
}
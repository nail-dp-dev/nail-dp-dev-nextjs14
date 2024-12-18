import SearchBar from '../../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../../components/notice/NotLoginNotice';

export default function CustomerSupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="customerSupportContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="customerSupportContentContainer flex w-full h-full flex-1 relative">
        <div className="customerSupportContentsDiv relative w-full h-full flex flex-col">  
          {children}
        </div>
      </div>
    </section>
  );
}

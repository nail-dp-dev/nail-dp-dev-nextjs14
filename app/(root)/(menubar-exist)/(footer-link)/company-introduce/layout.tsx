import SearchBar from '../../../../../components/bars/search/SearchBar';
import NotLoginNotice from '../../../../../components/notice/NotLoginNotice';

export default function CompanyIntroduceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="companyIntroduceContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="companyIntroduceContentContainer flex w-full h-full flex-1 relative">
        <div className="companyIntroduceContentsDiv relative w-full h-full flex flex-col">  
          {children}
        </div>
      </div>
    </section>
  );
}

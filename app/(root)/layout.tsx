import FooterBox from '../../components/boxes/FooterBox';
import CommonModalLayout from '../../components/modal/common/commonModalLayout';
import MessageModal from '../../components/modal/message/MessageModal';
import RowMenuBar from '../../components/bars/RowMenuBar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-screen min-w-[344px] h-screen flex flex-col items-center justify-center
      bg-white dark:bg-themeDark text-textBlack dark:text-white relative overflow-hidden"
    >
      <CommonModalLayout/>
      <MessageModal />
      <div className='w-full h-full flex items-center justify-center dark:bg-themeDark text-textBlack dark:text-white relative overflow-hidden'>
        {children}
      </div>
      <RowMenuBar/>

      {/* md:hidden */}
      <div className='relative w-full h-[30px] xs:hidden sm:hidden md:block'>
        <FooterBox />
      </div>

  </main>
  );
}
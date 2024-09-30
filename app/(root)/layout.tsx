import MenuBar from '../../components/bars/MenuBar';
import FooterBox from '../../components/boxes/FooterBox';
import CommonModalLayout from '../../components/modal/common/commonModalLayout';
import MessageModal from '../../components/modal/message/MessageModal';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-screen h-screen flex flex-col items-center justify-center
      bg-white dark:bg-themeDark text-textBlack dark:text-white relative overflow-hidden"
    >
      <CommonModalLayout/>
      <MessageModal />
      <div className='w-full h-full flex items-center justify-center dark:bg-themeDark text-textBlack dark:text-white relative overflow-hidden'>
        {children}
      </div>
      <div className='relative w-full md:hidden'>
        <FooterBox />
      </div>

  </main>
  );
}
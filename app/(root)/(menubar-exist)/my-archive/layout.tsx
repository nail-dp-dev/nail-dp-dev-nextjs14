import NotLoginNotice from '../../../../components/notice/NotLoginNotice';
import MyArchiveTopBar from './components/TopBar';

export default function MyArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="myArchiveContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="myArchiveContentContainer flex w-full h-full flex-1 relative">
        <div className="myArchiveContentsDiv relative w-full h-full flex flex-col">          
          <NotLoginNotice>
            <MyArchiveTopBar/>
            {children}
          </NotLoginNotice>
        </div>
      </div>
    </section>
  );
}
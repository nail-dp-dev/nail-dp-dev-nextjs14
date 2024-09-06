import MenuBar from '../../../../../../components/bars/MenuBar';
import NotLoginNotice from '../../../../../../components/notice/NotLoginNotice';

export default function PostCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection h-screen flex-1 flex-col p-[20px] ">
      <div className="contentContainer relative flex h-full w-full flex-1">
        <div className="contentsDiv relative flex h-full w-full flex-col">
          <NotLoginNotice>{children}</NotLoginNotice>
        </div>
      </div>
    </section>
  );
}

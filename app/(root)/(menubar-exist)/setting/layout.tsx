import NotLoginNotice from '../../../../components/notice/NotLoginNotice';

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="contentSection h-full flex-1 flex-col p-[20px]">
        <div className="contentContainer relative flex h-full w-full flex-1 ">
          <div className="contentWrapper relative flex h-full w-full flex-col">
            <NotLoginNotice>
              {children}
            </NotLoginNotice>
          </div>
        </div>
      </section>
    </>
  );
}

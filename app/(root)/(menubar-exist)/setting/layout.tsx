import NotLoginNotice from "../../../../components/notice/NotLoginNotice";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="contentSection h-screen flex-1 flex-col p-[20px]">
        <div className="contentContainer flex h-full w-full flex-1 ">
          <div className="contentWrapper flex h-full w-full flex-col">
            <NotLoginNotice>
              {children}
            </NotLoginNotice>
          </div>
        </div>
      </section>
    </>
  );
}
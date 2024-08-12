import MenuBar from "../../../../../components/bars/MenuBar";

export default function PostCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection h-screen flex-1 flex-col p-[20px]">
      <div className="contentContainer flex h-full w-full flex-1 ">
        <div className="contentWrapper flex h-full w-full flex-col border-none">
          {children}
        </div>
      </div>
    </section>
  );
}

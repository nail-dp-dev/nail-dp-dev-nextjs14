import MenuBar from "../../../../../../components/bars/MenuBar";

export default function PostCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="contentSection h-screen flex-1 flex-col p-[20px] ">
      <div className="contentContainer relative flex h-full w-full flex-1">
        <div className="contentsDiv relative flex h-full w-full flex-col">
          {children}
        </div>
      </div>
    </section>
  );
}

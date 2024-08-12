import MenuBar from '../../../components/bars/MenuBar';


export default function MenuBarExistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="menuSection h-screen py-[20px] pl-[20px]">
        <MenuBar />
      </section>
      {children}
    </>
  );
}

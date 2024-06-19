export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-screen h-screen flex py-[20px] px-[25px]
      bg-white dark:bg-themeDark text-textBlack dark:text-white "
    >
      {children}
    </main>
  );
}
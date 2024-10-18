import React from 'react';
import MenuBar from '../../../components/bars/MenuBar';

function MenuBarExistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="menuSection h-full py-[20px] pl-[20px] xs:hidden ">
        <MenuBar />
      </section>
      {children}
    </>
  );
}

export default React.memo(MenuBarExistLayout);

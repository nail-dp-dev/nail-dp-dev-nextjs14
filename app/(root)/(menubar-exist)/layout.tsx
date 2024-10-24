import React from 'react';
import ColumnMenuBar from '../../../components/bars/ColumnMenuBar';
import RowMenuBar from '../../../components/bars/RowMenuBar';

function MenuBarExistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="smallMenuSection h-full py-[20px] pl-[20px] xs:hidden">
        <ColumnMenuBar />
      </section>
      {children}
    </>
  );
}

export default React.memo(MenuBarExistLayout);

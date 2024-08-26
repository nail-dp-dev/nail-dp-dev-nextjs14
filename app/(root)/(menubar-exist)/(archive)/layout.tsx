import React from 'react';
import SearchBar from '../../../../components/bars/search/SearchBar';

function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="archiveContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="archiveContentContainer flex w-full h-full flex-1 relative">
        <div className="archiveContentsDiv relative w-full h-full flex flex-col ">
          <SearchBar />
          {children}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ArchiveLayout)
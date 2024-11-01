import React from 'react';
import SearchBar from '../../../../components/bars/search/SearchBar';
import FooterBox from '../../../../components/boxes/FooterBox';

function ArchivePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="archiveContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="archiveContentContainer flex w-full h-full flex-1 relative">
        <div className="archiveContentsDiv relative w-full h-full flex flex-col">
          <SearchBar />
          {children}
          <FooterBox />
        </div>
      </div>
    </section>
  );
}

export default React.memo(ArchivePageLayout)
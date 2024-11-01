export default function PrivacyCollectionAgreementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="privacyCollectionAgreementContentSection flex-1 h-full flex-col p-[20px] ">
      <div className="privacyCollectionAgreementContentContainer flex w-full h-full flex-1 relative">
        <div className="privacyCollectionAgreementContentsDiv relative w-full h-full flex flex-col">  
          {children}
        </div>
      </div>
    </section>
  );
}

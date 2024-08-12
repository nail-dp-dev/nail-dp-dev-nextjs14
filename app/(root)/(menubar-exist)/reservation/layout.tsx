
export default function ReservationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="reservationContentSection flex-1 h-screen flex-col p-[20px] ">
      <div className="reservationContentContainer flex w-full h-full flex-1 relative">
        <div className="reservationContentsDiv relative w-full h-full flex flex-col ">
          {children}
        </div>
      </div>
    </section>
  );
}
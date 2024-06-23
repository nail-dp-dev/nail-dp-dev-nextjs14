
export default function ReservationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="ContainerWrapper w-full h-full">
      {children}
    </div>
  );
}
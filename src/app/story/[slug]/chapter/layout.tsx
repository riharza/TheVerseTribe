export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-auto">
      {children}
    </div>
  );
}

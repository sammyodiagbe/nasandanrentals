export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-10 flex items-center justify-center flex-col gap-12">
      {children}
    </div>
  );
}

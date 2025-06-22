import DashboardNavbar from 'app/components/dashboard-navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="absolute top-12 h-[calc(100%-3rem)] w-[calc(100%-14rem)] p-6 overflow-y-auto">
        {children}
      </main>
    </>
  );
}

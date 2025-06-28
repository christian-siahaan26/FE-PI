import Navbar from "@/components/navbar/NavbarDashboard";
import AsideDashboard from "../components/aside/AsideDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row  w-full min-h-screen">
      <div className="bg-slate-800 w-1/6 lg:w-1/6 border-r-2 border-gray-400">
        <AsideDashboard />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-1 h-screen px-5 py-5 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

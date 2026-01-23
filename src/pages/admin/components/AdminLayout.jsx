import { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">
      <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <HeaderAdmin
          title={title}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
}


import type React from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-6 bg-[#F5F1E8] dark:bg-[#121B16]">
      <aside className="hidden w-72 shrink-0 md:block">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

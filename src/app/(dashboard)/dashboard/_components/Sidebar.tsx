
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  CalendarDays,
  Camera,
  ArrowUpRight,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Studio",
    href: "/dashboard/add-studio",
    icon: PlusCircle,
  },
  {
    name: " My Studio Listings",
    href: "/dashboard/my-listings",
    icon: ClipboardList,
  },
  {
    name: "My Bookings",
    href: "/dashboard/my-bookings",
    icon: CalendarDays,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-screen w-full flex-col border-r border-[#E5E0D5] bg-[#F5F1E8] px-5 py-7">

      {/* Logo */}
      <Link href="/" className="mb-12 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#24352D] text-[#F5F1E8]">
          <Camera size={23} />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#24352D]">
            StudioSpace
          </h2>
          <p className="text-xs tracking-widest text-[#66736A]">
            CREATIVE SPACES
          </p>
        </div>
      </Link>

      {/* Menu Heading */}
      <div className="mb-4 px-3">
        <p className="text-xs font-bold uppercase tracking-[2px] text-[#8A948C]">
          Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 ${
                isActive
                  ? "bg-[#24352D] text-[#F5F1E8] shadow-lg shadow-[#24352D]/15"
                  : "text-[#66736A] hover:bg-[#E8E5D9] hover:text-[#24352D]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={1.8} />

                <span className="text-sm font-semibold">
                  {item.name}
                </span>
              </div>

              {isActive && (
                <ArrowUpRight size={17} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="mt-8 rounded-2xl bg-[#E8E5D9] p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#24352D] text-[#F5F1E8]">
          <Camera size={20} />
        </div>

        <h3 className="text-base font-bold text-[#24352D]">
          Your Creative Space
        </h3>

        <p className="mt-2 text-xs leading-6 text-[#66736A]">
          Manage your studios and bookings in one place.
        </p>

        <Link
          href="/explore"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#24352D] hover:text-[#C58B55]"
        >
          Explore Studios
          <ArrowUpRight size={16} />
        </Link>
      </div>

    </aside>
  );
}

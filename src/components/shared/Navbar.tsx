
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Camera,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore-studios" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session } = useSession();

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E3D9] bg-[#F5F1E8]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#24352D] text-white">
            <Camera size={27} strokeWidth={2} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-[#24352D] sm:text-3xl">
            Studio<span className="text-[#C58B55]">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-base font-semibold text-[#24352D] transition-colors duration-200 hover:text-[#C58B55]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          {session ? (
            <div className="relative">

              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-3 rounded-xl border border-[#E8E3D9] px-3 py-2 transition hover:bg-[#E8E3D9]"
                aria-expanded={profileOpen}
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    className="h-10 w-10 rounded-full border-2 border-[#C58B55] object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24352D] font-semibold text-white">
                    {(session.user?.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <span className="font-semibold text-[#24352D]">
                  {session.user?.name || "Profile"}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-[#24352D] transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-xl border border-[#E8E3D9] bg-white shadow-xl">

                  <div className="border-b border-[#E8E3D9] px-4 py-3">
                    <p className="font-semibold text-[#24352D]">
                      {session.user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#24352D] transition hover:bg-[#F5F1E8]"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full border-t border-[#E8E3D9] px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-3 text-base font-semibold text-[#24352D] transition hover:text-[#C58B55]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#24352D] px-6 py-3 text-base font-semibold text-white transition duration-300 hover:bg-[#354D40]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-lg p-2.5 text-[#24352D] transition hover:bg-[#E8E3D9] xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#E8E3D9] bg-[#F5F1E8] px-5 py-6 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[#24352D] transition hover:text-[#C58B55]"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-[#E8E3D9] pt-5">

              {session ? (
                <>
                  {/* Mobile User Profile */}
                  <div className="flex items-center gap-3 pb-3">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "Profile"}
                        className="h-12 w-12 rounded-full border-2 border-[#C58B55] object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#24352D] font-semibold text-white">
                        {(session.user?.name || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-[#24352D]">
                        {session.user?.name || "User"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#24352D] py-3 font-semibold text-white transition hover:bg-[#354D40]"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg bg-red-600 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-[#24352D] py-3 text-center font-semibold text-[#24352D] transition hover:bg-[#24352D] hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-[#24352D] py-3 text-center font-semibold text-white transition hover:bg-[#354D40]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

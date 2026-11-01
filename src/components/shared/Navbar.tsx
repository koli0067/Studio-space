
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Camera, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore-studios" },
  // { name: "Add Studio", href: "/add-studios" },
  // { name: "My-Listings", href: "/my-listings" },
  // { name: "My Bookings", href: "/my-bookings" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E3D9] bg-[#F5F1E8]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-5">

        {/*navbar  Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#24352D] text-white">
            <Camera size={27} strokeWidth={2} />
          </div>

          <span className="text-3xl font-bold tracking-tight text-[#24352D]">
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

        {/* Authentication Buttons */}
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          {session ? (
            
<div className="relative border-2 rounded">
  <button
    onClick={() => setProfileOpen((v) => !v)}
    className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-[#E8E3D9]"
    aria-expanded={profileOpen}
  >
    {session.user?.image ? (
      <img
        src={session.user.image}
        alt={session.user.name || "Profile"}
        className="h-9 w-9 rounded-full object-cover border-2"
      />
    ) : (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24352D] text-white">
        {(session.user?.name || "U").charAt(0).toUpperCase()}
      </div>
    )}

    <span className="text-base font-semibold text-[#24352D]">
      {session.user?.name || "Profile"}
    </span>

    <ChevronDown
      size={18}
      className={`text-[#24352D] transition-transform duration-200 ${
        profileOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {profileOpen && (
    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#E8E3D9] bg-white py-2 shadow-lg z-50">
      <div className="border-b border-[#E8E3D9] px-4 py-2 text-xs text-gray-500">
        Signed in as {session.user?.email}
      </div>

      <Link
        href="/dashboard/my-bookings"
        className="block px-4 py-2 text-sm text-[#24352D] hover:bg-[#F5F1E8]"
        onClick={() => setProfileOpen(false)}
      >
        My Bookings
      </Link>

      <Link
        href="/dashboard/add-studio"
        className="block px-4 py-2 text-sm text-[#24352D] hover:bg-[#F5F1E8]"
        onClick={() => setProfileOpen(false)}
      >
        Add Studio
      </Link>

      <Link
        href="/dashboard/my-listings"
        className="block px-4 py-2 text-sm text-[#24352D] hover:bg-[#F5F1E8]"
        onClick={() => setProfileOpen(false)}
      >
        My Listings
      </Link>

      <button
        onClick={async () => {
          setProfileOpen(false);
          await signOut();
        }}
        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#F5F1E8]"
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
          onClick={() => setIsOpen(!isOpen)}
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
                  <Link href="/dashboard/profile" onClick={() => setIsOpen(false)} className="rounded-lg border border-[#24352D] py-3 text-center text-base font-semibold text-[#24352D]">My Profile</Link>
                  <Link href="/dashboard/add-studio" onClick={() => setIsOpen(false)} className="rounded-lg border border-[#24352D] py-3 text-center text-base font-semibold text-[#24352D]">Add Studio</Link>
                  <Link href="/dashboard/my-listings" onClick={() => setIsOpen(false)} className="rounded-lg border border-[#24352D] py-3 text-center text-base font-semibold text-[#24352D]">My Listings</Link>
                  <Link href="/dashboard/my-bookings" onClick={() => setIsOpen(false)} className="rounded-lg border border-[#24352D] py-3 text-center text-base font-semibold text-[#24352D]">My Bookings</Link>
                  <button
                    onClick={async () => { setIsOpen(false); await signOut(); }}
                    className="rounded-lg bg-red-600 py-3 text-center text-base font-semibold text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-[#24352D] py-3 text-center text-base font-semibold text-[#24352D] transition hover:bg-[#24352D] hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-[#24352D] py-3 text-center text-base font-semibold text-white transition hover:bg-[#354D40]"
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

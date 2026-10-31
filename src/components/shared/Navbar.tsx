
"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore" },
  { name: "Add Studio", href: "/add-studios" },
  { name: "My Listings", href: "/my-listings" },
  { name: "My Bookings", href: "/my-bookings" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E3D9] bg-[#F5F1E8]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-5">

        {/* Logo */}
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
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

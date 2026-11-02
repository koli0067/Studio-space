"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore-studios" },
  { name: "Add Studio", href: "/dashboard/add-studio" },
  { name: "My Listings", href: "/dashboard/my-listings" },
  { name: "My Bookings", href: "/dashboard/my-bookings" },
];

const popularCategories = [
  { name: "Photo Studios", slug: "photo-studios" },
  { name: "Sound Stages", slug: "sound-stages" },
  { name: "Podcast Rooms", slug: "podcast-rooms" },
  { name: "Music Suites", slug: "music-suites" },
  { name: "Art Workshops", slug: "art-workshops" },
];

const supportLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#1B2922] text-white">
      <div className="mx-auto max-w-7xl py-16">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand Information */}
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C58B55]">
                <Camera size={27} className="text-white" />
              </div>

              <span className="text-3xl font-bold">
                Studio<span className="text-[#C58B55]">Space</span>
              </span>
            </Link>

            <p className="max-w-xs text-base leading-8 text-white/65">
              Your creative journey starts here. Discover and book
              professional photography studios for every creative vision.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:-translate-y-1 hover:bg-[#C58B55]"
              >
                <FaFacebookF size={19} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:-translate-y-1 hover:bg-[#C58B55]"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:-translate-y-1 hover:bg-[#C58B55]"
              >
                <FaLinkedinIn size={19} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:-translate-y-1 hover:bg-[#C58B55]"
              >
                <FaXTwitter size={19} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-7 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-3 text-base text-white/65 transition duration-300 hover:translate-x-1 hover:text-[#C58B55]"
                  >
                    <ArrowRight size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-7 text-xl font-bold">
              Support
            </h3>

            <ul className="space-y-5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-3 text-base text-white/65 transition duration-300 hover:translate-x-1 hover:text-[#C58B55]"
                  >
                    <ArrowRight size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-7 text-xl font-bold">
              Get In Touch
            </h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Mail
                  size={21}
                  className="mt-1 shrink-0 text-[#C58B55]"
                />
                <span className="text-base leading-7 text-white/65">
                  support@studiospace.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={21}
                  className="mt-1 shrink-0 text-[#C58B55]"
                />
                <span className="text-base leading-7 text-white/65">
                  +880 1XXX-XXXXXX
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={21}
                  className="mt-1 shrink-0 text-[#C58B55]"
                />
                <span className="text-base leading-7 text-white/65">
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter & Popular Categories */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-white/65">
              Subscribe for updates and new studios.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#C58B55]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#C58B55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b07a47]"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Popular Categories</h3>
            <ul className="grid grid-cols-2 gap-2">
              {popularCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/studios?category=${cat.slug}`}
                    className="text-sm text-white/65 transition hover:text-[#C58B55]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-white/55">
              © {currentYear} StudioSpace. All rights reserved. Terms & Conditions apply.
            </p>

            <p className="text-sm font-medium text-white/55">
              Made for Creative Minds
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}
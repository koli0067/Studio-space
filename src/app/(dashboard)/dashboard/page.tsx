import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  ClipboardList,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] p-5 md:p-8">
      {/* Welcome Banner */}
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#243b32] p-7 text-white md:p-10">
        <div className="relative z-10 max-w-xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-[#e4d9bd]">
            <Sparkles size={14} />
            YOUR CREATIVE WORKSPACE
          </span>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Welcome to <br />
            StudioSpace!
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-gray-300">
            Your creative journey starts here. Manage your studios, explore
            opportunities and keep your bookings organized.
          </p>

          <Link
            href="/explore-studios"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e7ddc5] px-5 py-3 text-sm font-semibold text-[#243b32] transition hover:bg-white"
          >
            Explore Studios
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5 md:h-80 md:w-80" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-64 w-64 rounded-full bg-[#ffffff08]" />

        <Camera
          className="absolute bottom-8 right-8 hidden text-white/10 md:block"
          size={145}
          strokeWidth={1}
        />
      </section>

      {/* Section Heading */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-[#8b927f]">
          Workspace Overview
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#243b32]">
          Manage Your Space
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Everything you need to manage your StudioSpace account.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/dashboard/add-studio"
          className="group rounded-2xl border border-[#e9e5da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a9b9a8] hover:shadow-lg"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf1e9] text-[#29483b] transition group-hover:bg-[#243b32] group-hover:text-white">
            <Plus size={27} />
          </div>

          <h3 className="text-lg font-bold text-[#243b32]">Add New Studio</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Share your creative space with creators and add a new studio
            listing.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[#f0eee8] pt-4 text-sm font-semibold text-[#526c58]">
            Get Started
            <ArrowUpRight
              size={19}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>

        <Link
          href="/dashboard/my-listings"
          className="group rounded-2xl border border-[#e9e5da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a9b9a8] hover:shadow-lg"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3eee2] text-[#927744] transition group-hover:bg-[#243b32] group-hover:text-white">
            <ClipboardList size={27} />
          </div>

          <h3 className="text-lg font-bold text-[#243b32]">
            My Studio Listings
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            View, update and manage all your listed creative spaces.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[#f0eee8] pt-4 text-sm font-semibold text-[#526c58]">
            Manage Listings
            <ArrowUpRight
              size={19}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>

        <Link
          href="/dashboard/my-bookings"
          className="group rounded-2xl border border-[#e9e5da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a9b9a8] hover:shadow-lg sm:col-span-2 xl:col-span-1"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf0ed] text-[#426d5b] transition group-hover:bg-[#243b32] group-hover:text-white">
            <CalendarDays size={27} />
          </div>

          <h3 className="text-lg font-bold text-[#243b32]">My Bookings</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Keep track of your studio reservations and booking status.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[#f0eee8] pt-4 text-sm font-semibold text-[#526c58]">
            View Bookings
            <ArrowUpRight
              size={19}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>
      </div>

      {/* Bottom Message */}
      <div className="mt-8 rounded-2xl border border-[#e9e5da] bg-[#f0eee5] p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-[#243b32]">
              Create Something Amazing!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Find the perfect space for your next creative project.
            </p>
          </div>

          <Link
            href="/explore-studios"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-[#243b32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#365848] sm:self-center"
          >
            Discover Spaces
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

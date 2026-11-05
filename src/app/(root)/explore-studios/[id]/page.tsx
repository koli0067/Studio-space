
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  MapPin,
  MessageSquareText,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingButton from "../_component/BookingButton";
import GalleryCarousel from "../_component/GalleryCarousel";

interface Studio {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  images?: string[];
  location: string;
  pricePerHour: number;
  securityDeposit?: number;
  capacity: number;
  facilities: string[];
  amenities?: string[];
  isAvailable: boolean;
  creatorName?: string;
  creatorEmail?: string;
}

const formatCategory = (value: string) => value?.split("-").join(" ") || "";

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const studio: Studio = await res.json();

  if (!studio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-12 dark:bg-[#121B16] md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/explore-studios"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8E3D9] bg-white px-5 py-3 text-sm font-semibold text-[#24352D] shadow-sm transition hover:border-[#C58B55] hover:text-[#C58B55] dark:border-gray-700 dark:bg-[#1B2922] dark:text-white"
        >
          <ArrowLeft size={17} />
          Back to Studios
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-[#E8E3D9] bg-white shadow-[0_15px_60px_rgba(36,53,45,0.08)] dark:border-gray-700 dark:bg-[#1B2922]">
          {/* Image Section */}
          <div className="relative">
            <GalleryCarousel
              image={studio.image}
              images={studio.images}
              name={studio.name}
            />

            {/* Category */}
            <span className="absolute left-6 top-6 z-10 rounded-full border border-white/40 bg-white/95 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#24352D] shadow-lg backdrop-blur-md dark:border-gray-600 dark:bg-[#1B2922]/95 dark:text-white md:left-10 md:top-10">
              {formatCategory(studio.categorySlug)}
            </span>

            {/* Price */}
            <div className="absolute bottom-24 right-6 z-10 rounded-2xl border border-white/30 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-md dark:border-gray-600 dark:bg-[#1B2922]/95 md:bottom-28 md:right-10">
              <p className="mb-1 text-xs font-medium text-slate-500 dark:text-gray-400">
                Price Per Hour
              </p>
              <p className="text-2xl font-extrabold text-[#24352D] dark:text-white md:text-3xl">
                ${studio.pricePerHour}
                <span className="ml-1 text-sm font-medium text-[#C58B55]">
                  /hr
                </span>
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-3 lg:gap-14">
            {/* Left Content */}
            <div className="space-y-10 lg:col-span-2">
              {/* Studio Name */}
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                  Discover Our Studio
                </p>

                <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#24352D] dark:text-white md:text-5xl">
                  {studio.name}
                </h1>

                <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-gray-400 md:text-lg">
                  {studio.description}
                </p>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="group flex items-center gap-4 rounded-2xl border border-[#E8E3D9] bg-[#F5F1E8]/70 p-5 transition hover:border-[#C58B55] hover:bg-[#F5F1E8] dark:border-gray-700 dark:bg-[#24352D] dark:hover:bg-[#2C4035]">
                  <div className="rounded-xl bg-[#24352D] p-4 transition group-hover:bg-[#C58B55] dark:bg-[#1B2922]">
                    <MapPin className="text-white" size={24} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-slate-500 dark:text-gray-400">
                      Studio Location
                    </p>
                    <p className="font-bold text-[#24352D] dark:text-white">
                      {studio.location}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-2xl border border-[#E8E3D9] bg-[#F5F1E8]/70 p-5 transition hover:border-[#C58B55] hover:bg-[#F5F1E8] dark:border-gray-700 dark:bg-[#24352D] dark:hover:bg-[#2C4035]">
                  <div className="rounded-xl bg-[#24352D] p-4 transition group-hover:bg-[#C58B55] dark:bg-[#1B2922]">
                    <Users className="text-white" size={24} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-slate-500 dark:text-gray-400">
                      Studio Capacity
                    </p>
                    <p className="font-bold text-[#24352D] dark:text-white">
                      {studio.capacity} People
                    </p>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <div className="mb-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                    What We Offer
                  </p>
                  <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#24352D] dark:text-white">
                    <Camera className="text-[#C58B55]" size={24} />
                    Studio Facilities
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {studio.facilities?.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-3 rounded-xl border border-[#E8E3D9] bg-white p-4 transition hover:border-[#C58B55] hover:shadow-sm dark:border-gray-700 dark:bg-[#24352D]"
                    >
                      <div className="rounded-full bg-[#F5F1E8] p-2 dark:bg-[#1B2922]">
                        <CheckCircle2 size={18} className="text-[#24352D] dark:text-[#C58B55]" />
                      </div>

                      <span className="text-sm font-semibold text-[#24352D] dark:text-white">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {studio.amenities && studio.amenities.length > 0 && (
                <div>
                  <div className="mb-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                      Comfort & Convenience
                    </p>
                    <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#24352D] dark:text-white">
                      <Sparkles className="text-[#C58B55]" size={24} />
                      Studio Amenities
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {studio.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-[#E8E3D9] bg-[#F5F1E8] px-4 py-2 text-sm font-semibold text-[#24352D] dark:border-gray-700 dark:bg-[#24352D] dark:text-white"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="border-t border-[#E8E3D9] pt-8 dark:border-gray-700">
                <div className="mb-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                    Client Feedback
                  </p>
                  <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#24352D] dark:text-white">
                    <MessageSquareText className="text-[#C58B55]" size={24} />
                    Customer Reviews
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#E8E3D9] bg-[#F5F1E8]/50 p-5 dark:border-gray-700 dark:bg-[#24352D]">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-[#24352D] dark:text-white">
                        Koli Khatun
                      </span>
                      <span className="text-sm font-semibold text-[#C58B55]">
                        ★ 5.0
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Amazing studio space with great lighting and professional environment!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div>
              <div className="sticky top-8 rounded-3xl border border-[#E8E3D9] bg-[#F5F1E8] p-6 dark:border-gray-700 dark:bg-[#24352D] md:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                  Studio Overview
                </p>

                <h2 className="mb-7 text-2xl font-extrabold text-[#24352D] dark:text-white">
                  Studio Information
                </h2>

                {/* Availability */}
                <div className="mb-6 rounded-2xl border border-[#E8E3D9] bg-white p-5 dark:border-gray-700 dark:bg-[#1B2922]">
                  <p className="mb-3 text-sm font-medium text-slate-500 dark:text-gray-400">
                    Availability Status
                  </p>

                  {studio.isAvailable ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F1E8] px-4 py-2.5 text-sm font-bold text-[#24352D] dark:bg-[#24352D] dark:text-white">
                      <CheckCircle2 size={18} />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      <XCircle size={18} />
                      Not Available
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-5 border-b border-[#E8E3D9] pb-5 dark:border-gray-700">
                  <p className="mb-2 text-sm text-slate-500 dark:text-gray-400">
                    Price Per Hour
                  </p>
                  <p className="text-3xl font-extrabold text-[#24352D] dark:text-white">
                    ${studio.pricePerHour}
                    <span className="ml-1 text-sm font-medium text-[#C58B55]">
                      /hr
                    </span>
                  </p>
                </div>

                {/* Capacity */}
                <div className="mb-5 border-b border-[#E8E3D9] pb-5 dark:border-gray-700">
                  <p className="mb-2 text-sm text-slate-500 dark:text-gray-400">
                    Maximum Capacity
                  </p>
                  <p className="text-xl font-bold text-[#24352D] dark:text-white">
                    {studio.capacity} People
                  </p>
                </div>

                {/* Security Deposit */}
                {typeof studio.securityDeposit === "number" && (
                  <div className="mb-5 border-b border-[#E8E3D9] pb-5 dark:border-gray-700">
                    <p className="mb-2 text-sm text-slate-500 dark:text-gray-400">
                      Security Deposit
                    </p>
                    <p className="text-xl font-bold text-[#24352D] dark:text-white">
                      ${studio.securityDeposit}
                    </p>
                  </div>
                )}

                {/* Host Details */}
                <div className="mb-5 rounded-2xl border border-[#E8E3D9] bg-white p-5 dark:border-gray-700 dark:bg-[#1B2922]">
                  <p className="mb-3 text-sm font-medium text-slate-500 dark:text-gray-400">
                    Hosted By
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#24352D] text-sm font-bold text-white dark:bg-[#C58B55] dark:text-[#121B16]">
                      {(studio.creatorName || studio.creatorEmail || "S")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-[#24352D] dark:text-white">
                        {studio.creatorName || "StudioSpace Host"}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-gray-400">
                        {studio.creatorEmail || "host@studiospace.com"}
                      </p>
                    </div>
                  </div>
                </div>

                <BookingButton
                  studioId={studio._id}
                  isAvailable={studio.isAvailable}
                  pricePerHour={studio.pricePerHour}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

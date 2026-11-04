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
import { notFound, redirect } from "next/navigation";
import GetTokenFromServer from "@/lib/GetTokenFromServer";
import BookingButton from "../_component/BookingButton";

interface Studio {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
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

  let token: string | null | undefined;

  try {
    token = await GetTokenFromServer();
  } catch {
    // token না থাকলে বা session expired হলে crash না করে সরাসরি login page-এ পাঠানো হচ্ছে
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (res.status === 401 || res.status === 403) {
    redirect("/login");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const studio: Studio = await res.json();

  // যদি ব্যাকএন্ড থেকে null বা খালি ডাটা আসে, তবে error page-এ না গিয়ে 404 পেজে নিয়ে যাবে
  if (!studio) {
    notFound();
  }



  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}

        <Link
          href="/explore-studios"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E8E3D9] bg-white px-5 py-3 text-sm font-semibold text-[#24352D] shadow-sm transition hover:border-[#C58B55] hover:text-[#C58B55]"
        >
          <ArrowLeft size={17} />
          Back to Studios
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-[#E8E3D9] bg-white shadow-[0_15px_60px_rgba(36,53,45,0.08)]">
          {/* Image Section */}
          <div className="relative h-[300px] overflow-hidden md:h-[520px]">
            {/* biome-ignore lint/performance/noImgElement: remote user-provided studio image URL */}
            <img
              src={studio.image}
              alt={studio.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            {/* Category */}
            <span className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/95 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#24352D] shadow-lg backdrop-blur-md md:left-10 md:top-10">
              {formatCategory(studio.categorySlug)}
            </span>

            {/* Price */}
            <div className="absolute bottom-6 right-6 rounded-2xl border border-white/30 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-md md:bottom-10 md:right-10">
              <p className="mb-1 text-xs font-medium text-slate-500">
                Price Per Hour
              </p>
              <p className="text-2xl font-extrabold text-[#24352D] md:text-3xl">
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

                <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#24352D] md:text-5xl">
                  {studio.name}
                </h1>

                <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                  {studio.description}
                </p>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="group flex items-center gap-4 rounded-2xl border border-[#E8E3D9] bg-[#F5F1E8]/70 p-5 transition hover:border-[#C58B55] hover:bg-[#F5F1E8]">
                  <div className="rounded-xl bg-[#24352D] p-4 transition group-hover:bg-[#C58B55]">
                    <MapPin className="text-white" size={24} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-slate-500">
                      Studio Location
                    </p>
                    <p className="font-bold text-[#24352D]">
                      {studio.location}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-2xl border border-[#E8E3D9] bg-[#F5F1E8]/70 p-5 transition hover:border-[#C58B55] hover:bg-[#F5F1E8]">
                  <div className="rounded-xl bg-[#24352D] p-4 transition group-hover:bg-[#C58B55]">
                    <Users className="text-white" size={24} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-slate-500">
                      Studio Capacity
                    </p>
                    <p className="font-bold text-[#24352D]">
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
                  <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#24352D]">
                    <Camera className="text-[#C58B55]" size={24} />
                    Studio Facilities
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {studio.facilities?.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-3 rounded-xl border border-[#E8E3D9] bg-white p-4 transition hover:border-[#C58B55] hover:shadow-sm"
                    >
                      <div className="rounded-full bg-[#F5F1E8] p-2">
                        <CheckCircle2 size={18} className="text-[#24352D]" />
                      </div>

                      <span className="text-sm font-semibold text-[#24352D]">
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
                      Comfort &amp; Convenience
                    </p>
                    <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#24352D]">
                      <Sparkles className="text-[#C58B55]" size={24} />
                      Studio Amenities
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {studio.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-[#E8E3D9] bg-[#F5F1E8] px-4 py-2 text-sm font-semibold text-[#24352D]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div>
              <div className="sticky top-8 rounded-3xl border border-[#E8E3D9] bg-[#F5F1E8] p-6 md:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C58B55]">
                  Studio Overview
                </p>

                <h2 className="mb-7 text-2xl font-extrabold text-[#24352D]">
                  Studio Information
                </h2>

                {/* Availability */}
                <div className="mb-6 rounded-2xl border border-[#E8E3D9] bg-white p-5">
                  <p className="mb-3 text-sm font-medium text-slate-500">
                    Availability Status
                  </p>

                  {studio.isAvailable ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F1E8] px-4 py-2.5 text-sm font-bold text-[#24352D]">
                      <CheckCircle2 size={18} />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600">
                      <XCircle size={18} />
                      Not Available
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-5 border-b border-[#E8E3D9] pb-5">
                  <p className="mb-2 text-sm text-slate-500">Price Per Hour</p>
                  <p className="text-3xl font-extrabold text-[#24352D]">
                    ${studio.pricePerHour}
                    <span className="ml-1 text-sm font-medium text-[#C58B55]">
                      /hr
                    </span>
                  </p>
                </div>

                {/* Capacity */}
                <div className="mb-5 border-b border-[#E8E3D9] pb-5">
                  <p className="mb-2 text-sm text-slate-500">
                    Maximum Capacity
                  </p>
                  <p className="text-xl font-bold text-[#24352D]">
                    {studio.capacity} People
                  </p>
                </div>

                {/* Security Deposit */}
                {typeof studio.securityDeposit === "number" && (
                  <div className="mb-5 border-b border-[#E8E3D9] pb-5">
                    <p className="mb-2 text-sm text-slate-500">
                      Security Deposit
                    </p>
                    <p className="text-xl font-bold text-[#24352D]">
                      ${studio.securityDeposit}
                    </p>
                  </div>
                )}

                {/* Host Details */}
                <div className="mb-5 rounded-2xl border border-[#E8E3D9] bg-white p-5">
                  <p className="mb-3 text-sm font-medium text-slate-500">
                    Hosted By
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#24352D] text-sm font-bold text-white">
                      {(studio.creatorName || studio.creatorEmail || "S")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-[#24352D]">
                        {studio.creatorName || "StudioSpace Host"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {studio.creatorEmail || "host@studiospace.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Studio ID */}
                <div className="mb-2">
                  <p className="mb-2 text-sm text-slate-500">Studio ID</p>
                  <p className="break-all rounded-xl border border-[#E8E3D9] bg-white p-3 text-xs font-medium text-slate-500">
                    {studio._id}
                  </p>
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

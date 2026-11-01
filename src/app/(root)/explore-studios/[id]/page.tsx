
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Camera,
} from "lucide-react";

interface Studio {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  facilities: string[];
  isAvailable: boolean;
}

const formatCategory = (value: string) =>
  value.split("-").join(" ");

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
    }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const studio: Studio = await res.json();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/explore-studios"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

          {/* Studio Image */}
          <div className="relative h-72 md:h-[450px]">
            <img
              src={studio.image}
              alt={studio.name}
              className="h-full w-full object-cover"
            />

            <span className="absolute left-6 top-6 rounded-full bg-white px-5 py-2 text-sm font-bold uppercase text-emerald-700 shadow">
              {formatCategory(studio.categorySlug)}
            </span>

            <div className="absolute bottom-6 right-6 rounded-2xl bg-white px-6 py-4 shadow-lg">
              <p className="text-sm text-slate-500">
                Price Per Hour
              </p>
              <p className="text-3xl font-extrabold text-emerald-700">
                ৳{studio.pricePerHour}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-3 md:p-10">

            {/* Left Side */}
            <div className="space-y-8 md:col-span-2">

              {/* Name & Description */}
              <div>
                <h1 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                  {studio.name}
                </h1>

                <p className="text-base leading-8 text-slate-600">
                  {studio.description}
                </p>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">
                  <div className="rounded-xl bg-emerald-100 p-3">
                    <MapPin className="text-emerald-700" size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Location
                    </p>
                    <p className="font-bold text-slate-800">
                      {studio.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">
                  <div className="rounded-xl bg-emerald-100 p-3">
                    <Users className="text-emerald-700" size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Capacity
                    </p>
                    <p className="font-bold text-slate-800">
                      {studio.capacity} People
                    </p>
                  </div>
                </div>

              </div>

              {/* Facilities */}
              <div>
                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-slate-900">
                  <Camera className="text-emerald-600" />
                  Studio Facilities
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {studio.facilities?.map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4"
                    >
                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-emerald-600"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div>
              <div className="sticky top-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">

                <h2 className="mb-6 text-xl font-bold text-slate-900">
                  Studio Information
                </h2>

                {/* Availability */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium text-slate-500">
                    Availability Status
                  </p>

                  {studio.isAvailable ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                      <CheckCircle2 size={18} />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600">
                      <XCircle size={18} />
                      Not Available
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="border-t border-slate-200 py-5">
                  <p className="mb-2 text-sm text-slate-500">
                    Price Per Hour
                  </p>
                  <p className="text-3xl font-extrabold text-emerald-700">
                    ৳{studio.pricePerHour}
                  </p>
                </div>

                {/* Capacity */}
                <div className="border-t border-slate-200 py-5">
                  <p className="mb-2 text-sm text-slate-500">
                    Maximum Capacity
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {studio.capacity} People
                  </p>
                </div>

                {/* Studio ID */}
                <div className="border-t border-slate-200 pt-5">
                  <p className="mb-2 text-sm text-slate-500">
                    Studio ID
                  </p>
                  <p className="break-all text-sm font-medium text-slate-700">
                    {studio._id}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

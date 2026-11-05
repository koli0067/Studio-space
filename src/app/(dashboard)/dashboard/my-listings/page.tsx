
"use client";

import {
  CheckCircle2,
  Clock,
  FolderOpen,
  LogIn,
  MapPin,
  Pencil,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import { useSession } from "@/lib/auth-client";
import GetTokenFromClient from "@/lib/GetTokenFromClient";
import DeleteStudioButton from "../_components/DeleteStudioButton";

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
  creatorEmail: string;
}

const MyListingss = () => {
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setStudios([]);
      setLoading(false);
      return;
    }

    const fetchMyStudios = async () => {
      try {
        setLoading(true);
        setError("");

        const token = await GetTokenFromClient();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-studios/${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token && { authorization: `Bearer ${token}` }),
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your studios");
        }

        const data = await response.json();

        setStudios(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("My Listings Error:", err);
        setError("Could not load your listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, [user?.email, isPending]);

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8] dark:bg-[#121B16]">
        <p className="animate-pulse text-xl font-semibold text-[#24352D] dark:text-white">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F5F1E8] dark:bg-[#121B16]">
        <EmptyState
          icon={LogIn}
          title="Please Login First"
          description="Login to see the studios you have listed on StudioSpace."
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
          >
            Go to Login
          </Link>
        </EmptyState>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] py-20 text-center text-red-500 dark:bg-[#121B16]">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5F1E8] px-4 py-10 dark:bg-[#121B16] md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Dashboard
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#24352D] dark:text-white md:text-4xl">
            My Listings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-gray-400">
            Manage the studios you have listed.
          </p>

          <p className="mt-1 text-sm text-slate-400 dark:text-gray-500">
            {user.email}
          </p>
        </div>

        {/* Studio Cards */}
        {studios.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No Listings Found"
            description="You haven't added any studios yet. List your first studio and start receiving bookings."
          >
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
            >
              Add Your First Studio
            </Link>
          </EmptyState>
        ) : (
          <>
            <div className="mb-6">
              <p className="font-medium text-slate-600 dark:text-gray-300">
                Total Listings:{" "}
                <span className="font-bold text-[#C58B55]">
                  {studios.length}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <div
                  key={studio._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#E8E3D9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#1B2922]"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-slate-100 dark:bg-gray-800">
                    <img
                      src={studio.image}
                      alt={studio.name}
                      className="h-full w-full object-cover"
                    />

                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        studio.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {studio.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Studio Information */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#C58B55]">
                      {studio.categorySlug?.replaceAll("-", " ")}
                    </p>

                    <h2 className="mb-2 text-xl font-bold text-[#24352D] dark:text-white">
                      {studio.name}
                    </h2>

                    <p className="mb-4 line-clamp-2 text-sm text-slate-500 dark:text-gray-400">
                      {studio.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 border-t border-[#E8E3D9] pt-4 text-sm text-slate-600 dark:border-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#C58B55]" />
                        <span>{studio.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#C58B55]" />
                        <span>Capacity: {studio.capacity} people</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#C58B55]" />
                        <span>${studio.pricePerHour} / hour</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {studio.isAvailable ? (
                          <CheckCircle2 className="h-4 w-4 text-[#C58B55]" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}

                        <span>
                          {studio.isAvailable
                            ? "Ready for booking"
                            : "Not accepting bookings"}
                        </span>
                      </div>
                    </div>

                    {/* Facilities */}
                    {studio.facilities?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {studio.facilities.slice(0, 3).map((facility) => (
                          <span
                            key={facility}
                            className="rounded-full bg-[#F5F1E8] px-3 py-1 text-xs text-[#24352D] dark:bg-[#24352D] dark:text-gray-200"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Update & Delete Buttons */}
                    <div className="mt-auto pt-5">
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={`/studios/edit/${studio._id}`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-[#24352D] px-5 py-2.5 text-sm font-semibold text-[#24352D] transition hover:bg-[#24352D] hover:text-white dark:border-gray-500 dark:text-gray-200 dark:hover:bg-[#24352D] dark:hover:text-white"
                        >
                          <Pencil size={16} />
                          Update
                        </Link>

                        <DeleteStudioButton
                          data={studio}
                          onDelete={(id) =>
                            setStudios((prev) =>
                              prev.filter((s) => s._id !== id),
                            )
                          }
                        />
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={`/studios/${studio._id}`}
                        className="mt-3 block w-full rounded-lg bg-[#24352D] py-3 text-center font-semibold text-white transition hover:bg-[#344A3F]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyListingss;

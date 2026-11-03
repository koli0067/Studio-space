
"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteStudioButton from "../_components/DeleteStudioButton";
import EditStudioButton from "../_components/EditStudioButton";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

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
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch your studios");
      }

      const data = await response.json();

      setStudios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("My Listings Error:", error);
      setError("Could not load your listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    fetchMyStudios();
  }, [user?.email, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Please login to see your listings.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            My Listings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage the studios you have listed.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {user.email}
          </p>
        </div>

        {/* Studio Cards */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No Listings Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't added any studios yet.
            </p>

            <Link
              href="/dashboard/add-studio"
              className="mt-6 inline-block rounded-lg bg-[#1F2924] px-6 py-3 font-semibold text-white transition hover:bg-[#2C3832]"
            >
              Add Your First Studio
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="font-medium text-gray-600">
                Total Listings:{" "}
                <span className="font-bold text-green-600">
                  {studios.length}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <div
                  key={studio._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gray-100">
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
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-600">
                      {studio.categorySlug?.replaceAll("-", " ")}
                    </p>

                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      {studio.name}
                    </h2>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                      {studio.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>{studio.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span>
                          Capacity: {studio.capacity} people
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>
                          ৳{studio.pricePerHour} / hour
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {studio.isAvailable ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
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
                        {studio.facilities.slice(0, 3).map((facility, index) => (
                          <span
                            key={`${facility}-${index}`}
                            className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Edit & Delete Buttons */}

                  <div className="mt-3 grid grid-cols-2 gap-3">
                   
                    <EditStudioButton data={studio}></EditStudioButton>
                   
                    <DeleteStudioButton
                      data={studio}
                      onDelete={(id) =>
                        setStudios((prev) => prev.filter((s) => s._id !== id))
                      }
                    ></DeleteStudioButton>

                  </div>

                    {/* View Details Button */}
                    <Link
                      href={`/explore-studios/${studio._id}`}
                      className="mt-5 block w-full rounded-lg bg-[#1F2924] py-3 text-center font-semibold text-white transition hover:bg-[#2C3832]"
                    >
                      View Details
                    </Link>

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

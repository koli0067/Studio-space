
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import {
  MapPin,
  Clock,
  Users,
  CalendarDays,
  CheckCircle2,
  Building2,
} from "lucide-react";

interface Booking {
  _id: string;
  studioId: string;
  userEmail: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  facilities: string[];
  bookedAt: string;
  status: string;
}

const MyBookingsPage = () => {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchMyBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/booking/${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("My Bookings Error:", error);
        setError("Could not load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
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
          Please login to see your bookings.
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
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage the studios you have booked.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {user.email}
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <Building2 className="mx-auto mb-4 h-14 w-14 text-gray-300" />

            <h2 className="text-xl font-semibold text-gray-800">
              No Bookings Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't booked any studios yet.
            </p>

            <Link
              href="/explore-studios"
              className="mt-6 inline-block rounded-lg bg-[#1F2924] px-6 py-3 font-semibold text-white transition hover:bg-[#2C3832]"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <>
            {/* Total Bookings */}
            <div className="mb-6">
              <p className="font-medium text-gray-600">
                Total Bookings:{" "}
                <span className="font-bold text-green-600">
                  {bookings.length}
                </span>
              </p>
            </div>

            {/* Booking Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gray-100">
                    <img
                      src={booking.image}
                      alt={booking.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 size={14} />
                      {booking.status}
                    </span>
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-600">
                      {booking.categorySlug?.replaceAll("-", " ")}
                    </p>

                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      {booking.name}
                    </h2>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                      {booking.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>{booking.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span>
                          Capacity: {booking.capacity} people
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>
                          ৳{booking.pricePerHour} / hour
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-green-600" />
                        <span>
                          Booked:{" "}
                          {new Date(booking.bookedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Facilities */}
                    {booking.facilities?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {booking.facilities.slice(0, 3).map(
                          (facility, index) => (
                            <span
                              key={`${facility}-${index}`}
                              className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
                            >
                              {facility}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* View Studio */}
                    <Link
                      href={`/explore-studios/${booking.studioId}`}
                      className="mt-5 block w-full rounded-lg bg-[#1F2924] py-3 text-center font-semibold text-white transition hover:bg-[#2C3832]"
                    >
                      View Studio
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

export default MyBookingsPage;

"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Loader2,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

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
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  bookedAt: string;
}

const MyBookingsPage = () => {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );

  const userEmail = session?.user?.email;

  // ঘণ্টা ও মিনিট ফরম্যাট করার হেলপার ফাংশন
  const formatDuration = (start: string, end: string) => {
    if (!start || !end) return "—";

    const startMinutes =
      Number(start.split(":")[0]) * 60 + Number(start.split(":")[1]);
    const endMinutes =
      Number(end.split(":")[0]) * 60 + Number(end.split(":")[1]);

    const totalMinutes = endMinutes - startMinutes;
    if (totalMinutes <= 0) return "—";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes > 0) {
      return `${hours} hrs ${minutes} mins`;
    }
    return `${hours} hrs`;
  };

  // Fetch bookings
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const token = await GetTokenFromClient();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/booking/${encodeURIComponent(
            userEmail,
          )}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token && { authorization: `Bearer ${token}` }),
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load your bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, isPending]);

  // Cancel booking
  const handleCancelBooking = async () => {
    const token = await GetTokenFromClient();
    if (!userEmail || !selectedBookingId || cancellingId) return;

    const bookingId = selectedBookingId;

    try {
      setCancellingId(bookingId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/booking/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userEmail,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Could not cancel booking!");
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking,
        ),
      );

      setSelectedBookingId(null);

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setCancellingId(null);
    }
  };

  // const getStatusStyle = (status: Booking["status"]) => {
  //   switch (status) {
  //     case "Pending":
  //       return "bg-amber-100 text-amber-700";
  //     case "Confirmed":
  //       return "bg-green-100 text-green-700";
  //     case "Completed":
  //       return "bg-blue-100 text-blue-700";
  //     case "Cancelled":
  //       return "bg-red-100 text-red-700";
  //     default:
  //       return "bg-gray-100 text-gray-700";
  //   }
  // };


  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-56" />

          <Skeleton className="h-24 w-full rounded-xl" />

          {[1, 2].map((item) => (
            <div
              key={item}
              className="grid grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-[#E8E3D9] bg-white p-5 md:grid-cols-[260px_1fr]"
            >
              <Skeleton className="h-52 w-full rounded-xl md:h-[220px]" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
                <Skeleton className="h-10 w-48 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#24352D]">
            Please Login First
          </h2>
          <p className="mt-2 text-slate-500">
            Login to see your studio bookings.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#8C6D4F]">
            Your Reservations
          </p>
          <h1 className="text-3xl font-bold text-[#24352D] md:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your studio reservations and booking details.
          </p>
        </div>

        {/* Booking Count */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="mt-1 text-3xl font-bold text-[#24352D]">
            {bookings.length}
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No Bookings Yet"
            description="You have not booked any studio yet. Explore our creative spaces and book your first session."
          >
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
            >
              Explore Studios
              <ArrowUpRight size={18} />
            </Link>
          </EmptyState>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
                  {/* Studio Image */}
                  <div className="relative min-h-[220px] bg-slate-100">
                    {booking.image ? (
                      <Image
                        src={booking.image}
                        alt={booking.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 260px"
                      />
                    ) : (
                      <div className="flex h-full min-h-[220px] items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Booking Information */}
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D4F]">
                          {booking.categorySlug?.replaceAll("-", " ")}
                        </p>
                        <h2 className="mt-1 text-xl font-bold text-[#24352D]">
                          {booking.name}
                        </h2>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {booking.description}
                    </p>

                    {/* Location & Capacity */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{booking.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{booking.capacity} People</span>
                      </div>
                    </div>

                    {/* Booking Date & Time */}
                    <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl bg-[#F5F7F5] p-4 sm:grid-cols-3">
                      <div>
                        <p className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={15} />
                          Booking Date
                        </p>
                        <p className="mt-1 font-semibold text-[#24352D]">
                          {booking.bookingDate}
                        </p>
                      </div>

                      <div>
                        <p className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={15} />
                          Start Time
                        </p>
                        <p className="mt-1 font-semibold text-[#24352D]">
                          {booking.startTime}
                        </p>
                      </div>

                      <div>
                        <p className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={15} />
                          End Time
                        </p>
                        <p className="mt-1 font-semibold text-[#24352D]">
                          {booking.endTime}
                        </p>
                      </div>
                    </div>

                    {/* Price Details */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <p className="text-slate-500">
                          Duration:{" "}
                          <span className="font-semibold text-[#24352D]">
                            {formatDuration(booking.startTime, booking.endTime)}
                          </span>
                        </p>

                        <p className="text-slate-500">
                          Per Hour:{" "}
                          <span className="font-semibold text-[#24352D]">
                            ${booking.pricePerHour}
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-500">Total Price</p>
                        <p className="text-xl font-bold text-[#24352D]">
                          ${booking.totalPrice?.toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>

                    {/* Facilities */}
                    {booking.facilities?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {booking.facilities.map((facility) => (
                          <span
                            key={facility}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                      <Link
                        href={`/explore-studios/${booking.studioId}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#24352D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#344A3F]"
                      >
                        View Studio
                        <ArrowUpRight size={16} />
                      </Link>

                     {booking.status?.toLowerCase() === "pending" && (
                          <button
                            type="button"
                            onClick={() => setSelectedBookingId(booking._id)}
                            disabled={cancellingId === booking._id}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {cancellingId === booking._id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <XCircle size={16} />
                            )}
                            Cancel Booking
                          </button>
                        )}
                       </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Cancel Confirmation Modal */}
      {selectedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={28} className="text-red-500" />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-[#24352D]">
              Cancel Your Booking?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to cancel this studio reservation? This
              action will update your booking status to Cancelled.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedBookingId(null)}
                disabled={!!cancellingId}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={!!cancellingId}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {cancellingId ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;

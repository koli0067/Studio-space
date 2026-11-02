"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { CalendarDays, Clock, Loader2, X } from "lucide-react";

interface BookingButtonProps {
  studioId: string;
  isAvailable: boolean;
  pricePerHour: number;
}

export default function BookingButton({
  studioId,
  isAvailable,
  pricePerHour,
}: BookingButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const startMinutes = startTime
    ? Number(startTime.split(":")[0]) * 60 +
      Number(startTime.split(":")[1])
    : 0;

  const endMinutes = endTime
    ? Number(endTime.split(":")[0]) * 60 +
      Number(endTime.split(":")[1])
    : 0;

  const totalMinutes = endMinutes - startMinutes;
  const totalHours = totalMinutes > 0 ? totalMinutes / 60 : 0;
  const totalPrice = totalHours * pricePerHour;

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login first!");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please select date and time!");
      return;
    }

    if (totalMinutes <= 0) {
      toast.error("End time must be after start time!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId,
            userEmail: session.user.email,
            bookingDate,
            startTime,
            endTime,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Booking failed!");
        return;
      }

      toast.success("Booking request submitted successfully!");
      setIsOpen(false);
      router.push("/dashboard/my-bookings");
      router.refresh();
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-6 py-4 font-bold text-gray-500"
      >
        <Loader2 size={18} className="animate-spin" />
        Please wait...
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!session?.user?.email) {
            toast.error("Please login first!");
            return;
          }

          if (!isAvailable) {
            toast.error("Studio is currently unavailable!");
            return;
          }

          setIsOpen(true);
        }}
        disabled={!isAvailable}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold shadow-md transition ${
          isAvailable
            ? "bg-[#24352D] text-white hover:bg-[#344A3F]"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
        }`}
      >
        {isAvailable ? "Book This Studio" : "Currently Unavailable"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1F2924]">
                  Book Your Studio
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select your preferred date and time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Booking Date
                </label>
                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    value={bookingDate}
                    min={minDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-[#24352D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-[#24352D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="time"
                      value={endTime}
                      min={startTime || undefined}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-[#24352D]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#F5F7F5] p-5">
                <h3 className="mb-3 font-bold text-[#1F2924]">
                  Booking Summary
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Hourly Price</span>
                    <span>৳{pricePerHour}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Total Hours</span>
                    <span>
                      {totalHours > 0 ? `${totalHours} hours` : "—"}
                    </span>
                  </div>

                  <div className="my-2 border-t border-slate-200" />

                  <div className="flex justify-between text-base font-bold text-[#1F2924]">
                    <span>Total Price</span>
                    <span>৳{totalPrice.toLocaleString("en-BD")}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || totalMinutes <= 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#24352D] py-3.5 font-bold text-white transition hover:bg-[#344A3F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Your booking will be submitted with Pending status.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
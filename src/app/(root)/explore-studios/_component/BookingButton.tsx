
"use client";

import { CalendarDays, Clock, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

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
    ? Number(startTime.split(":")[0]) * 60 + Number(startTime.split(":")[1])
    : 0;

  const endMinutes = endTime
    ? Number(endTime.split(":")[0]) * 60 + Number(endTime.split(":")[1])
    : 0;

  const totalMinutes = endMinutes - startMinutes;
  const totalHours = totalMinutes > 0 ? totalMinutes / 60 : 0;
  const totalPrice = totalHours * pricePerHour;

  // ঘণ্টা ও মিনিট আলাদা করে ফরম্যাট করার লজিক
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedDuration =
    totalMinutes > 0
      ? minutes > 0
        ? `${hours} hrs ${minutes} mins`
        : `${hours} hrs`
      : "—";

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    const token = await GetTokenFromClient();

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
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studioId,
            userEmail: session.user.email,
            bookingDate,
            startTime,
            endTime,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Booking failed!");
        return;
      }

      toast.success("Booking request submitted successfully!");
      setIsOpen(false);
      router.push("/my-bookings");
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
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-6 py-4 font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-300"
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
            router.push("/login");
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
            : "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
        }`}
      >
        {isAvailable ? "Book Workspace Now" : "Currently Unavailable"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-gray-700 dark:bg-[#1B2922]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#24352D] dark:text-white">
                  Book Your Studio
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  Select your preferred date and time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-[#24352D]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
                >
                  Booking Date
                </label>
                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                  />
                  <input
                    id="booking-date"
                    type="date"
                    value={bookingDate}
                    min={minDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-slate-800 outline-none focus:border-[#24352D] dark:border-gray-600 dark:bg-[#24352D] dark:text-white dark:[color-scheme:dark] dark:focus:border-[#C58B55]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-start-time"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
                  >
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="booking-start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-slate-800 outline-none focus:border-[#24352D] dark:border-gray-600 dark:bg-[#24352D] dark:text-white dark:[color-scheme:dark] dark:focus:border-[#C58B55]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-end-time"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
                  >
                    End Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
                    />
                    <input
                      id="booking-end-time"
                      type="time"
                      value={endTime}
                      min={startTime || undefined}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-slate-800 outline-none focus:border-[#24352D] dark:border-gray-600 dark:bg-[#24352D] dark:text-white dark:[color-scheme:dark] dark:focus:border-[#C58B55]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#F5F7F5] p-5 dark:bg-[#24352D]">
                <h3 className="mb-3 font-bold text-[#24352D] dark:text-white">
                  Booking Summary
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-gray-300">
                    <span>Hourly Price</span>
                    <span>${pricePerHour}</span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-gray-300">
                    <span>Total Hours</span>
                    <span>{formattedDuration}</span>
                  </div>

                  <div className="my-2 border-t border-slate-200 dark:border-gray-600" />

                  <div className="flex justify-between text-base font-bold text-[#24352D] dark:text-white">
                    <span>Total Price</span>
                    <span>${totalPrice.toLocaleString("en-US")}</span>
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

              <p className="text-center text-xs text-slate-500 dark:text-gray-400">
                Your booking will be submitted with Pending status.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

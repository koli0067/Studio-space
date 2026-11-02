
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

interface BookingButtonProps {
  studioId: string;
  isAvailable: boolean;
}

export default function BookingButton({
  studioId,
  isAvailable,
}: BookingButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (isPending || loading) return;

    if (!session?.user?.email) {
      toast.error("Please login first!");
      return;
    }

    if (!isAvailable) {
      toast.error("Studio is unavailable!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId,
            userEmail: session.user.email,
          }),
        }
      );

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(
          responseData.message || "Booking failed!"
        );
        return;
      }

      toast.success("Studio booked successfully!");

      // Go to My Bookings page
      router.push("/dashboard/my-bookings");

    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!isAvailable || loading || isPending}
      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold shadow-md transition ${
        isAvailable
          ? "bg-[#24352D] text-white hover:bg-[#344A3F] disabled:opacity-60"
          : "cursor-not-allowed bg-gray-300 text-gray-500"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Booking...
        </>
      ) : (
        <>
          {isAvailable
            ? "Book This Studio"
            : "Currently Unavailable"}
          {isAvailable && (
            <ArrowLeft className="rotate-180" size={18} />
          )}
        </>
      )}
    </button>
  );
}

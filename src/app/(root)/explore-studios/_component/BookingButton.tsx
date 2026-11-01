"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

interface BookingButtonProps {
  studioId: string;
  isAvailable: boolean;
}

export default function BookingButton({
  studioId,
  isAvailable,
}: BookingButtonProps) {
  
  const handleClick = () => {
    if (isAvailable) {
      toast.success("Redirecting to booking page!");
    }
  };

  return (
    <Link
      href={isAvailable ? `/booking/${studioId}` : "#"}
      onClick={handleClick}
      aria-disabled={!isAvailable}
      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold shadow-md transition ${
        isAvailable
          ? "bg-[#24352D] text-white hover:bg-[#344A3F]"
          : "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-500"
      }`}
    >
      {isAvailable ? "Book This Studio" : "Currently Unavailable"}
      {isAvailable && <ArrowLeft className="rotate-180" size={18} />}
    </Link>
  );
}
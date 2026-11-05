
"use client";

import { Camera, RotateCcw } from "lucide-react";

const GlobalError = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8] px-4 dark:bg-[#121B16]">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm dark:bg-[#1B2922]">
          <Camera size={30} className="text-[#C58B55]" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#24352D] dark:text-white md:text-3xl">
          Something went wrong!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-gray-400">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GlobalError;

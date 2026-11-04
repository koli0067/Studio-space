import { Camera, Home } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8] px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Creative Studio Illustration */}
        <svg
          viewBox="0 0 420 260"
          className="mx-auto mb-8 w-full max-w-md"
          role="img"
          aria-label="Empty studio illustration"
        >
          {/* Backdrop glow */}
          <circle cx="210" cy="130" r="110" fill="#EFE8DA" />

          {/* Studio wall panels */}
          <rect x="70" y="60" width="280" height="150" rx="12" fill="#24352D" />
          <rect x="82" y="72" width="256" height="126" rx="8" fill="#F5F1E8" />

          {/* Spotlight beam */}
          <polygon
            points="210,66 150,198 270,198"
            fill="#C58B55"
            opacity="0.35"
          />
          <circle cx="210" cy="70" r="12" fill="#C58B55" />
          <rect x="204" y="40" width="12" height="18" rx="4" fill="#24352D" />

          {/* Camera body */}
          <rect x="176" y="140" width="68" height="46" rx="10" fill="#24352D" />
          <rect x="192" y="128" width="24" height="16" rx="4" fill="#24352D" />
          <circle cx="210" cy="163" r="15" fill="#F5F1E8" />
          <circle cx="210" cy="163" r="8" fill="#C58B55" />
          <circle cx="230" cy="150" r="3" fill="#C58B55" />

          {/* Tripod */}
          <line
            x1="196"
            y1="186"
            x2="182"
            y2="226"
            stroke="#24352D"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="224"
            y1="186"
            x2="238"
            y2="226"
            stroke="#24352D"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="210"
            y1="186"
            x2="210"
            y2="226"
            stroke="#24352D"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Floating sparkles */}
          <circle cx="120" cy="100" r="5" fill="#C58B55" />
          <circle cx="300" cy="92" r="4" fill="#C58B55" opacity="0.7" />
          <circle cx="288" cy="176" r="6" fill="#C58B55" opacity="0.5" />
        </svg>

        {/* 404 */}
        <p className="text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#24352D] md:text-5xl">
          This Set Doesn&apos;t Exist
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          Looks like the page you are searching for is not on our studio floor.
          It may have been moved, deleted, or never existed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#24352D] px-7 py-4 text-base font-bold text-white transition hover:bg-[#344A3F] sm:w-auto"
          >
            <Home size={19} />
            Return to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#24352D] px-7 py-4 text-base font-bold text-[#24352D] transition hover:bg-[#24352D] hover:text-white sm:w-auto"
          >
            <Camera size={19} />
            Explore Studios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

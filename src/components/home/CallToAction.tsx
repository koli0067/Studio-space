
import Link from "next/link";
import { ArrowRight, Camera, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-white py-20  lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[30px] bg-[#24352D] px-6 py-16 text-center sm:px-12 lg:py-20">

          {/* Decorative Background */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
              <Sparkles size={17} className="text-[#C58B55]" />
              <span className="text-sm font-semibold text-white">
                Your Next Creative Journey Starts Here
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Bring Your
              <span className="block text-[#C58B55]">
                Creative Vision to Life?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Find the perfect photography studio for your next project.
              Explore creative spaces and make your next shoot unforgettable.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link
                href="/explore"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C58B55] px-7 py-4 text-base font-bold text-white transition duration-300 hover:bg-white hover:text-[#24352D] sm:w-auto"
              >
                Explore Studios
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/add-studio"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-4 text-base font-bold text-white transition duration-300 hover:bg-white hover:text-[#24352D] sm:w-auto"
              >
                <Camera size={19} />
                List Your Studio
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

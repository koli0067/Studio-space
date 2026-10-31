
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Camera,
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location);
    }

    if (category) {
      params.set("category", category);
    }

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F1E8]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">

        {/* Left Content */}
        <div className="relative z-10">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C58B55]/30 bg-white px-4 py-2">
            <Sparkles size={17} className="text-[#C58B55]" />
            <span className="text-sm font-semibold text-[#24352D]">
              Your Creative Space Awaits
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-[#24352D] sm:text-5xl lg:text-6xl">
            Find Your Perfect
            <span className="mt-2 block text-[#C58B55]">
              Photography Studio
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-8 text-[#66736A] sm:text-lg">
            Discover and book professional photography studios for your
            creative projects. From portrait sessions to product shoots,
            find the perfect space to bring your vision to life.
          </p>

          {/* Search Box */}
          <div className="mt-9 rounded-2xl bg-white p-4 shadow-xl shadow-[#24352D]/10 sm:p-5">

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Location */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#24352D]">
                  <MapPin size={17} className="text-[#C58B55]" />
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full rounded-lg border border-gray-200 bg-[#FAF9F6] px-4 py-3 text-sm text-[#24352D] outline-none transition focus:border-[#C58B55]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#24352D]">
                  <Camera size={17} className="text-[#C58B55]" />
                  Photography Type
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-[#FAF9F6] px-4 py-3 text-sm text-[#24352D] outline-none transition focus:border-[#C58B55]"
                >
                  <option value="">All Categories</option>
                  <option value="Portrait Photography">
                    Portrait Photography
                  </option>
                  <option value="Product Photography">
                    Product Photography
                  </option>
                  <option value="Fashion Photography">
                    Fashion Photography
                  </option>
                  <option value="Wedding Photography">
                    Wedding Photography
                  </option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#24352D] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:bg-[#C58B55]"
            >
              <Search size={19} />
              Explore Studios
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Points */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#66736A]">
              <CheckCircle2 size={17} className="text-[#C58B55]" />
              Professional Spaces
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-[#66736A]">
              <CheckCircle2 size={17} className="text-[#C58B55]" />
              Easy Online Booking
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl">

          <div className="relative overflow-hidden rounded-[30px] shadow-2xl">
            <Image
              src="/hero-studio.jpg"
              alt="Professional photography studio with camera and lighting equipment"
              width={800}
              height={900}
              priority
              className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[570px]"
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -left-4 top-10 rounded-2xl bg-white p-4 shadow-xl sm:-left-8 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F1E8]">
                <Camera size={23} className="text-[#C58B55]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#24352D]">
                  Creative Spaces
                </h3>
                <p className="text-xs text-[#66736A]">
                  Designed for your vision
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-5 right-3 rounded-2xl bg-white p-4 shadow-xl sm:right-[-20px] sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F1E8]">
                <CheckCircle2 size={23} className="text-[#C58B55]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#24352D]">
                  Easy Booking
                </h3>
                <p className="text-xs text-[#66736A]">
                  Book your space with ease
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

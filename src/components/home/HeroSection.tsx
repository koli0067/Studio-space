"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/hero-studio.jpg",
    headline: "Find Your Perfect Photography Studio",
    subtext:
      "Discover and book professional photography studios for your creative projects.",
    cta1: { label: "Explore Studios", href: "/studios" },
    cta2: { label: "Host Your Space", href: "/dashboard/add-studio" },
  },
  {
    image: "/hero-studio2.avif",
    headline: "Create. Shoot. Inspire.",
    subtext:
      "From portrait sessions to product shoots, find the perfect space to bring your vision to life.",
    cta1: { label: "Explore Studios", href: "/studios" },
    cta2: { label: "Host Your Space", href: "/dashboard/add-studio" },
  },
  {
    image: "/hero-studio3.avif",
    headline: "Your Creative Space Awaits",
    subtext:
      "Easy online booking, professional spaces, and a community of creators.",
    cta1: { label: "Explore Studios", href: "/studios" },
    cta2: { label: "Host Your Space", href: "/dashboard/add-studio" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative overflow-hidden bg-[#F5F1E8]">
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="relative h-[420px] overflow-hidden rounded-[30px] shadow-2xl sm:h-[500px] lg:h-[560px]">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={idx === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 sm:px-12">
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-5xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">
                  {slide.subtext}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={slide.cta1.href}
                    className="rounded-xl bg-[#C58B55] px-6 py-3 font-semibold text-white transition hover:bg-[#b07a47]"
                  >
                    {slide.cta1.label}
                  </Link>
                  <Link
                    href={slide.cta2.href}
                    className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    {slide.cta2.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Prev/Next */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur hover:bg-white/50"
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur hover:bg-white/50"
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  idx === current ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface Studio {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  rating?: number;
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.studios ?? [];
        setStudios(list.slice(0, 6));
      } catch (e) {
        console.error(e);
        setStudios([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudios();
  }, []);

  return (
    <section className="bg-[#F5F1E8] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Featured Studios
          </p>
          <h2 className="text-3xl font-bold text-[#24352D] sm:text-4xl">
            Top Spaces for Your Next Shoot
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="h-10 w-10" />
          </div>
        ) : studios.length === 0 ? (
          <p className="text-center text-gray-500">No studios available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={studio.image || "/hero-studio.jpg"}
                    alt={studio.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#24352D]">
                    {studio.categorySlug?.replaceAll("-", " ")}
                  </span>
                  {studio.rating ? (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#24352D] px-2 py-1 text-xs font-bold text-white">
                      <Star size={12} className="fill-[#C58B55] text-[#C58B55]" />
                      {studio.rating}
                    </span>
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#24352D]">
                    {studio.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{studio.location}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-[#C58B55]">
                      ${studio.pricePerHour} / hr
                    </span>
                    <Link
                      href={`/explore-studios/${studio._id}`}
                      className="rounded-lg bg-[#24352D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#354D40]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
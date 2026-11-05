
"use client";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

interface Studio {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  facilities: string[];
  isAvailable: boolean;
  rating?: number;
}

interface Props {
  studios: Studio[];
}

const ExploreStudiosClient = ({ studios }: Props) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  const categories = useMemo(
    () => [...new Set(studios.map((studio) => studio.categorySlug))],
    [studios],
  );

  const filteredStudios = useMemo(() => {
    let result = studios.filter((studio) => {
      const matchesSearch =
        studio.name.toLowerCase().includes(search.toLowerCase()) ||
        studio.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || studio.categorySlug === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.pricePerHour - b.pricePerHour);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    return result;
  }, [studios, search, category, sort]);

  const formatCategory = (value: string) => value.split("-").join(" ");

  return (
    <section className="min-h-screen bg-[#F5F1E8] px-5 py-12 dark:bg-[#121B16] md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Find Your Creative Space
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#24352D] dark:text-white md:text-5xl">
            Explore Studios
          </h1>

          <p className="mt-3 text-lg text-slate-500 dark:text-gray-400">
            Discover {studios.length} creative studios available for booking
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1B2922] lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by studio name or location..."
              className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-[#24352D] outline-none transition placeholder:text-slate-400 focus:border-[#24352D] focus:ring-2 focus:ring-[#24352D]/10 dark:border-gray-700 dark:bg-[#24352D] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#C58B55]"
            />
          </div>

          {/* Category Filter */}
          <div className="relative lg:w-64">
            <SlidersHorizontal
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-[#24352D] outline-none focus:border-[#24352D] dark:border-gray-700 dark:bg-[#24352D] dark:text-white dark:focus:border-[#C58B55]"
            >
              <option value="all">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {formatCategory(item)}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <button
            type="button"
            onClick={() => setSort(sort === "low" ? "default" : "low")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 transition ${
              sort === "low"
                ? "border-[#24352D] bg-[#24352D]/5 text-[#24352D] dark:border-[#C58B55] dark:bg-[#C58B55]/15 dark:text-[#C58B55]"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#24352D]"
            }`}
          >
            <ArrowUp size={18} />
            Price Low
          </button>

          <button
            type="button"
            onClick={() => setSort(sort === "high" ? "default" : "high")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 transition ${
              sort === "high"
                ? "border-[#24352D] bg-[#24352D]/5 text-[#24352D] dark:border-[#C58B55] dark:bg-[#C58B55]/15 dark:text-[#C58B55]"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#24352D]"
            }`}
          >
            <ArrowDown size={18} />
            Price High
          </button>
        </div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Available Studios
          </h2>

          <p className="text-sm text-slate-500 dark:text-gray-400">
            Showing {filteredStudios.length} of {studios.length} studios
          </p>
        </div>

        {/* Studio Cards */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E3D9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-[#1B2922]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-[#24352D]">
                  {/* biome-ignore lint/performance/noImgElement: remote user-provided studio image URL */}
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Category */}
                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#24352D] shadow-sm dark:bg-[#1B2922]/95 dark:text-white">
                    {formatCategory(studio.categorySlug)}
                  </span>

                  {/* Price */}
                  <div className="absolute right-5 top-5 rounded-xl bg-white px-4 py-3 shadow-md dark:bg-[#1B2922]/95">
                    <span className="text-xl font-extrabold text-[#24352D] dark:text-white">
                      ${studio.pricePerHour}
                    </span>
                    <span className="text-sm text-slate-400 dark:text-gray-400">/hr</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Studio Name + Rating */}
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-[#C58B55] dark:text-white">
                      {studio.name}
                    </h3>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F5F1E8] px-3 py-1.5 text-xs font-bold text-[#24352D] dark:bg-[#24352D] dark:text-white">
                      <Star
                        size={13}
                        className="fill-[#C58B55] text-[#C58B55]"
                      />
                      {typeof studio.rating === "number"
                        ? studio.rating.toFixed(1)
                        : "New"}
                    </span>
                  </div>

                  {/* Location & Capacity */}
                  <div className="mb-6 flex flex-col gap-4 text-sm text-slate-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#C58B55]" />
                      {studio.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[#C58B55]" />
                      Capacity: {studio.capacity} People
                    </div>
                  </div>

                  {/* Availability & Details Button */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E8E3D9] pt-5 dark:border-gray-700">
                    {(studio.isAvailable ?? true) ? (
                      <span className="flex items-center gap-2 text-sm font-semibold text-[#24352D] dark:text-[#C58B55]">
                        <CheckCircle2 size={18} />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-sm font-semibold text-red-500 dark:text-red-400">
                        <XCircle size={18} />
                        Not Available
                      </span>
                    )}

                    <Link
                      href={`/explore-studios/${studio._id}`}
                      className="rounded-lg bg-[#24352D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#344A3F] dark:bg-[#C58B55] dark:text-[#121B16] dark:hover:bg-[#D69B65]"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title="No Studios Found"
            description="Try changing your search terms or category filter to see more results."
          >
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setSort("default");
              }}
              className="rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F] dark:bg-[#C58B55] dark:text-[#121B16] dark:hover:bg-[#D69B65]"
            >
              Clear Filters
            </button>
          </EmptyState>
        )}
      </div>
    </section>
  );
};

export default ExploreStudiosClient;

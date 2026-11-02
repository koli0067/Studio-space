
"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Users,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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
    [studios]
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
      result = [...result].sort(
        (a, b) => a.pricePerHour - b.pricePerHour
      );
    }

    if (sort === "high") {
      result = [...result].sort(
        (a, b) => b.pricePerHour - a.pricePerHour
      );
    }

    return result;
  }, [studios, search, category, sort]);

  const formatCategory = (value: string) =>
    value.split("-").join(" ");

  return (
    <section className="min-h-screen  bg-[#F5F1E8]  px-5 py-12 md:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
              <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
              Find Your Creative Space
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#24352D] md:text-5xl">
              Explore Studios
            </h1>

          <p className="mt-3 text-lg text-slate-500">
            Discover {studios.length} creative studios available for booking
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:flex-row">

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
              className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-4 outline-none focus:border-emerald-500"
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
            onClick={() =>
              setSort(sort === "low" ? "default" : "low")
            }
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 transition ${
              sort === "low"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ArrowUp size={18} />
            Price Low
          </button>

          <button
            onClick={() =>
              setSort(sort === "high" ? "default" : "high")
            }
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 transition ${
              sort === "high"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ArrowDown size={18} />
            Price High
          </button>
        </div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Available Studios
          </h2>

          <p className="text-sm text-slate-500">
            Showing {filteredStudios.length} of {studios.length} studios
          </p>
        </div>

        {/* Studio Cards */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
  {filteredStudios.map((studio) => (
    <div
      key={studio._id}
     className="group overflow-hidden rounded-2xl border border-[#E7DFD2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={studio.image}
          alt={studio.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700 shadow-sm">
          {formatCategory(studio.categorySlug)}
        </span>

        {/* Price */}
        <div className="absolute right-5 top-5 rounded-xl bg-white px-4 py-3 shadow-md">
          <span className="text-xl font-extrabold text-[#24352D]">
            ৳{studio.pricePerHour}
          </span>
          <span className="text-sm text-slate-400">/hr</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Studio Name */}
        <h3 className="mb-5 text-xl font-bold text-slate-900 transition group-hover:text-emerald-700">
          {studio.name}
        </h3>

        {/* Location & Capacity */}
        <div className="mb-6 flex flex-col gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-emerald-600" />
            {studio.location}
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-emerald-600" />
            Capacity: {studio.capacity} People
          </div>
        </div>

        {/* Availability & Details Button */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          {studio.isAvailable ? (
            <span className="flex items-center gap-2 text-sm font-semibold text-[#24352D]">
              <CheckCircle2 size={18} />
              Available
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm font-semibold text-red-500">
              <XCircle size={18} />
              Not Available
            </span>
          )}

          <Link
            href={`/explore-studios/${studio._id}`}
            className="rounded-lg  bg-[#24352D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#344A3F]"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <Search size={40} className="mx-auto mb-4 text-slate-300" />

            <h3 className="text-xl font-bold text-slate-800">
              No Studios Found
            </h3>

            <p className="mt-2 text-slate-500">
              Try changing your search or category filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
                setSort("default");
              }}
              className="mt-5 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExploreStudiosClient;

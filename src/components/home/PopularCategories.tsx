
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Photo Studios",
    slug: "photo-studios",
    description:
      "Professional spaces for portrait, product, and commercial photography.",
    image: "/images/portrait.png",
    number: "01",
  },
  {
    id: 2,
    title: "Sound Stages",
    slug: "sound-stages",
    description: "Large sound stages for film, TV, and video productions.",
    image: "/images/product.jpg",
    number: "02",
  },
  {
    id: 3,
    title: "Podcast Rooms",
    slug: "podcast-rooms",
    description: "Acoustically treated rooms for podcast and audio recording.",
    image: "/images/fashion.png",
    number: "03",
  },
  {
    id: 4,
    title: "Music Suites",
    slug: "music-suites",
    description: "Fully equipped music studios for recording and rehearsal.",
    image: "/images/wedding.png",
    number: "04",
  },
  {
    id: 5,
    title: "Art Workshops",
    slug: "art-workshops",
    description: "Creative workshop spaces for art, craft, and design.",
    image: "/images/portrait.png",
    number: "05",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#121B16] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Browse by Category
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#24352D] dark:text-white sm:text-4xl lg:text-5xl">
            Find the Perfect Studio
            <span className="block text-[#C58B55]">
              for Every Shoot
            </span>
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explore-studios?category=${category.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#E8E3D9] bg-[#FAF9F6] transition-all duration-300 hover:-translate-y-2 hover:border-[#C58B55] hover:shadow-xl dark:border-gray-700 dark:bg-[#1B2922]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Category Number */}
                <span className="absolute left-4 top-4 rounded-lg border border-white/30 bg-black/30 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                  {category.number}
                </span>

                {/* Hover Icon */}
                <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#C58B55] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={21} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#24352D] transition-colors group-hover:text-[#C58B55] dark:text-white">
                  {category.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#66736A] dark:text-gray-400">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#E8E3D9] pt-4 dark:border-gray-700">
                  <span className="text-sm font-bold text-[#C58B55]">
                    Explore Studios
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-[#C58B55] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

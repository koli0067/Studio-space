
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Portrait Photography",
    description:
      "Capture beautiful portraits in professional studio environments.",
    image: "/images/portrait.png",
    number: "01",
  },
  {
    id: 2,
    title: "Product Photography",
    description:
      "Create stunning product images for brands and businesses.",
    image: "/images/product.jpg",
    number: "02",
  },
  {
    id: 3,
    title: "Fashion Photography",
    description:
      "Find creative spaces for fashion shoots and portfolios.",
    image: "/images/fashion.png",
    number: "03",
  },
  {
    id: 4,
    title: "Wedding Photography",
    description:
      "Capture special moments in beautiful photography spaces.",
    image: "/images/wedding.png",
    number: "04",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Explore Categories
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#24352D] sm:text-4xl lg:text-5xl">
            Find the Perfect Studio
            <span className="block text-[#C58B55]">
              for Every Shoot
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-[#66736A] sm:text-lg">
            Explore photography spaces designed for every creative vision.
            Choose your photography style and discover a studio that
            brings your ideas to life.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-[#FAF9F6] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#24352D]">
                  {category.number}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#24352D]">
                  {category.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#66736A]">
                  {category.description}
                </p>

                <Link
                  href={`/explore?category=${encodeURIComponent(category.title)}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C58B55] transition hover:gap-3"
                >
                  Explore Studios
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Portrait Photographer",
    initials: "SJ",
    review:
      "Finding the right photography studio has never been easier. StudioSpace makes it simple to discover beautiful spaces for my portrait sessions.",
  },
  {
    id: 2,
    name: "Michael Anderson",
    role: "Product Photographer",
    initials: "MA",
    review:
      "I love how easy it is to explore different studios and compare their facilities. It saves me time and helps me focus on my creative work.",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Fashion Photographer",
    initials: "EC",
    review:
      "A convenient platform for finding creative photography spaces. The booking process is straightforward, and discovering new studios feels effortless.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F5F1E8] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Client Experiences
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#24352D] sm:text-4xl lg:text-5xl">
            What Our Customers
            <span className="block text-[#C58B55]">
              Say About Us
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-[#66736A] sm:text-lg">
            Discover how StudioSpace helps photography enthusiasts
            and creative professionals find the perfect space for
            their projects.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[#E7E1D6] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F1E8]">
                  <Quote
                    size={25}
                    className="text-[#C58B55]"
                  />
                </div>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="#C58B55"
                      stroke="#C58B55"
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <p className="min-h-[120px] text-sm leading-8 text-[#66736A]">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-6 border-t border-gray-100" />

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#24352D] text-sm font-bold text-white">
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-bold text-[#24352D]">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#66736A]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <p className="mt-8 text-center text-xs text-[#66736A]">
          Sample testimonials for demonstration purposes.
        </p>

      </div>
    </section>
  );
}

import { CalendarCheck, Camera, ShieldCheck, Wallet } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Camera,
    title: "Professional Photography Spaces",
    description:
      "Discover well-equipped photography studios designed to support your creativity and bring your ideas to life.",
    number: "01",
  },
  {
    id: 2,
    icon: CalendarCheck,
    title: "Easy Online Booking",
    description:
      "Find your ideal studio and book your preferred time slot through a simple and convenient booking process.",
    number: "02",
  },
  {
    id: 3,
    icon: Wallet,
    title: "Flexible Pricing",
    description:
      "Explore different studios with transparent hourly rates and choose a space that fits your budget.",
    number: "03",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Trusted Studio Owners",
    description:
      "Connect with studio owners and explore photography spaces with clear information and reliable booking details.",
    number: "04",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F5F1E8] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Why Choose StudioSpace
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#24352D] sm:text-4xl lg:text-5xl">
            Everything You Need
            <span className="block text-[#C58B55]">in One Creative Space</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-[#66736A] sm:text-lg">
            We make finding and booking photography studios simple, convenient,
            and stress-free so you can focus on creating your best work.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Number */}
                <span className="absolute right-6 top-6 text-sm font-bold text-[#D8CFC0]">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F1E8] transition duration-300 group-hover:bg-[#24352D]">
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                    className="text-[#C58B55] transition duration-300 group-hover:text-white"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold leading-snug text-[#24352D]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#66736A]">
                  {feature.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-[#C58B55] transition-all duration-300 group-hover:w-20" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

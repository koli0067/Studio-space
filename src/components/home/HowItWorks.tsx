
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ClipboardCheck,
  Search,
} from "lucide-react";

const steps = [
  {
    id: 1,
    number: "01",
    icon: Search,
    title: "Discover Spaces",
    description:
      "Explore photography studios and find a space that matches your creative needs.",
  },
  {
    id: 2,
    number: "02",
    icon: CalendarDays,
    title: "Select Shoot Hours",
    description: "Choose your preferred studio, date, and available time slot.",
  },
  {
    id: 3,
    number: "03",
    icon: ClipboardCheck,
    title: "Book Instantly",
    description: "Review details and confirm your booking instantly.",
  },
  {
    id: 4,
    number: "04",
    icon: Camera,
    title: "Create & Produce",
    description:
      "Visit your booked studio and bring your creative vision to life.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#121B16] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Simple Booking Process
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#24352D] dark:text-white sm:text-4xl lg:text-5xl">
            How It
            <span className="text-[#C58B55]"> Works</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-[#66736A] dark:text-gray-400 sm:text-lg">
            Booking your perfect photography studio is simple. Follow these four
            easy steps and get ready to bring your creative vision to life.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative text-center">
                {/* Connector Arrow */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(50%+48px)] top-9 hidden w-[calc(100%-70px)] lg:block">
                    <div className="border-t-2 border-dashed border-[#D9C9B4] dark:border-gray-600" />
                    <ArrowRight
                      size={19}
                      className="absolute -right-1 -top-[10px] text-[#C58B55]"
                    />
                  </div>
                )}

                {/* Icon Circle */}
                <div className="group relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E9D8C3] bg-[#F5F1E8] transition duration-300 hover:border-[#C58B55] hover:bg-[#24352D] dark:border-gray-600 dark:bg-[#1B2922]">
                  <Icon
                    size={32}
                    strokeWidth={1.7}
                    className="text-[#C58B55] transition group-hover:text-white"
                  />

                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#C58B55] text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#24352D] dark:text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#66736A] dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

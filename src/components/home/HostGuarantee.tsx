
import { BadgeCheck, Headphones, ShieldCheck, Wrench } from "lucide-react";

const assurances = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Liability Protection",
    description: "Comprehensive coverage for hosts and guests during bookings.",
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "Verified Profiles",
    description: "All hosts and creators are verified for a trusted community.",
  },
  {
    id: 3,
    icon: Wrench,
    title: "Equipment Safety",
    description: "Guidelines and support to keep equipment safe and secure.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Host Support",
    description: "Round-the-clock assistance for hosts whenever needed.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#121B16] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Host Guarantee
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#24352D] dark:text-white sm:text-4xl lg:text-5xl">
            Creator Support & Assurances
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 bg-[#FAF9F6] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#1B2922]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24352D]">
                  <Icon size={26} className="text-[#C58B55]" />
                </div>
                <h3 className="text-lg font-bold text-[#24352D] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#66736A] dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

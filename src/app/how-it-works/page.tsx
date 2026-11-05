
import HowItWorks from "@/components/home/HowItWorks";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] dark:bg-[#121B16]">
      <HowItWorks />
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-[#1B2922]">
          <h3 className="text-2xl font-bold text-[#24352D] dark:text-white">
            Why it works
          </h3>
          <p className="mt-3 text-[#66736A] dark:text-gray-400">
            StudioSpace connects creators with verified studios. Book in
            minutes, show up, and create.
          </p>
        </div>
      </section>
    </main>
  );
}

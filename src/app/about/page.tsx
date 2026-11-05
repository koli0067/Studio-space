
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] px-5 py-16 dark:bg-[#121B16]">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-[#24352D] dark:text-white">
          About StudioSpace
        </h1>
        <p className="mt-4 text-lg text-[#66736A] dark:text-gray-400">
          StudioSpace helps creators discover and book professional photography
          studios. Our mission is to make creative spaces accessible to
          everyone.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1B2922]">
            <h3 className="text-xl font-bold text-[#24352D] dark:text-white">
              Our Mission
            </h3>
            <p className="mt-2 text-[#66736A] dark:text-gray-400">
              Empower creators with easy access to inspiring spaces.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1B2922]">
            <h3 className="text-xl font-bold text-[#24352D] dark:text-white">
              Our Values
            </h3>
            <p className="mt-2 text-[#66736A] dark:text-gray-400">
              Trust, creativity, and community drive everything we do.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

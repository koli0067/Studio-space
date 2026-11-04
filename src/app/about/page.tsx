export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-[#24352D]">About StudioSpace</h1>
        <p className="mt-4 text-lg text-[#66736A]">
          StudioSpace helps creators discover and book professional photography
          studios. Our mission is to make creative spaces accessible to
          everyone.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#24352D]">Our Mission</h3>
            <p className="mt-2 text-[#66736A]">
              Empower creators with easy access to inspiring spaces.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#24352D]">Our Values</h3>
            <p className="mt-2 text-[#66736A]">
              Trust, creativity, and community drive everything we do.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


import { Suspense } from "react";
import ExploreStudiosClient from "./ExploreStudiosClient";

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

const ExploreStudiosData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const data: Studio[] = await res.json();

  return <ExploreStudiosClient studios={data} />;
};

const ExploreGridFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8] dark:bg-[#121B16]">
    <p className="animate-pulse text-xl font-semibold text-[#24352D] dark:text-white">
      Loading...
    </p>
  </div>
);

const ExploreStudiosPage = () => {
  return (
    <Suspense fallback={<ExploreGridFallback />}>
      <ExploreStudiosData />
    </Suspense>
  );
};

export default ExploreStudiosPage;

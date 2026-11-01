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
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const data: Studio[] = await res.json();

  return <ExploreStudiosClient studios={data} />;
};

const ExploreStudiosPage = () => {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading studios...</p>}>
      <ExploreStudiosData />
    </Suspense>
  );
};

export default ExploreStudiosPage;
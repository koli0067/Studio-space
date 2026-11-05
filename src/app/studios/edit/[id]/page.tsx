
"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StudioForm, {
  type StudioFormValues,
  type StudioSubmitData,
} from "@/components/studios/StudioForm";
import { Skeleton } from "@/components/ui/skeleton";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

interface StudioApiResponse {
  _id: string;
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  images?: string[];
  location: string;
  pricePerHour: number;
  securityDeposit?: number;
  capacity: number;
  facilities?: string[];
  amenities?: string[];
  isAvailable: boolean;
  creatorEmail?: string;
}

const UpdateStudioPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [studio, setStudio] = useState<StudioFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        setLoading(true);
        setError("");

        const token = await GetTokenFromClient();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${id}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token && { authorization: `Bearer ${token}` }),
            },
          },
        );

        if (!response.ok) {
          throw new Error("Studio not found");
        }

        const data: StudioApiResponse = await response.json();

        setStudio({
          name: data.name,
          categorySlug: data.categorySlug,
          description: data.description,
          image: data.image,
          images: data.images ?? [],
          location: data.location,
          pricePerHour: data.pricePerHour,
          securityDeposit: data.securityDeposit ?? 0,
          capacity: data.capacity,
          facilities:
            data.facilities && data.facilities.length > 0
              ? data.facilities.map((facility) => ({
                  id: `${facility}-${Math.random().toString(16).slice(2)}`,
                  value: facility,
                }))
              : [{ id: "facility-default", value: "" }],
          amenities: data.amenities ?? [],
          isAvailable: data.isAvailable,
        });
      } catch (err) {
        console.error("Fetch Studio Error:", err);
        setError("Could not load the studio details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  const handleUpdate = async (data: StudioSubmitData) => {
    try {
      setSubmitting(true);

      const token = await GetTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        toast.error(
          resData.message || "Failed to update studio. Please try again!",
        );
        return;
      }

      toast.success("Studio updated successfully!");

      setTimeout(() => {
        router.push("/my-listings");
      }, 1000);
    } catch (error) {
      console.error("Update Studio Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8] dark:bg-[#121B16]">
        <p className="animate-pulse text-xl font-semibold text-[#24352D] dark:text-white">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8] px-4 dark:bg-[#121B16]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#24352D] dark:text-white">
            {error || "Studio not found"}
          </h1>

          <p className="mt-2 text-slate-500 dark:text-gray-400">
            This studio may have been removed or the link is invalid.
          </p>

          <Link
            href="/my-listings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#24352D] px-6 py-3 font-semibold text-white transition hover:bg-[#344A3F]"
          >
            <ArrowLeft size={18} />
            Back to My Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] px-4 py-10 dark:bg-[#121B16] md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Studio Management
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#24352D] dark:text-white md:text-4xl">
            Update Studio
          </h1>

          <p className="mt-2 text-slate-500 dark:text-gray-400">
            Update the details of your existing studio listing.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E3D9] bg-white p-6 shadow-sm dark:border-[#34483D] dark:bg-[#1B2922] md:p-8">
          <StudioForm
            initialValues={studio}
            submitLabel="Update Studio"
            submitting={submitting}
            onSubmit={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateStudioPage;

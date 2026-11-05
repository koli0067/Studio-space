
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import StudioForm, {
  type StudioSubmitData,
} from "@/components/studios/StudioForm";
import { useSession } from "@/lib/auth-client";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

const AddStudioPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: StudioSubmitData) => {
    try {
      setSubmitting(true);

      const token = await GetTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...data,
            creatorEmail: session?.user?.email,
            creatorName: session?.user?.name,
            isAvailable: true,
          }),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        toast.error(
          resData.message || "Failed to add studio. Please try again!",
        );
        return;
      }

      toast.success("Studio added successfully!");

      setTimeout(() => {
        router.push("/my-listings");
      }, 1000);
    } catch (error) {
      console.error("Add Studio Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] px-4 py-10 dark:bg-[#121B16] md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#C58B55]">
            Studio Management
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#24352D] dark:text-white md:text-4xl">
            Add New Studio
          </h1>

          <p className="mt-2 text-slate-500 dark:text-gray-400">
            Fill in the details below to list your studio on StudioSpace.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E3D9] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1B2922] md:p-8">
          <StudioForm
            submitLabel="Add Studio"
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStudioPage;

"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { Divide } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

interface StudioFormData {
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

const AddStudioForm = () => {
  const [formData, setFormData] = useState<StudioFormData>({
    name: "",
    categorySlug: "",
    description: "",
    image: "",
    location: "",
    pricePerHour: 0,
    capacity: 0,
    facilities: [""],
    isAvailable: true,
  });

const { data: session, isPending } = useSession();

if (isPending) {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <Spinner className="h-20 w-20" />
    </div>
  );
}

const user = session?.user;

if (!user) {
  return <p>Please login first.</p>;
}

console.log(user);
  

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerHour" || name === "capacity"
          ? Number(value)
          : value,
    }));
  };

const handleFacilityChange = (index: number, value: string) => {
    const updatedFacilities = [...formData.facilities];
    updatedFacilities[index] = value;
    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
  };

  const addFacilityField = () => {
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, ""],
    }));
  };

  const removeFacilityField = (index: number) => {
    const updatedFacilities = formData.facilities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities.length > 0 ? updatedFacilities : [""],
    }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  // বেসিক ফিল্ডগুলো অবজেক্টে নেওয়া হলো
  const data = Object.fromEntries(formData.entries());

  // Data Formatting (facilities array + isAvailable boolean)
  const submittedData = {
    ...data,
    pricePerHour: Number(data.pricePerHour),
    capacity: Number(data.capacity),
    facilities: formData
      .getAll("facilities")
      .map((item) => item.toString().trim())
      .filter((item) => item !== ""),
      isAvailable: formData.has("isAvailable"),
    
  };

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...submittedData, creatorEmail: user.email}),
      }
    );

    const resData = await result.json();
    console.log("Server Response:", resData);

    if (result.ok) {
      toast.success("Successfully added!");
      form.reset();
      setFormData({
        name: "",
        categorySlug: "",
        description: "",
        image: "",
        location: "",
        pricePerHour: 0,
        capacity: 0,
        facilities: [""],
        isAvailable: true,
      });
    } else {
      toast.error("Failed to submit. Please try again!");
    }
  } catch (error) {
    toast.error("Something went wrong!");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-[#FBFBFA] px-4 py-10 md:px-8">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#8C6D4F]">
            Studio Management
          </p>

          <h1 className="text-3xl font-bold text-[#1F2924] md:text-4xl">
            Add New Studio
          </h1>

          <p className="mt-2 text-slate-500">
            Add your studio details and make it available for customers.
          </p>
        </div>

        {/* Form */}
        <form
  onSubmit={handleSubmit}
  className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
>
  {/* Basic Information */}
  <div className="space-y-5">
    <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-[#1F2924]">
      Basic Information
    </h2>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Studio Name *
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Enter studio name"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Category Slug *
        </label>
        <input
          name="categorySlug"
          value={formData.categorySlug}
          onChange={handleChange}
          type="text"
          placeholder="Enter category slug"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>
    </div>
  </div>

  {/* Studio Details */}
  <div className="space-y-5">
    <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-[#1F2924]">
      Studio Details
    </h2>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Image URL *
        </label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          type="url"
          placeholder="Paste studio image URL"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Location *
        </label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          type="text"
          placeholder="Enter studio location"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Price Per Hour *
        </label>
        <input
          name="pricePerHour"
          value={formData.pricePerHour || ""}
          onChange={handleChange}
          type="number"
          min="1"
          placeholder="Enter hourly price"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Capacity *
        </label>
        <input
          name="capacity"
          value={formData.capacity || ""}
          onChange={handleChange}
          type="number"
          min="1"
          placeholder="Enter capacity"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your studio..."
          required
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
        />
      </div>

      {/* Facilities Dynamic Inputs (এখানে যোগ করা হয়েছে) */}
      <div className="md:col-span-2 space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Facilities
        </label>
        {formData.facilities.map((facility, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={facility}
              name="facilities"
              onChange={(e) => handleFacilityChange(index, e.target.value)}
              placeholder="e.g. Professional Lighting Setup"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1F2924] focus:ring-2 focus:ring-[#1F2924]/10"
            />
            {formData.facilities.length > 1 && (
              <button
                type="button"
                onClick={() => removeFacilityField(index)}
                className="rounded-lg bg-red-100 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFacilityField}
          className="mt-2 rounded-lg border border-dashed border-[#1F2924] px-4 py-2 text-sm font-semibold text-[#1F2924] transition hover:bg-[#1F2924]/5"
        >
          + Add Facility
        </button>
      </div>

      {/* Is Available Checkbox (এখানে যোগ করা হয়েছে) */}
      <div className="flex items-center gap-3 md:col-span-2 pt-2">
        <input
          name="isAvailable"
          type="checkbox"
          defaultChecked={true}
          className="h-5 w-5 rounded border-slate-300 text-[#1F2924] accent-[#1F2924] focus:ring-[#1F2924]/10 cursor-pointer"
        />
        <label className="text-sm font-semibold text-slate-700 cursor-pointer">
          Studio is available for booking
        </label>
      </div>

    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full rounded-xl bg-[#1F2924] py-4 font-bold text-white shadow-sm transition hover:bg-[#2C3832] active:scale-[0.99]"
  >
    Add Studio
  </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudioForm;
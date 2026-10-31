
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

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

  const addFacility = () => {
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, ""],
    }));
  };

  const removeFacility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedData = {
      ...formData,
      facilities: formData.facilities.filter((item) => item.trim() !== ""),
    };

    console.log("Studio Data:", submittedData);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-10 md:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Studio Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Add New Studio
          </h1>

          <p className="mt-2 text-slate-500">
            Add your studio details and make it available for customers.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
        >

          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="mb-5 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              
            </div>
          </div>

          {/* Studio Details */}
          <div className="mb-8">

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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

            </div>
          </div>

          <div className="md:col-span-2 mb-4">
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
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-4 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
          >
            Add Studio
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddStudioForm;

// add studio pager from ata
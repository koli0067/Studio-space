
"use client";

import { useState } from "react";

export default function AddStudioForm() {
  const [formData, setFormData] = useState({
    name: "",
    categorySlug: "portrait-photography",
    description: "",
    image: "",
    bannerImage: "",
    location: "",
    pricePerHour: "",
    capacity: "",
    facilities: [] as string[],
    isAvailable: true,
  });

  const facilitiesList = [
    "Professional Lighting Setup",
    "Multiple Background Options",
    "Studio Photography Equipment",
    "Comfortable Shooting Environment",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((item) => item !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Studio Data:", formData);
  };

  return (
    <section className="min-h-screen bg-[#F5F1E8] px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#24352D]">
            Add Your Studio
          </h1>
          <p className="mt-3 text-[#66736A]">
            Share your photography studio and connect with creative people.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl bg-white p-6 shadow-sm md:p-10"
        >
          {/* Basic Information */}
          <div>
            <h2 className="mb-5 text-xl font-semibold text-[#24352D]">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Studio Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter studio name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Photography Category
                </label>
                <select
                  name="categorySlug"
                  value={formData.categorySlug}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                >
                  <option value="portrait-photography">
                    Portrait Photography
                  </option>
                  <option value="product-photography">
                    Product Photography
                  </option>
                  <option value="fashion-photography">
                    Fashion Photography
                  </option>
                  <option value="wedding-photography">
                    Wedding Photography
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Studio Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your photography studio..."
                  rows={4}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="mb-5 text-xl font-semibold text-[#24352D]">
              Studio Images
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Studio Cover Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Studio Banner Image URL
                </label>
                <input
                  type="url"
                  name="bannerImage"
                  value={formData.bannerImage}
                  onChange={handleChange}
                  placeholder="Enter banner image URL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="mb-5 text-xl font-semibold text-[#24352D]">
              Studio Location
            </h2>

            <label className="mb-2 block font-medium text-gray-700">
              Full Address
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter studio address"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
            />
          </div>

          {/* Pricing */}
          <div>
            <h2 className="mb-5 text-xl font-semibold text-[#24352D]">
              Pricing & Capacity
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Price Per Hour (৳)
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  min="0"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Maximum Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 10 people"
                  min="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24352D]"
                />
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-[#24352D]">
              Studio Facilities
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {facilitiesList.map((facility) => (
                <label
                  key={facility}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                    className="h-4 w-4 accent-[#24352D]"
                  />
                  {facility}
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="flex items-center gap-3 font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isAvailable: e.target.checked,
                  }))
                }
                className="h-4 w-4 accent-[#24352D]"
              />
              Studio is currently available for booking
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#24352D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#344C40]"
          >
            Submit Studio
          </button>
        </form>
      </div>
    </section>
  );
}

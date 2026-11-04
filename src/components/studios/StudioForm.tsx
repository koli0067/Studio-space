"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";

export interface FacilityField {
  id: string;
  value: string;
}

export interface StudioFormValues {
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  securityDeposit: number;
  capacity: number;
  facilities: FacilityField[];
  amenities: string[];
  isAvailable: boolean;
}

export interface StudioSubmitData {
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  location: string;
  pricePerHour: number;
  securityDeposit: number;
  capacity: number;
  facilities: string[];
  amenities: string[];
  isAvailable: boolean;
}

interface StudioFormProps {
  initialValues?: Partial<StudioFormValues>;
  submitLabel: string;
  submitting?: boolean;
  onSubmit: (data: StudioSubmitData) => void | Promise<void>;
}

export const CATEGORY_OPTIONS = [
  { value: "photo-studios", label: "Photo Studio" },
  { value: "sound-stages", label: "Film Stage" },
  { value: "podcast-rooms", label: "Podcast Lounge" },
  { value: "music-suites", label: "Music Suite" },
  { value: "art-workshops", label: "Workshop" },
  { value: "event-spaces", label: "Event Space" },
];

const AMENITIES_OPTIONS = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Lighting Equipment",
  "Soundproof",
  "Dressing Room",
  "Restroom",
  "Green Screen",
];

const createFacilityId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `facility-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createEmptyFacility = (): FacilityField => ({
  id: createFacilityId(),
  value: "",
});

const createDefaultValues = (
  initialValues?: Partial<StudioFormValues>,
): StudioFormValues => ({
  name: "",
  categorySlug: "photo-studios",
  description: "",
  image: "",
  location: "",
  pricePerHour: 0,
  securityDeposit: 0,
  capacity: 0,
  facilities: [createEmptyFacility()],
  amenities: [],
  isAvailable: true,
  ...initialValues,
});

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#24352D] focus:ring-2 focus:ring-[#24352D]/10";

const StudioForm = ({
  initialValues,
  submitLabel,
  submitting = false,
  onSubmit,
}: StudioFormProps) => {
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState<StudioFormValues>(() =>
    createDefaultValues(initialValues),
  );

  const user = session?.user;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") return;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerHour" ||
        name === "securityDeposit" ||
        name === "capacity"
          ? Number(value)
          : value,
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity);

      return {
        ...prev,
        amenities: isSelected
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleFacilityChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.map((facility) =>
        facility.id === id ? { ...facility, value } : facility,
      ),
    }));
  };

  const addFacilityField = () => {
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, createEmptyFacility()],
    }));
  };

  const removeFacilityField = (id: string) => {
    setFormData((prev) => {
      const updatedFacilities = prev.facilities.filter(
        (facility) => facility.id !== id,
      );

      return {
        ...prev,
        facilities:
          updatedFacilities.length > 0
            ? updatedFacilities
            : [createEmptyFacility()],
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedData: StudioSubmitData = {
      name: formData.name,
      categorySlug: formData.categorySlug,
      description: formData.description,
      image: formData.image,
      location: formData.location,
      pricePerHour: Number(formData.pricePerHour),
      securityDeposit: Number(formData.securityDeposit),
      capacity: Number(formData.capacity),
      facilities: formData.facilities
        .map((facility) => facility.value.trim())
        .filter((facility) => facility !== ""),
      amenities: formData.amenities,
      isAvailable: formData.isAvailable,
    };

    await onSubmit(submittedData);
  };

  if (isPending || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner className="h-16 w-16 text-[#24352D]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Read-only Host Information */}
      <div className="space-y-5">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Host Information (Read-Only)
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="host-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Host Name
            </label>
            <input
              id="host-name"
              type="text"
              value={user.name || ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-[#E8E3D9] bg-slate-100 px-4 py-3 text-slate-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="host-email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Host Email
            </label>
            <input
              id="host-email"
              type="email"
              value={user.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-[#E8E3D9] bg-slate-100 px-4 py-3 text-slate-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-5">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="studio-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Studio Title *
            </label>
            <input
              id="studio-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Modern Sunset Photo Studio"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="studio-category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category *
            </label>
            <select
              id="studio-category"
              name="categorySlug"
              value={formData.categorySlug}
              onChange={handleChange}
              required
              className={`${inputClass} bg-white`}
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="space-y-5">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Pricing &amp; Capacity
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="price-per-hour"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Hourly Rate ($) *
            </label>
            <input
              id="price-per-hour"
              name="pricePerHour"
              value={formData.pricePerHour || ""}
              onChange={handleChange}
              type="number"
              min="1"
              placeholder="e.g. 50"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="security-deposit"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Security Deposit ($) *
            </label>
            <input
              id="security-deposit"
              name="securityDeposit"
              value={formData.securityDeposit || ""}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="e.g. 100"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="max-capacity"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Max Capacity *
            </label>
            <input
              id="max-capacity"
              name="capacity"
              value={formData.capacity || ""}
              onChange={handleChange}
              type="number"
              min="1"
              placeholder="e.g. 15"
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Location & Media */}
      <div className="space-y-5">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Location &amp; Details
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="studio-location"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Location / Address *
            </label>
            <input
              id="studio-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              placeholder="Enter full address or studio location"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <label
              htmlFor="studio-image-url"
              className="block text-sm font-semibold text-slate-700"
            >
              Studio Image *
            </label>

            <input
              id="studio-image-url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="url"
              placeholder="Or paste an image URL manually"
              required
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="studio-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Detailed Overview *
            </label>
            <textarea
              id="studio-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide a detailed overview of your studio space..."
              required
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Amenities
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AMENITIES_OPTIONS.map((amenity) => {
            const isSelected = formData.amenities.includes(amenity);

            return (
              <label
                key={amenity}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition ${
                  isSelected
                    ? "border-[#24352D] bg-[#24352D]/5 font-semibold text-[#24352D]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 accent-[#24352D]"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom Facilities */}
      <div className="space-y-3">
        <h2 className="border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D]">
          Custom Facilities
        </h2>

        {formData.facilities.map((facility) => (
          <div key={facility.id} className="flex items-center gap-3">
            <input
              type="text"
              value={facility.value}
              onChange={(e) =>
                handleFacilityChange(facility.id, e.target.value)
              }
              placeholder="e.g. Professional Lighting Setup"
              className={inputClass}
            />

            {formData.facilities.length > 1 && (
              <button
                type="button"
                onClick={() => removeFacilityField(facility.id)}
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
          className="mt-2 rounded-lg border border-dashed border-[#24352D] px-4 py-2 text-sm font-semibold text-[#24352D] transition hover:bg-[#24352D]/5"
        >
          + Add Custom Facility
        </button>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3 pt-2">
        <input
          id="is-available"
          name="isAvailable"
          type="checkbox"
          checked={formData.isAvailable}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isAvailable: e.target.checked,
            }))
          }
          className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-[#24352D]"
        />
        <label
          htmlFor="is-available"
          className="cursor-pointer text-sm font-semibold text-slate-700"
        >
          Studio is available for instant booking
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-[#24352D] py-4 font-bold text-white shadow-sm transition hover:bg-[#344A3F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
};

export default StudioForm;

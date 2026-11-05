
"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import MultiImageUpload from "../shared/MultiImageUpload";

export interface FacilityField {
  id: string;
  value: string;
}

export interface StudioFormValues {
  name: string;
  categorySlug: string;
  description: string;
  image: string;
  images: string[];
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
  images: string[];
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
  images: [],
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
  "w-full rounded-lg border border-slate-300 px-4 py-3 bg-white text-[#24352D] outline-none transition placeholder:text-slate-400 focus:border-[#24352D] focus:ring-2 focus:ring-[#24352D]/10 dark:border-gray-600 dark:bg-[#1B2922] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#C58B55]";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300";

const headingClass =
  "border-b border-[#E8E3D9] pb-3 text-lg font-bold text-[#24352D] dark:border-gray-700 dark:text-white";

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
      images: formData.images,
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
        <Spinner className="h-16 w-16 text-[#24352D] dark:text-[#C58B55]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Read-only Host Information */}
      <div className="space-y-5">
        <h2 className={headingClass}>
          Host Information (Read-Only)
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="host-name" className={labelClass}>
              Host Name
            </label>
            <input
              id="host-name"
              type="text"
              value={user.name || ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-[#E8E3D9] bg-slate-100 px-4 py-3 text-slate-500 outline-none dark:border-gray-700 dark:bg-[#24352D] dark:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="host-email" className={labelClass}>
              Host Email
            </label>
            <input
              id="host-email"
              type="email"
              value={user.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-[#E8E3D9] bg-slate-100 px-4 py-3 text-slate-500 outline-none dark:border-gray-700 dark:bg-[#24352D] dark:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-5">
        <h2 className={headingClass}>
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="studio-name" className={labelClass}>
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
            <label htmlFor="studio-category" className={labelClass}>
              Category *
            </label>
            <select
              id="studio-category"
              name="categorySlug"
              value={formData.categorySlug}
              onChange={handleChange}
              required
              className={`${inputClass} bg-white dark:bg-[#1B2922]`}
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
        <h2 className={headingClass}>
          Pricing &amp; Capacity
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="price-per-hour" className={labelClass}>
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
            <label htmlFor="security-deposit" className={labelClass}>
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
            <label htmlFor="max-capacity" className={labelClass}>
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
        <h2 className={headingClass}>
          Location &amp; Details
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="studio-location" className={labelClass}>
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
            <label className={labelClass}>
              Studio Image *
            </label>

            <ImageUpload
              value={formData.image}
              onChange={(url) =>
                setFormData((prev) => ({
                  ...prev,
                  image: url,
                }))
              }
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <label className={labelClass}>
              Gallery Images (Maximum 5)
            </label>

            <MultiImageUpload
              value={formData.images}
              onChange={(urls) =>
                setFormData((prev) => ({
                  ...prev,
                  images: urls,
                }))
              }
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="studio-description" className={labelClass}>
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
        <h2 className={headingClass}>
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
                    ? "border-[#24352D] bg-[#24352D]/5 font-semibold text-[#24352D] dark:border-[#C58B55] dark:bg-[#C58B55]/10 dark:text-[#E5B98A]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#24352D]"
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
        <h2 className={headingClass}>
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
                className="rounded-lg bg-red-100 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addFacilityField}
          className="mt-2 rounded-lg border border-dashed border-[#24352D] px-4 py-2 text-sm font-semibold text-[#24352D] transition hover:bg-[#24352D]/5 dark:border-[#C58B55] dark:text-[#E5B98A] dark:hover:bg-[#C58B55]/10"
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
          className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-gray-300"
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

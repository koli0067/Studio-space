"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GetTokenFromClient from "@/lib/GetTokenFromClient";

interface StudioFormData {
  _id?: string;
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

interface EditStudioButtonProps {
  data: StudioFormData;
}

const EditStudioButton = ({ data }: EditStudioButtonProps) => {
  const [formData, setFormData] = useState<StudioFormData>(data);
  const [open, setOpen] = useState(false); // ডায়ালগ ওপেন/ক্লোজ কন্ট্রোল করার জন্য

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerHour" || name === "capacity"
          ? Number(val)
          : val,
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

    const token = await GetTokenFromClient();
    const studioId = data._id; // প্রপস থেকে সরাসরি আইডি সেফ রাখা হলো

    if (!studioId) {
      toast.error("Studio ID is missing!");
      return;
    }

    // স্টেট থেকে ডেটা প্রপারলি ফরম্যাট করা
    const submittedData = {
      name: formData.name,
      categorySlug: formData.categorySlug,
      description: formData.description,
      image: formData.image,
      location: formData.location,
      pricePerHour: Number(formData.pricePerHour),
      capacity: Number(formData.capacity),
      facilities: formData.facilities
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      isAvailable: formData.isAvailable,
    };

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${studioId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submittedData),
        }
      );

      const resData = await result.json();
      console.log("Server Response:", resData);

      if (result.ok) {
        toast.success("Studio updated successfully!");
        setOpen(false); // সফলভাবে এডিট হলে ডায়ালগ বন্ধ হয়ে যাবে
      } else {
        toast.error(resData.message || "Failed to update studio!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div> 
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            type="button"
            variant="outline"
            className="flex items-center px-5 justify-center gap-2 rounded-lg border border-[#1F2924] font-semibold text-[#1F2924] transition hover:bg-[#1F2924] hover:text-white"
          >
            <Pencil size={17} />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[98vw] min-w-xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-2xl">Edit Studio Information</DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 text-left mt-4"
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

                    {/* Facilities Dynamic Inputs */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-sm font-semibold text-slate-700">
                        Facilities
                      </label>
                      {formData.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={facility}
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

                    {/* Is Available Checkbox */}
                    <div className="flex items-center gap-3 md:col-span-2 pt-2">
                      <input
                        name="isAvailable"
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={handleChange}
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
                  Update Studio
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditStudioButton;
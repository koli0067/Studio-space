
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE_MB = 10;

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file first!");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file!");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB!`);
      return;
    }

    try {
      setUploading(true);

      const cloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing!");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message || "Image upload failed!"
        );
      }

      onChange(data.secure_url);
      setFile(null);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed!"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dashed upload container */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[#E0D8C8] p-4 sm:flex-row">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#F3EFE6] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-[#E8E1D3]"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full shrink-0 rounded-xl bg-[#A24869] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8A3A57] disabled:opacity-50 sm:w-auto"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
      </div>

      {/* Image Preview */}
      {value && (
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-slate-200">
          <img
            src={value}
            alt="Studio preview"
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;








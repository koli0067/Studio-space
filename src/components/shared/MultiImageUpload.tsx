
"use client";

import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

const MultiImageUpload = ({ value = [], onChange }: MultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    if (value.length + files.length > 5) {
      toast.error("Maximum 5 gallery images allowed!");
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select valid image files!");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("Each image must be smaller than 10MB!");
        return;
      }
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

      const uploadedUrls: string[] = [];

      for (const file of files) {
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

        uploadedUrls.push(data.secure_url);
      }

      onChange([...value, ...uploadedUrls]);
      toast.success("Gallery images uploaded!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed!"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative h-32 w-32 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
          >
            <img
              src={url}
              alt={`Gallery ${index + 1}`}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                onChange(value.filter((_, i) => i !== index))
              }
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {value.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-32 w-44 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#E0D8C8] bg-[#FAF8F5] p-3 text-slate-600 transition hover:border-[#C58B55] disabled:opacity-60"
          >
            {uploading ? (
              <Loader2
                className="animate-spin text-slate-500"
                size={22}
              />
            ) : (
              <ImagePlus className="text-slate-600" size={22} />
            )}

            <span className="text-xs font-semibold text-slate-700">
              {uploading ? "Uploading..." : "Add Gallery Images"}
            </span>

            <span className="text-[11px] text-slate-400">
              ({value.length}/5 images)
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiImageUpload;











"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE_MB = 10;

const uploadToImgbb = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Image upload is not configured. Please paste an image URL instead.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data?.success) {
    throw new Error(data?.error?.message || "Image upload failed!");
  }

  return data.data.display_url || data.data.url;
};

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

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
      const url = await uploadToImgbb(file);
      onChange(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed!",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-[#E8E3D9]">
          {/* biome-ignore lint/performance/noImgElement: preview of uploaded studio image */}
          <img
            src={value}
            alt="Studio preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-[#24352D] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#344A3F] disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ImagePlus size={14} />
            )}
            Change Image
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex h-36 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#E8E3D9] bg-[#F5F1E8]/50 text-slate-500 transition hover:border-[#C58B55] hover:text-[#C58B55] disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={26} className="animate-spin text-[#C58B55]" />
              <span className="text-sm font-semibold">Uploading...</span>
            </>
          ) : (
            <>
              <ImagePlus size={26} className="text-[#C58B55]" />
              <span className="text-sm font-semibold">
                Click to upload studio image
              </span>
              <span className="text-xs text-slate-400">
                PNG, JPG or WEBP (max {MAX_FILE_SIZE_MB}MB)
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;

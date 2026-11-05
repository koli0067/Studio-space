
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface GalleryCarouselProps {
  image: string;
  images?: string[];
  name: string;
}

const GalleryCarousel = ({
  image,
  images = [],
  name,
}: GalleryCarouselProps) => {
  const galleryImages = [image, ...images];
  const [activeIndex, setActiveIndex] = useState(0);

  const previousImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="relative">
      <div className="relative h-[300px] overflow-hidden md:h-[520px]">
        <img
          src={galleryImages[activeIndex]}
          alt={`${name} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover transition duration-500"
        />

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#24352D] shadow-lg hover:bg-[#C58B55] hover:text-white dark:bg-[#1B2922]/90 dark:text-white"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#24352D] shadow-lg hover:bg-[#C58B55] hover:text-white dark:bg-[#1B2922]/90 dark:text-white"
            >
              <ChevronRight size={24} />
            </button>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
              {activeIndex + 1} / {galleryImages.length}
            </span>
          </>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto bg-white p-4 dark:bg-[#1B2922]">
          {galleryImages.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                activeIndex === index
                  ? "border-[#C58B55]"
                  : "border-transparent dark:border-gray-700"
              }`}
            >
              <img
                src={url}
                alt={`${name} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryCarousel;

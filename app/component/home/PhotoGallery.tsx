"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PhotoGalleryProps {
  title?: string;
  images: { src: string; alt?: string; caption?: string }[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  title = "Gallery",
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-10 px-6 md:px-14 mx-auto">
      {/* Title */}
      {title && (
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100 text-center">
          {title}
        </h2>
      )}

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="break-inside-avoid cursor-pointer overflow-hidden relative group"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt || `Gallery Image ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-sm py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full mx-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white bg-black/50 rounded-full p-2 hover:bg-black/80"
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img
                key={selectedImage}
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full max-h-[85vh] object-contain rounded-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {images[selectedImage].caption && (
                <p className="text-center text-gray-300 mt-3 text-sm">
                  {images[selectedImage].caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;

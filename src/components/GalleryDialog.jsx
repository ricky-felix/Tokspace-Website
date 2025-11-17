import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GalleryDialog = ({ images = [], showAllButton = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If no images, return null
  if (!images || images.length === 0) {
    return null;
  }

  // Get the first image for the preview
  const previewImage = images[0];

  const openGallery = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when dialog is open
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full">
      {/* Preview image */}
      <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={openGallery}>
        <img 
          src={previewImage.image_url} 
          alt={previewImage.alt_text || 'Product image'} 
          className="w-full h-auto object-cover"
        />
        
        {/* Show all photos button */}
        {showAllButton && images.length > 1 && (
          <button 
            className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md text-sm font-medium"
            onClick={openGallery}
          >
            {showAllButton.title || 'Show all photos'}
          </button>
        )}
      </div>

      {/* Gallery dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={closeGallery}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 text-white bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex].image_url}
                alt={images[currentImageIndex].alt_text || `Product image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
                <button 
                  className="bg-black bg-opacity-50 rounded-full p-2 text-white"
                  onClick={prevImage}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="bg-black bg-opacity-50 rounded-full p-2 text-white"
                  onClick={nextImage}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="p-4 flex justify-center space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`w-16 h-16 flex-shrink-0 cursor-pointer border-2 ${index === currentImageIndex ? 'border-white' : 'border-transparent'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDialog;
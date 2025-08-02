import React, { useContext } from "react";
import { Image, Check } from "lucide-react";
import { imageOptions } from "../assets/assets";
import { SessionContext } from "../context/SessionContext";

const SessionImage = () => {
  const {selectedImage, setSelectedImage} = useContext(SessionContext)
  return (
    // Card container with rounded corners and shadow
    <div className="rounded-xl overflow-hidden shadow-xl">

      {/* Header section */}
      <div className="p-4 bg-green-50">
        <div className="flex gap-2 items-center">
          {/* Icon in a green circle */}
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
            <Image className="w-5 h-5 text-white" />
          </div>
          {/* Section title */}
          <span className="font-medium text-xs">Session Image</span>
        </div>
        {/* Subtitle */}
        <span className="text-xs text-black/60">
          Choose an inspiring image for your wellness session
        </span>
      </div>

      {/* Grid of image options */}
      <div className="grid grid-cols-3 gap-4 bg-white p-4 pt-8">
        {imageOptions.map((image, index) => (
          <div
            key={index}
            className="relative group transition-all duration-500 ease-in-out hover:scale-105"
          >
            {/* Image selection button */}
            <button
              onClick={() => setSelectedImage(index)}
              className={`w-full h-32 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-purple-500 ring-2 ring-purple-200" // Selected styling
                  : "border-gray-200 hover:border-gray-300"     // Default styling
              }`}
            >
              {/* Image preview */}
              <img
                src={image}
                alt={`Option ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>

            {/* Check icon if selected */}
            {selectedImage === index && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionImage;

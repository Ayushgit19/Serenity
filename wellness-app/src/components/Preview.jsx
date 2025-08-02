import React, { useContext } from "react";
import { LuClock } from "react-icons/lu";
import { CheckCircle } from "lucide-react";
import { imageOptions } from "../assets/assets";
import { SessionContext } from "../context/SessionContext";

// Tag styling
const tagStyles = {
  yoga: "bg-purple-200 text-purple-800 border border-purple-700",
  meditation: "bg-blue-200 text-blue-800 border border-blue-700",
  breathing: "bg-green-200 text-green-800 border border-green-700",
  mindfulness: "bg-pink-200 text-pink-800 border border-pink-700",
  beginner: "bg-green-100 text-green-800 border border-green-600",
  intermediate: "bg-yellow-100 text-yellow-800 border border-yellow-600",
  advanced: "bg-red-100 text-red-800 border border-red-600",
};

const Preview = () => {
  const {
    sessionTitle,
    description,
    duration,
    category,
    difficulty,
    selectedImage,
    instructions,
  } = useContext(SessionContext);

  const imageUrl = imageOptions[selectedImage] || "";

  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white">
      {/* Image section */}
      <div className="relative">
        <img src={imageUrl} alt="Session" className="w-full h-40 object-cover" />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {[category, difficulty].map((tag, i) => (
            <span
              key={i}
              className={`text-[10px] px-2 py-[2px] rounded-full shadow-sm capitalize ${
                tagStyles[tag.toLowerCase()] || "bg-gray-200 text-gray-800 border border-gray-400"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold">{sessionTitle || "Session Title"}</h2>
        <p className="text-xs text-gray-600">{description || "Session description goes here."}</p>

        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
          <LuClock className="w-4 h-4" />
          <span>{duration} mins</span>
        </div>

        <hr className="my-2" />

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-gray-700">Instructions</span>
          {instructions.length > 0 ? (
            instructions.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 mt-[2px]" />
                <p className="text-xs text-gray-700">{step.text || "..."}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400">No steps added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;

import React from "react";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const YogaCard = ({
  _id,
  title,
  description,
  duration,
  instructor,
  date,
  tags,
  image,
}) => {
  const tagStyles = {
    yoga: "bg-purple-200 text-purple-800 border border-purple-700",
    meditation: "bg-blue-200 text-blue-800 border border-blue-700",
    breathing: "bg-green-200 text-green-800 border border-green-700",
    mindfulness: "bg-pink-200 text-pink-800 border border-pink-700",
    beginner: "bg-green-100 text-green-800 border border-green-600",
    intermediate: "bg-yellow-100 text-yellow-800 border border-yellow-600",
    advanced: "bg-red-100 text-red-800 border border-red-600",
  };

  const navigate = useNavigate();

  const handleStartClick = () => {
    if (_id) {
      navigate(`/my-published-sessions/${_id}`);
    } else {
      console.error("Session ID is undefined");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
      {/* Image */}

      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
        />

        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-[10px] px-2 py-1 rounded-lg shadow-sm font-semibold ${
                tagStyles[tag] || "bg-gray-200 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="flex flex-col">
          <span className="text-s mb-2">{title}</span>
          <span className="text-xs text-gray-600">{description}</span>
        </div>

        <div className="flex justify-center">
          <hr className="border border-gray-200 my-6 w-[90%]" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center justify-center gap-1">
            <LuClock />
            <span>{duration}</span>
          </div>
          <button
            className="flex items-center justify-between gap-2 px-3 py-1 rounded text-white transition-all duration-200 hover:opacity-90 cursor-pointer shadow-lg"
            style={{
              background:
                "linear-gradient(72deg, rgba(92, 64, 214, 1) 3%, rgba(178, 35, 217, 1) 100%)",
            }}
          >
            <FaPlay className="text-xs" />
            <span onClick={handleStartClick} className="text-sm font-semibold">
              Start
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{instructor}</span>
          <span className="text-[10px] text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default YogaCard;

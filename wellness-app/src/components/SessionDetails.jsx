import React, { useContext } from "react";
import { Sparkles } from "lucide-react";
import { SessionContext } from "../context/SessionContext";

const SessionDetails = () => {
  // Predefined options for categories and difficulty levels
  const categories = [
    "🧘‍♂️ Meditation",
    "🧘 Yoga",
    "🍃 Mindfulness",
    "🌬️ Breathing",
  ];
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const {
    sessionTitle,
    setSessionTitle,
    description,
    setDescription,
    duration,
    setDuration,
    category,
    setCategory,
    difficulty,
    setDifficulty,
  } = useContext(SessionContext);

  return (
    // Card container with rounded edges and shadow
    <div className="rounded-2xl shadow-lg overflow-hidden  w-full ">
      {/* Header section */}
      <div className="mb-3 p-4">
        <div className="flex gap-2 items-center">
          {/* Icon badge */}
          <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-medium text-xs">Session Details</span>
        </div>
        <span className="text-xs text-black/60">
          Provide the essential information about your wellness session
        </span>
      </div>

      {/* Form section */}
      <div className="bg-white p-4 flex flex-col gap-4">
        {/* Title input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium">Session Title</label>
          <input
            type="text"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            placeholder="e.g., Morning Yoga Flow"
            className="bg-gray-100 text-xs p-2 rounded border-2 border-transparent focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Description input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what participants can expect"
            className="bg-gray-100 text-xs p-2 rounded border-2 border-transparent focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Three inputs: Duration, Category, Difficulty */}
        <div className="grid grid-cols-3 gap-4">
          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label htmlFor="number" className="text-xs font-medium">
              Duration (minutes)
            </label>
            <input
              id="number"
              type="number"
              value={duration}
              min={0}
              max={60}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-gray-100 text-xs p-2 rounded"
            />
          </div>

          {/* Category dropdown */}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-xs font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 text-xs p-2 rounded text-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty level dropdown */}
          <div className="flex flex-col gap-1">
            <label htmlFor="difficulty" className="text-xs font-medium">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-100 text-xs p-2 rounded text-black"
            >
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;

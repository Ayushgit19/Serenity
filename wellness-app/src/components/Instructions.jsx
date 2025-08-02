import React, { useContext } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SessionContext } from "../context/SessionContext";

const Instructions = () => {
  const {instructions, setInstructions} = useContext(SessionContext)
  
  const updateStep = (id, newText) => {
    setInstructions(
      instructions.map((step) =>
        step.id === id ? { ...step, text: newText } : step
      )
    );
  };

  const addStep = () => {
    const newStep = {
      id: Date.now(), 
      text: "",
    };
    setInstructions([...instructions, newStep]);
  };

  const deleteStep = (id) => {
    const updated = instructions.filter((step) => step.id !== id);
    setInstructions(updated);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      {/* Header Section */}
      <div className="p-4 bg-orange-50 flex justify-between items-center">
        {/* Left - Title and Subtitle */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-sm">Step-by-Step Instructions</span>
          </div>
          <span className="text-xs text-black/60">
            Break down your session into clear, actionable steps
          </span>
        </div>

        {/* Right - Add Step Button */}
        <button
          onClick={addStep}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Step
        </button>
      </div>

      {/* Steps List */}
      <div className="bg-white p-6">
        {instructions.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2 group mb-4">
            {/* Step Number */}
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-medium">{index + 1}</span>
            </div>

            {/* Step Input */}
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="text"
                  value={step.text}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Describe what participants should do..."
                />
              </div>
            </div>

            {/* Delete Button - shown only on hover if more than 1 step */}
            {instructions.length > 1 && (
              <button
                onClick={() => deleteStep(step.id)}
                className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
                text-red-500 text-xs ml-2 hover:bg-gray-100 
                rounded-full p-2 transition-opacity duration-300 ease-in-out"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;

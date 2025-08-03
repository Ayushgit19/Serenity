import React, { useContext } from "react";
import { Save, Upload } from "lucide-react";
import { SessionContext } from "../context/SessionContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const PublishDraft = () => {
  const {
    sessionTitle,
    description,
    duration,
    category,
    difficulty,
    selectedImage,
    instructions,
    addDraft,
    addSession,
    setSessionTitle,
    setDescription,
    setDuration,
    setCategory,
    setDifficulty,
    setSelectedImage,
    setInstructions,
  } = useContext(SessionContext);



  const clearForm = () => {
    setSessionTitle("");
    setDescription("");
    setDuration("10");
    setCategory("Meditation");
    setDifficulty("Beginner");
    setSelectedImage(0);
    setInstructions([{ id: 1, text: "" }]);
  };

  const handleSaveDraft = () => {
    if (!sessionTitle && !description) {
      toast.error("Please add at least a title or description");
      return;
    }

    addDraft(); 
    toast.success("Session saved as draft");
    clearForm();
  };

  const handlePublish = () => {
    if (
      !sessionTitle ||
      !description ||
      !instructions.length ||
      !instructions[0].text
    ) {
      toast.error("Please complete the session before publishing");
      return;
    }

    addSession();

    toast.success("Session published successfully!");
    clearForm();
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-xl shadow-md">
      <button
        onClick={handleSaveDraft}
        className="flex items-center justify-center gap-1 text-black text-xs font-semibold px-3 py-1 rounded-md transition-all border-2 border-dotted border-gray-400 cursor-pointer hover:bg-gray-200 mb-3"
      >
        <Save className="w-4 h-4" />
        Save as Draft
      </button>

      <button
        onClick={handlePublish}
        className="flex items-center justify-center gap-1 text-white text-xs font-semibold px-3 py-2 rounded-md cursor-pointer hover:opacity-90 bg-gradient-to-r from-[#9090e8] to-[#bc7be8] mb-3 transition-all"
      >
        <Upload className="w-4 h-4" />
        Publish Session
      </button>

      <div className="bg-blue-400/20 flex items-center justify-center p-2 rounded-md border-1 border-blue-400/30">
        <span className="text-xs font-semibold text-blue-600">
          Drafts auto save every 30 seconds
        </span>
      </div>
    </div>
  );
};

export default PublishDraft;

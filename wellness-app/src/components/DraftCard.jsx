import React, { useContext } from "react";
import { Clock, Edit, Upload } from "lucide-react";
import { SessionContext } from "../context/SessionContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DraftCard = ({ draft }) => {
  const navigate = useNavigate();
  const {
    setSessionTitle,
    setDescription,
    setDuration,
    setCategory,
    setDifficulty,
    setSelectedImage,
    setInstructions,
    addSession,
    deleteDraft,
  } = useContext(SessionContext);

  // Format the last edited date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Load draft into session context for editing
  const handleEdit = () => {
    toast.success("Redirecting to edit draft...");
    navigate(`/edit-draft/${draft._id}`);
  };

  // Publish the draft
  const handlePublish = () => {
    if (!draft.title || !draft.description || !draft.instructions?.length) {
      toast.error("Please complete the session before publishing");
      return;
    }

    const sessionData = {
      title: draft.title,
      description: draft.description,
      duration: draft.duration,
      category: draft.category,
      difficulty: draft.difficulty,
      selectedImage: draft.selectedImage,
      instructions: draft.instructions,
      lastEdited: Date.now(),
    };

    addSession(sessionData);
    deleteDraft(draft._id);
    toast.success("Session published successfully!");
  };

  // Get display tags based on category and difficulty
  const getDisplayTags = () => {
    const tags = [];
    if (draft.category) {
      tags.push({
        text: draft.category.toLowerCase(),
        color: "bg-blue-100 text-blue-700",
      });
    }
    if (draft.difficulty) {
      tags.push({
        text: draft.difficulty.toLowerCase(),
        color: "bg-green-100 text-green-700",
      });
    }
    return tags;
  };

  const displayTags = getDisplayTags();

  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Header with title and draft badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {draft.title || "Untitled"}
            </h3>
            <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-md">
              Draft
            </span>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {draft.description || "No description"}
          </p>
        </div>
      </div>

      {/* Tags */}
      {displayTags.length > 0 && (
        <div className="flex gap-2 mb-4">
          {displayTags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs font-medium px-2 py-1 rounded-md ${tag.color}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}

      {/* Duration */}
      <div className="flex items-center gap-1 text-gray-500 mb-4">
        <Clock className="w-3 h-3" />
        <span className="text-xs">{draft.duration || "10"} min</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-1 text-purple-700 text-xs font-medium px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
        >
          <Edit className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={handlePublish}
          className="flex-1 flex items-center justify-center gap-1 text-white text-xs font-medium px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
        >
          <Upload className="w-3 h-3" />
          Publish
        </button>
      </div>

      {/* Last edited */}
      <div className="text-center">
        <p className="text-gray-400 text-xs">
          Last edited: {formatDate(draft.lastEdited || Date.now())}
        </p>
      </div>
    </div>
  );
};

export default DraftCard;

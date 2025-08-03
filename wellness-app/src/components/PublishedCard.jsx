import React, { useContext } from "react";
import { Clock, Edit, Trash2, Play } from "lucide-react";
import { SessionContext } from "../context/SessionContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PublishedCard = ({ session }) => {
  const navigate = useNavigate();
  const { editSession, deleteSession } = useContext(SessionContext);

  const handleEdit = () => {
    toast.success("Redirecting to edit draft...");
    navigate(`/edit-draft/${session._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      deleteSession(session._id); 
      toast.success("Session deleted successfully");
    }
  };

  const getDisplayTags = () => {
    const tags = [];
    if (session.category) {
      tags.push({
        text: session.category.toLowerCase(),
        color: "bg-blue-100 text-blue-700",
      });
    }
    if (session.difficulty) {
      tags.push({
        text: session.difficulty.toLowerCase(),
        color: "bg-green-100 text-green-700",
      });
    }
    return tags;
  };

  const displayTags = getDisplayTags();

  const formatDate = (dateString) => {
    if (!dateString) return "Today";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Today";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {session.title || "Untitled"}
            </h3>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-md">
              Published
            </span>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {session.description || "No description"}
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
        <span className="text-xs">{session.duration || "10"} min</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-1 text-purple-700 text-xs font-medium px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
        >
          <Edit className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 text-red-700 text-xs font-medium px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
        <button
          className="flex items-center justify-center gap-1 text-white text-xs font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Play className="w-3 h-3" />
          Start
        </button>
      </div>

      {/* Published Date */}
      <div className="text-center">
        <p className="text-gray-400 text-xs">
          Published: {formatDate(session.publishedDate)}
        </p>
      </div>
    </div>
  );
};

export default PublishedCard;

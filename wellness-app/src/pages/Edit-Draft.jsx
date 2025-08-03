import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ required for useParams
import axios from "axios"; // ✅ required for axios
import toast from "react-hot-toast"; // ✅ required for toast notifications

import { AppContext } from "../context/AppContext";
import { SessionContext } from "../context/SessionContext";
import CreateSession from "./CreateSession"; // ✅ Make sure the path is correct

const EditDraftPage = () => {
  const {
    setSessionTitle,
    setDescription,
    setDuration,
    setCategory,
    setDifficulty,
    setSelectedImage,
    setInstructions,
    setSessionId,
  } = useContext(SessionContext);

  const { backendUrl } = useContext(AppContext);
  const { id: draftId } = useParams(); // /session/draft/:id → { id }

  useEffect(() => {
    const loadDraft = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/my-sessions/${draftId}`);
        if (res.data.success) {
          const draft = res.data.session;

          setSessionTitle(draft.title || "");
          setDescription(draft.description || "");
          setDuration(draft.duration || "10");
          setCategory(draft.category || "Meditation");
          setDifficulty(draft.difficulty || "Beginner");
          setSelectedImage(draft.selectedImage || 0);
          setInstructions(draft.instructions || [{ id: 1, text: "" }]);
          setSessionId(draft._id);
        } else {
          toast.error("Draft not found");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    loadDraft();
  }, [draftId]);

  return <CreateSession />;
};

export default EditDraftPage;

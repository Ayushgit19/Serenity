import React, { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("10");
  const [category, setCategory] = useState("Meditation");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [selectedImage, setSelectedImage] = useState(0);
  const [instructions, setInstructions] = useState([{ id: 1, text: "" }]);

  const [userSessions, setUserSessions] = useState([]);

  // ✅ Load drafts from localStorage
  const [drafts, setDrafts] = useState(() => {
    const savedDrafts = localStorage.getItem("drafts");
    return savedDrafts ? JSON.parse(savedDrafts) : [];
  });

  // ✅ Save drafts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  // ✅ Add a session
  const addSession = (session) => {
    const sessionWithId = { ...session, id: Date.now() };
    setUserSessions((prev) => [...prev, sessionWithId]);
  };

  // ✅ Add a draft with ID
  const addDraft = (draft) => {
    const draftWithId = { ...draft, id: Date.now() };
    setDrafts((prev) => [...prev, draftWithId]);
  };

  // ✅ Delete draft by ID
  const deleteDraft = (id) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <SessionContext.Provider
      value={{
        sessionTitle, setSessionTitle,
        description, setDescription,
        duration, setDuration,
        category, setCategory,
        difficulty, setDifficulty,
        selectedImage, setSelectedImage,
        instructions, setInstructions,
        userSessions, addSession,
        drafts, addDraft, deleteDraft,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

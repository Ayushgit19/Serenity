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

  // Use in-memory storage for drafts and sessions
  const [drafts, setDrafts] = useState([]);
  const [userSessions, setUserSessions] = useState([]);

  // Add a published session
  const addSession = (session) => {
    const sessionWithId = { 
      ...session, 
      id: Date.now(),
      publishedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isPublished: true
    };
    setUserSessions((prev) => [...prev, sessionWithId]);
  };

  // Add a draft with ID
  const addDraft = (draft) => {
    const draftWithId = { ...draft, id: Date.now() };
    setDrafts((prev) => [...prev, draftWithId]);
  };

  // Delete draft by ID
  const deleteDraft = (id) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  // Delete published session by ID
  const deleteSession = (id) => {
    setUserSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Edit published session (convert back to draft)
  const editSession = (session) => {
    // Load session data into context for editing
    setSessionTitle(session.title || "");
    setDescription(session.description || "");
    setDuration(session.duration || "10");
    setCategory(session.category || "Meditation");
    setDifficulty(session.difficulty || "Beginner");
    setSelectedImage(session.selectedImage || 0);
    setInstructions(session.instructions || [{ id: 1, text: "" }]);
    
    // Remove from published sessions
    deleteSession(session.id);
    
    // Add as draft
    const draftData = {
      title: session.title,
      description: session.description,
      duration: session.duration,
      category: session.category,
      difficulty: session.difficulty,
      selectedImage: session.selectedImage,
      instructions: session.instructions,
      lastEdited: Date.now(),
    };
    addDraft(draftData);
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
        userSessions, addSession, deleteSession, editSession,
        drafts, addDraft, deleteDraft,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
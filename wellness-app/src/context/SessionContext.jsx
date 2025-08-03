import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "./AppContext";

axios.defaults.withCredentials = true;

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { backendUrl, isLogggedIn } = useContext(AppContext);

  const [sessionTitle, setSessionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("10");
  const [category, setCategory] = useState("Meditation");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [selectedImage, setSelectedImage] = useState(0);
  const [instructions, setInstructions] = useState([{ id: 1, text: "" }]);

  const [drafts, setDrafts] = useState([]);
  const [userSessions, setUserSessions] = useState([]);

  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    if (isLogggedIn) {
      fetchDrafts();
      fetchUserSessions();
    }
  }, [isLogggedIn]);

  const fetchDrafts = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/my-sessions?type=draft"
      );
      setDrafts(data.sessions || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserSessions = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/my-sessions?type=published"
      );
      setUserSessions(data.sessions || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addDraft = async () => {
    try {
      const data = {
        sessionId, // for updating if exists
        title: sessionTitle,
        description,
        duration,
        category,
        difficulty,
        selectedImage,
        instructions,
      };

      await axios.post(`${backendUrl}/api/my-sessions/save-draft`, data);
      fetchDrafts();
      setSessionId(null);
    } catch (error) {
      console.log("Error saving draft", error);
      toast.error(error.message);
    }
  };

  const addSession = async (sessionData = null) => {
    const data = sessionData || {
      sessionId,
      title: sessionTitle,
      description,
      duration,
      category,
      difficulty,
      selectedImage,
      instructions,
    };

    try {
      await axios.post(`${backendUrl}/api/my-sessions/publish`, data);
      fetchUserSessions();
      setSessionId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteDraft = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/my-sessions/${id}`);
      fetchDrafts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSession = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/my-sessions/${id}`);
      fetchUserSessions();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editSession = (session) => {
    setSessionTitle(session.title || "");
    setDescription(session.description || "");
    setDuration(session.duration || "10");
    setCategory(session.category || "Meditation");
    setDifficulty(session.difficulty || "Beginner");
    setSelectedImage(session.selectedImage || 0);
    setInstructions(session.instructions || [{ id: 1, text: "" }]);
  };

  return (
    <SessionContext.Provider
      value={{
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
        selectedImage,
        setSelectedImage,
        instructions,
        setInstructions,
        userSessions,
        fetchUserSessions,
        addSession,
        deleteSession,
        editSession,
        drafts,
        fetchDrafts,
        addDraft,
        deleteDraft,
        sessionId,
        setSessionId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

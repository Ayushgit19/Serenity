import Session from "../models/Session.js";

// 1. Get all published sessions (public)
export const getAllPublishedSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).populate("user_id", "name");

    return res.json({ success: true, sessions })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch sessions" });
  }
}

// 2. Get logged-in user's sessions
export const getUserSessions = async (req, res) => {
  try {
    const { type } = req.query; // can be "published" or "draft"
    const filter = { user_id: req.body.userId };

    if (type === "draft") {
      filter.status = "draft";
    } else if (type === "published") {
      filter.status = "published";
    }

    const sessions = await Session.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user sessions" });
  }
};

// 3. Get one session by ID
export const getSingleSession = async (req, res) => {
  try {
    const session = await Session.findOne({_id: req.params.id});
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching session" });
  }
};

// 4. Save or update draft
export const saveDraft = async (req, res) => {
  try {
    const {
      sessionId,
      title,
      description,
      duration,
      category,
      difficulty,
      selectedImage,
      instructions,
    } = req.body;

    const user_id = req.body.userId;

    let session;
    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id },
        {
          title,
          description,
          duration,
          category,
          difficulty,
          selectedImage,
          instructions,
          status: "draft",
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id,
        title,
        description,
        duration,
        category,
        difficulty,
        selectedImage,
        instructions,
        status: "draft",
      });
    }

    res.json({ success: true, session });
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ success: false, message: "Failed to save draft" });
  }
};


// 5. Publish session
export const publishSession = async (req, res) => {
  try {
    const {
      sessionId,
      title,
      description,
      duration,
      category,
      difficulty,
      selectedImage,
      instructions,
    } = req.body;

    const user_id = req.body.userId;

    let session;
    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id },
        {
          title,
          description,
          duration,
          category,
          difficulty,
          selectedImage,
          instructions,
          status: "published",
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id,
        title,
        description,
        duration,
        category,
        difficulty,
        selectedImage,
        instructions,
        status: "published",
      });
    }

    res.json({ success: true, session });
  } catch (err) {
    console.error("Error publishing session:", err);
    res.status(500).json({ success: false, message: "Failed to publish session" });
  }
};


// 6. Delete Session
export const deleteSession = async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.body.userId;

  try {
    const session = await Session.findOne({ _id: sessionId, user_id: userId });

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: "Failed to delete session" });
  }
};

export const getPublishedSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, status: "published" });
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
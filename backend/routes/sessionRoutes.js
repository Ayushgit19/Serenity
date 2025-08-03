// routes/sessionRoutes.js
import express from "express";
import {
  getAllPublishedSessions,
  getUserSessions,
  getSingleSession,
  saveDraft,
  publishSession,
  deleteSession,
} from "../controllers/sessionController.js";
import userAuth from '../middleware/userAuth.js';

const sessionRouter = express.Router();

sessionRouter.get("/sessions", getAllPublishedSessions);
sessionRouter.get("/my-sessions", userAuth, getUserSessions);
sessionRouter.get("/my-sessions/:id", userAuth, getSingleSession);
sessionRouter.post("/my-sessions/save-draft", userAuth, saveDraft);
sessionRouter.post("/my-sessions/publish", userAuth, publishSession);
sessionRouter.delete("/my-sessions/:id", userAuth, deleteSession);

export default sessionRouter;

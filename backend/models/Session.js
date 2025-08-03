import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "10",
    },
    category: {
      type: String,
      default: "Meditation",
    },
    difficulty: {
      type: String,
      default: "Beginner",
    },
    selectedImage: {
      type: Number,
      default: 0,
    },
    instructions: {
      type: [{ id: Number, text: String }],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;

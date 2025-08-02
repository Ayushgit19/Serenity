import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    json_file_url: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
}, { timestamps: true })

const Session = mongoose.model('Session', sessionSchema);

export default Session;
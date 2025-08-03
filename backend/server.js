import express, { json } from "express";
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();  // Wait for DB connection before continuing
    const allowedOrigins = ["http://localhost:5173"]
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors({
      origin: allowedOrigins, // frontend URL
      credentials: true
    }));

    // API endpoints
    app.get('/', (req, res) => res.send("Backend is running on port 3000"))
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api', sessionRouter)


    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  }
  catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1); // Exit process to signal failure
  }
}

startServer();
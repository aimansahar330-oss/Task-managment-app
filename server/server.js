import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { trusted } from "mongoose";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);


// DB + server start
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(" DB Connection Failed:", error);
  }
};
console.log("SERVER STARTED");
console.log("AUTH ROUTES LOADED");


startServer();
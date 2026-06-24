import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../server/config/db.js";
import authRoutes from "../server/routes/authRoutes.js";
import taskRoutes from "../server/routes/taskRoutes.js";
import userRoutes from "../server/routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ❗ IMPORTANT: /api remove
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// DB connection (serverless safe)
let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

// ✅ Vercel handler
export default async function handler(req, res) {
  await connectToDB();
  return app(req, res);
}
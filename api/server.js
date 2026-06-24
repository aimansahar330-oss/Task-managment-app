import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import connectDB from "../server/config/db.js";
import authRoutes from "../server/routes/authRoutes.js";
import taskRoutes from "../server/routes/taskRoutes.js";
import userRoutes from "../server/routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);

// health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// DB connection
let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing ❌");
  }

  await connectDB();
  isConnected = true;

  console.log("MongoDB Connected ✅");
};

// ✅ FINAL EXPORT (ONLY ONE HANDLER)
export default async function (req, res) {
  await connectToDB();

  const handler = serverless(app);
  return handler(req, res);
}
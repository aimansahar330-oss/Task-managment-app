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

// ❗ NO /api here
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

let isConnected = false;

const connectToDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing ❌");
    }

    await connectDB();
    console.log("MongoDB Connected ✅");

  } catch (err) {
    console.log("Mongo Error ❌", err.message);
    throw err; // 👈 important for logs
  }
};
const handler = serverless(app);

export default async function handler(req, res) {
  await connectToDB();
  return app(req, res);
}
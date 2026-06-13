import express from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/tasksController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.delete("/:id", protect, deleteTask);
router.put("/:id", protect,  updateTask)


export default router;
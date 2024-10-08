import express from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskBusiness } from "../business/TaskBusiness";
import { TaskDatabase } from "../database/TaskDatabase";

export const tasks = express.Router();

const taskController = new TaskController(new TaskBusiness(new TaskDatabase()));

tasks.get("/", taskController.getTasks);
tasks.post("/", taskController.createTask);
tasks.put("/:id", taskController.updateTask);
tasks.delete("/:id", taskController.deleteTask);
tasks.get("/:id", taskController.getTaskById);

// userRouter.get("/:id", userController.getUserById);

// userRouter.delete("/:id", userController.deleteUser

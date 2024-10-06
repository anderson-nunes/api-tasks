import express from "express";
import { UserController } from "../controllers/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";

export const users = express.Router();

const userController = new UserController(new UserBusiness(new UserDatabase()));

users.get("/", userController.getUsers);
// userRouter.get("/:id", userController.getUserById);

users.post("/signup", userController.signup);
users.post("/login", userController.login);
// userRouter.delete("/:id", userController.deleteUser

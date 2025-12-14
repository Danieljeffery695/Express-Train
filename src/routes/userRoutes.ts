import { Router } from "express";
import { createUser, getCurrentUser } from "../Controllers/UsersController";
import signUpAuth from "../middlewares/signUp_middleware";
import loginAuth from "../middlewares/login_middleware";
import { protectRoutes } from "../Controllers/AuthController";

const userRouter = Router();

userRouter.post("/signup", protectRoutes, signUpAuth, createUser);

userRouter.post("/login", protectRoutes, loginAuth, getCurrentUser);

export default userRouter;

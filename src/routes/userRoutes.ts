import { Router } from "express";
import { createUser, getCurrentUser } from "../Controllers/UsersController";
import signUpAuth from "../middlewares/signUp_middleware";
import loginAuth from "../middlewares/login_middleware";

const userRouter = Router();

userRouter.post("/signup", signUpAuth, createUser);

userRouter.post("/login", loginAuth, getCurrentUser);

export default userRouter;

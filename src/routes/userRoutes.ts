import { Router } from "express";
import {
	createUser,
	forgetPassword,
	getCurrentUser,
} from "../Controllers/UsersController";
import {
	forgotPasswordAuth,
	loginAuth,
	signUpAuth,
} from "../middlewares/user_middleware";

const userRouter = Router();

userRouter.post("/signup", signUpAuth, createUser);

userRouter.post("/login", loginAuth, getCurrentUser);

userRouter
	.post("/forget-password", forgotPasswordAuth, forgetPassword)
	.patch("/forget-password/:token", forgotPasswordAuth, forgetPassword);

export default userRouter;

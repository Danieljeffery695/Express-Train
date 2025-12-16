import { Router } from "express";
import { createUser, getCurrentUser, forgetPassword } from "../Controllers/UsersController";
import { signUpAuth, loginAuth, forgotPasswordAuth } from "../middlewares/user_middleware";

const userRouter = Router();

userRouter.post("/signup", signUpAuth, createUser);

userRouter.post("/login", loginAuth, getCurrentUser);

userRouter.post("/forget-password", forgotPasswordAuth, forgetPassword);


export default userRouter;

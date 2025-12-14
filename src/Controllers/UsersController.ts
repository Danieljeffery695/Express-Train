import type { Request, Response } from "express";
import Users from "../Models/Users";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { handleAsyncErr } from "../Utils/AsyncError";
import {publicIp} from 'public-ip';


const createToken = (id: Types.ObjectId) => {
	if(process.env.JWT_SECRET && process.env.JWT_EXPIRE_DATE) {
			// The VAR keyword was use here to make sure the variable can be used outside the if/else blocks
			var jwtSecret: string | object = process.env.JWT_SECRET;
			var jwtDate: number | string = process.env.JWT_EXPIRE_DATE;
			var signupToken = jwt.sign({id}, jwtSecret, {
				expiresIn: +jwtDate
			});
			return signupToken;
		} else {
			throw new Error("Server error, something went wrong on our side. get back to you");
	}
}

export const createUser = handleAsyncErr(async (req: Request, res: Response) => {
		//This locals data is accessible everywhere across all chained request sent to the same endpoints
		const ipAddress = await publicIp(); // Tries IPv6 first, falls back to IPv4

		const [
			name,
			phone,
			email,
			password,
			passwordConfirm,
			phoneNumberRegion,
		]: Array<string> = res.locals.signUpData;
		const newUser = await Users.create({
			name,
			email,
			phone,
			phoneNumberRegion,
			password,
			passwordConfirm,
			ipAddress,
		});

		const signupToken: string | Types.ObjectId = createToken(newUser._id);

		res.status(201).json({
			Status: "success",
			auth: signupToken,
			data: newUser,
		});
		return;
});

export const getCurrentUser = handleAsyncErr(async(req: Request, res: Response) => {
		const [email, password]: Array<string> = res.locals.loginData;
		const findUser = await Users.findOne({
			email,
		}).select("+password");

		if (
			!findUser ||
			!(await findUser.compareLoginPassword(password, findUser.password))
		) {
			throw new Error("Wrong Info. no such user found");
		}

		const signupToken: string | Types.ObjectId = createToken(findUser._id);

		res.status(201).json({
			auth: signupToken,
			data: findUser,
		});
		return;
	});
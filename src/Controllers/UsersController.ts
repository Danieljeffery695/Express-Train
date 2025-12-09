import type { Request, Response } from "express";
import Users from "../Models/Users";

export const createUser = async (req: Request, res: Response) => {
	try {
		//This locals data is accessible everywhere across all chained request sent to the same endpoints
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
		});

		res.status(200).json({
			Status: "success",
			data: newUser,
		});
		return;
	} catch (error) {
		console.log(error);
		res.status(404).json({
			Status: "failed",
			data: error,
		});
		return;
	}
};

export async function getCurrentUser(req: Request, res: Response) {
	try {
		const [email, password]: Array<string> = res.locals.loginData;
		const findUser = await Users.findOne({
			email,
		}).select("+password");

		if (
			!findUser ||
			!(await findUser.compareLoginPassword(password, findUser.password))
		) {
			res
				.status(404)
				.json({ status: "failed", message: "No user with such Info" });
			return;
		}
		res.status(200).json({
			data: findUser,
		});
		return;
	} catch (error) {
		//Adding any as the type works in development but it would be advisable to make some adjustment for important error incoming
		console.log(error);
		res.status(500).json({
			status: "failed",
			message: "Server error",
		});
		console.log(error);
		return;
	}
}

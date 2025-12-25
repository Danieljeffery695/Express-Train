import type { NextFunction, Request, Response } from "express";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import validator from "validator";
import { CheckBool } from "../Controllers/CheckBool";
import catchError from "../Utils/CatchError";
import type { BodyCasting } from "../Utils/DataChecking";
import { verifyForgetPasswordToken } from "../Utils/TokenHashing";

export const loginAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.body) throw new Error("Sorry missing something");

		const { email, password }: BodyCasting = req.body;

		// This is unnecessary because this error checking will be handled on the frontend but it's better to be on the safe side. leave it this way.
		if (!email || !password)
			throw new Error("Sorry you can't leave any field empty");

		// Turning all input data to lowercase and Filtering Signs and symbols

		const arrLow: Array<string> = [email, password].map((e) =>
			e.toLowerCase().replace(/[^a-zA-Z0-9@.]/g, ""),
		);

		const check2 = validator.isEmail(email)
			? { errorState: true }
			: { errorState: false, errorMessage: "Sorry, Not a valid Email Address" };

		const { errState, errMsg } = CheckBool(check2);
		if (!errState) throw new Error(`Login-Msg: ${errMsg}`);
		res.locals.loginData = arrLow;
	} catch (error: any) {
		// Adding any as the type works in development but it would be advisable to make some adjustment for important error incoming
		catchError(error, error.message, 400, next);
		return;
	}

	next();
};

export const signUpAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.body) throw new Error("Sorry missing something");
		const { name, email, phone, password, passwordConfirm }: BodyCasting =
			req.body;

		// This is unnecessary because this error checking will be handled on the frontend but it's better to be on the safe side. leave it this way.
		if (!name || !email || !phone || !password || !passwordConfirm)
			throw new Error("Sorry you can't leave any field empty");

		// Turning all input data to lowercase and Filtering Signs and symbols

		const arrLow: Array<string> = [
			name,
			phone,
			email,
			password,
			passwordConfirm,
		].map((e) => e.toLowerCase().replace(/[^a-zA-Z0-9@.]/g, ""));

		// Phone number verification
		const phoneNumber = parsePhoneNumberWithError(phone); //Require international numbers so add + follow by the code of your region example +1, +44
		phoneNumber.isValid();
		console.log(phoneNumber);
		if (phoneNumber.country) arrLow.push(phoneNumber.country);

		// Email verification
		const check2 = validator.isEmail(email)
			? { errorState: true }
			: { errorState: false, errorMessage: "Sorry, Not a valid Email Address" };
		const { errState, errMsg } = CheckBool(check2);
		if (!errState) throw new Error(`Login-Msg: ${errMsg}`);

		res.locals.signUpData = arrLow;
		// Extra validation to be done but leave it for error handling.
		// Check if the current number or email already exits in the database.
		// But i won't because the field will be subjected to uniques values and so an error would erupt if another kind of same value occur.
	} catch (error: any) {
		catchError(error, error.message, 400, next);
		return;
	}

	next();
};

export const forgotPasswordAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (req.method === "POST") {
			if (!req.body) throw new Error("Sorry missing something");

			const { email }: BodyCasting = req.body;

			// This is unnecessary because this error checking will be handled on the frontend but it's better to be on the safe side. leave it this way.
			if (!email) throw new Error("Sorry you can't leave any field empty");

			// Turning all input data to lowercase and Filtering Signs and symbols

			const arrLow: Array<string> = [email].map((e) =>
				e.toLowerCase().replace(/[^a-zA-Z0-9@.]/g, ""),
			);

			const check2 = validator.isEmail(email)
				? { errorState: true }
				: {
						errorState: false,
						errorMessage: "Sorry, Not a valid Email Address",
					};

			const { errState, errMsg } = CheckBool(check2);
			if (!errState) throw new Error(`Forgot-Password-Msg: ${errMsg}`);
			res.locals.forgotPasswordData = arrLow;
		} else if (req.method === "PATCH") {
			if (!req.session.resetToken || !req.body)
				throw new Error("Sorry missing something");
			const { newPassword, newConfirmPassword } = req.body;

			const paramToken = req.params.token;
			const { resetPasswordTokenExpires, saltToken, id, resetUrl } =
				req.session.resetToken;
			const check3 =
				resetPasswordTokenExpires < new Date()
					? { errorState: false, errorMessage: "Token Expires" }
					: { errorState: true };
			const check4 =
				verifyForgetPasswordToken(id, saltToken, paramToken) === false
					? { errorState: false, errorMessage: "Token not correct" }
					: { errorState: true };
			const check5 =
				newPassword !== newConfirmPassword
					? { errorState: false, errorMessage: "Passwords does not match" }
					: { errorState: true };
			const { errState, errMsg } = CheckBool(check3, check4, check5);
			if (!errState) throw new Error(`Error1: ${errMsg}`);
			// if(resetUrl !== req.get("Referrer")) throw new Error("Not authorize to access this page"); this is for production or after the frontend is ready

			const arrLow: Array<string> = [newPassword].map((e) =>
				e.toLowerCase().replace(/[^a-zA-Z0-9@.]/g, ""),
			);
			res.locals.newPasswordData = arrLow;
		} else {
			throw new Error("Something went wrong. please follow normal routes");
		}
	} catch (error: any) {
		// Adding any as the type works in development but it would be advisable to make some adjustment for important error incoming
		catchError(error, error.message, 400, next);
		return;
	}

	next();
};
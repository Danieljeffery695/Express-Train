import type { NextFunction, Request, Response } from "express";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import validator from "validator";
import { CheckBool } from "../Controllers/CheckBool";
import catchError from "../Utils/CatchError";
import type { BodyCasting } from "../Utils/DataChecking";

const signUpAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
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

export default signUpAuth;

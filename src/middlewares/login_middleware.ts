import type { NextFunction, Request, Response } from "express";
import validator from "validator";
import { CheckBool } from "../Controllers/CheckBool";
import catchError from "../Utils/CatchError";
import type { BodyCasting } from "../Utils/DataChecking";

const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
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
	} catch (error: any) { // Adding any as the type works in development but it would be advisable to make some adjustment for important error incoming
		catchError(error, error.message, 400, next);
		return;
	}

	next();
};

export default loginAuth;

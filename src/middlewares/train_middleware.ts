import type { ICity, ICountry, IState } from "country-state-city";
import { City, Country, State } from "country-state-city"; //use later to get corresponding country, state, city, with the getcountrybycode or name
import type { NextFunction, Request, Response } from "express";
import { CheckBool } from "../Controllers/CheckBool";
import catchError from "../Utils/CatchError";

export function create_Train_Auth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		if (!req.body) throw new Error("Something missing");
		const {
			name,
			number,
			train_Types,
			station_name,
			code,
			city,
			state,
			country,
			seatCount,
		} = req.body;
		if (
			!name ||
			!number ||
			!train_Types ||
			!station_name ||
			!code ||
			!city ||
			!state ||
			!country ||
			!seatCount
		)
			throw new Error("Sorry you can't leave any field empty");
		// Minimizing the seatCount to below 300 sound reasonable at least.

		// Checking if country, state and city exist on global standard.
		const globalCountry: ICountry[] = Country.getAllCountries();
		const check1 = globalCountry.some((ele) => ele.name === country)
			? { errorState: true }
			: { errorState: false, errorMessage: "Sorry, Not a valid Country." };

		const globalCity: ICity[] = City.getAllCities();
		const check2 = globalCity.some((ele) => ele.name === city)
			? { errorState: true }
			: { errorState: false, errorMessage: "Sorry, Not a valid City." };

		const globalState: IState[] = State.getAllStates();
		const check3 = globalState.some((ele) => ele.name === state)
			? { errorState: true }
			: {
					errorState: false,
					errorMessage: "Sorry, Not a valid Country State.",
				};

		const arrLow: Array<string> = [
			name,
			number,
			train_Types,
			station_name,
			code,
			city,
			state,
			country,
			seatCount,
		].map((e) => e.toLowerCase().replace(/[^a-zA-Z0-9@.]/g, ""));
		const { errState, errMsg } = CheckBool(check1, check2, check3);
		if (!errState) throw new Error(`Wrong-Country-Msg: ${errMsg}`);
		res.locals.createTrainData = arrLow;
	} catch (error: any) {
		catchError(error, error.message, 400, next);
		return;
	}

	next();
}

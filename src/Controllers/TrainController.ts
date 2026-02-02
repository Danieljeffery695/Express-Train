import type { NextFunction, Request, Response } from "express";
import type { Types } from "mongoose";
import TrainCoach from "../Models/Coaches";
import TrainStation from "../Models/Stations";
import TrainRoute from "../Models/TrainRoute";
import Trains from "../Models/Trains";
import { handleAsyncErr } from "../Utils/AsyncError";
import type {
	ITrainCoach,
	ITrainRouteCreate,
	ITrainStation,
} from "../Utils/DataChecking";

export const createTrain = handleAsyncErr(
	async (req: Request, res: Response, _next: NextFunction) => {
		const [
			name,
			number,
			train_Types,
			station_name,
			code,
			city,
			state,
			country,
			seatCount,
		]: Array<string> = res.locals.createTrainData;
		const newTrain = await Trains.create({
			name,
			number,
			train_Types,
		});

		const station_id = await createStation({
			station_name,
			code,
			city,
			state,
			country,
		});
		const trainRoute_id = await createRoute(newTrain._id, station_id);
		newTrain.route = trainRoute_id;
		await newTrain.save();
		const trainCoach_id = await createCoach(newTrain._id, +seatCount);
		newTrain.coaches = trainCoach_id;
		await newTrain.save();

		res.status(201).json({
			Status: "success",
			data: newTrain,
		});
		return;
	},
);

export const createCoach = async (
	param1: Types.ObjectId,
	seatCount: number,
) => {
	const newCoach = await TrainCoach.create({
		train: param1,
		coachType: "Business",
		seatCount,
	});

	return newCoach._id;
};

export const createRoute = async (
	param1: Types.ObjectId,
	param2: Types.ObjectId,
) => {
	const newRoute = await TrainRoute.create({
		train: param1,
		from: param2,
		to: param2,
		stops: param2,
	});

	return newRoute._id;
};

export const createStation = async (data: ITrainStation) => {
	const newStation = await TrainStation.create(data);

	return newStation._id;
};

type SearchFilter<T> = Partial<Record<keyof T, unknown>>;

export const buildFilter = <T>(obj: SearchFilter<T>) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_k, v]) => v !== undefined && v !== ""),
	);
};

export const getAllTrain = handleAsyncErr(
	async (req: Request, res: Response): Promise<void> => {
		const userId = req.cookies;
		const currentDate_now = new Date();
		const twelveDaysbehindDate = currentDate_now.setDate(
			currentDate_now.getDate() - 12,
		);
		const { name, trainType: train_Types, coachType, seatCount } = req.query;
		console.log(name, train_Types, coachType, seatCount);
		let allTrains: Object | undefined | null;
		if (userId.access_token[0].access_token) {
			allTrains = await Trains.find(buildFilter({ name, train_Types }))
				.populate<ITrainRouteCreate>("route")
				.populate<ITrainCoach>({
					path: "coaches",
					match: buildFilter({ coachType, seatCount }),
				});
		} else {

			allTrains = await Trains.find(
				{ createdAt: { $gte: twelveDaysbehindDate } },
				buildFilter({ name, train_Types }),
			)
				.populate<ITrainRouteCreate>("route")
				.populate<ITrainCoach>({
					path: "coaches",
					match: buildFilter({ coachType, seatCount }),
				});
		}
		const objFilter = Object.entries(allTrains).filter(
			([_k, v]) => v.coaches !== null && v.coaches !== "",
		);

		res.status(200).json({
			result: objFilter.length,
			something: objFilter,
		});
		return;
	},
);

export const updateTrain = handleAsyncErr( async (req: Request, res: Response): Promise<void> => {
	// so..i will create a function to update many train documents at once...but i will start with update one
	// so i will probably get an identity to track which train to update. obviously i will track specific train with their _id
	// sent thought a proper route..maybe not the body but i will think of it.
});

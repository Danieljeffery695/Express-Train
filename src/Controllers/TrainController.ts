import type { NextFunction, Request, Response } from "express";
import type { Types } from "mongoose";
import TrainCoach from "../Models/Coaches";
import TrainStation from "../Models/Stations";
import TrainRoute from "../Models/TrainRoute";
import Trains from "../Models/Trains";
import { handleAsyncErr } from "../Utils/AsyncError";
import type { ITrainStation, ITrainCreate } from "../Utils/DataChecking";

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

export const getAllTrain = handleAsyncErr(
	async (req: Request, res: Response) => {
		const userId = req.cookies;
		const currentDate_now = new Date();
		const twelveDaysbehindDate = currentDate_now.setDate(
			currentDate_now.getDate() - 12,
		);
		let allTrains: Object;
		if (userId.access_token.access_token) {
			allTrains = await Trains.find().populate("route").populate("coaches");
		} else {
			allTrains = await Trains.find({
				createdAt: { $gte: twelveDaysbehindDate },
			});
		}
		res.status(200).json({
			something: allTrains,
		});
		return;
	},
);

import mongoose, { Schema } from "mongoose";
import type { ITrainSchedule } from "../Utils/DataChecking";

const trainSchedule = new mongoose.Schema<ITrainSchedule>(
	{
		train: {
			type: Schema.Types.ObjectId,
			ref: "Trains",
		},
		date: {
			type: Date,
		},

		departureTime: {
			type: String,
		},

		arrivalTime: {
			type: String,
		},

		status: {
			type: String,
			enums: ["ON_TIME", "DELAYED", "CANCELED"],
			default: "ON_TIME",
		},
	},
	{
		timestamps: true,
	},
);

const TrainSchedule = mongoose.model<ITrainSchedule>("Schedule", trainSchedule);

export default TrainSchedule;

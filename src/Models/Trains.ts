import mongoose, { Schema } from "mongoose";
import type { ITrainCreate } from "../Utils/DataChecking";

const trainSchema = new mongoose.Schema<ITrainCreate>(
	{
		name: {
			type: String,
			unique: true,
			required: [true, "name is required"],
		},

		number: {
			type: String,
			unique: true,
			required: [true, "number is required"],
		},

		train_Types: {
			type: String,
		},

		coaches: {
			type: Schema.Types.ObjectId,
			ref: "Coach",
		},

		route: {
			type: Schema.Types.ObjectId,
			ref: "Route",
		},
	},
	{
		timestamps: true,
	},
);

const Trains = mongoose.model<ITrainCreate>("Trains", trainSchema);

export default Trains;

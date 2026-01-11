import mongoose, { Schema } from "mongoose";
import type { ITrainCreate } from "../Utils/DataChecking";

const trainSchema = new mongoose.Schema<ITrainCreate>(
	{
		name: {
			type: String,
			unique: true,
		},

		number: {
			type: String,
			unique: true,
		},

		train_Types: {
			type: String,
		},

		coaches: {
			type: Schema.Types.ObjectId,
			ref: "Coach",
			required: [true, "coaches require"],
		},

		route: {
			type: Schema.Types.ObjectId,
			ref: "Route",
			required: [true, "route require"],
		},
	},
	{
		timestamps: true,
	},
);

const Trains = mongoose.model<ITrainCreate>("Trains", trainSchema);

export default Trains;

import mongoose, { Schema } from "mongoose";
import type { ITrainRouteCreate } from "../Utils/DataChecking";

const routeSchema = new mongoose.Schema<Required<ITrainRouteCreate>>(
	{
		train: {
			type: Schema.Types.ObjectId,
			ref: "Trains",
			require: true,
		},

		from: {
			type: Schema.Types.ObjectId,
			ref: "Station",
		},

		to: {
			type: Schema.Types.ObjectId,
			ref: "Station",
		},

		stops: { type: Schema.Types.ObjectId, ref: "Station" },

		arrivalTime: { type: Date },
		departureTime: { type: Date },
	},
	{
		timestamps: true,
	},
);

const TrainRoute = mongoose.model<Required<ITrainRouteCreate>>("Route", routeSchema);

export default TrainRoute;

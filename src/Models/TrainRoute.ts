import mongoose, { Schema } from "mongoose";
import type { ITrainRouteCreate } from "../Utils/DataChecking";

const routeSchema = new mongoose.Schema<ITrainRouteCreate>(
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

		stops: [
			{
				station: { type: Schema.Types.ObjectId, ref: "Station" },
			},
		],

		arrivalTime: { type: Date },
		departureTime: { type: Date },
	},
	{
		timestamps: true,
	},
);

const TrainRoute = mongoose.model<ITrainRouteCreate>("Route", routeSchema);

export default TrainRoute;

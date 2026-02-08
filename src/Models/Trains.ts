import mongoose, { Schema } from "mongoose";
import type { ITrainCreate } from "../Utils/DataChecking";
import TrainCoach from "./Coaches";
import TrainStation from "./Stations";
import TrainRoute from "./TrainRoute";

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

trainSchema.pre("findOneAndDelete", async function () {
	// Deleting Train Route
	const doc = (await this.model.findOne(
		this.getFilter(),
	)) as ITrainCreate | null;

	if (doc?.route) {
		const train_Route_Delete_Doc = await TrainRoute.findByIdAndDelete(
			doc.route,
			{ new: true },
		);

		//   Deleting Train Station
		if (train_Route_Delete_Doc)
			await TrainStation.findByIdAndDelete(train_Route_Delete_Doc.from);
	}

	// Deleting Train coaches
	if (doc?.coaches) {
		await TrainCoach.findByIdAndDelete(doc.coaches);
	}
});

const Trains = mongoose.model<ITrainCreate>("Trains", trainSchema);

export default Trains;

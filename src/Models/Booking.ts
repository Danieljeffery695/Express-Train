import mongoose, { Schema } from "mongoose";
import type { ITrainBooking } from "../Utils/DataChecking";

const trainBooking = new mongoose.Schema<ITrainBooking>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},

		schedule: {
			type: Schema.Types.ObjectId,
			ref: "Schedule",
		},

		seats: {
			type: Schema.Types.ObjectId,
			ref: "Seats",
		},

		passengers: {
			type: Object,
			default: { name: "null", age: 4, gender: "null" },
		},

		totalPrice: {
			type: Number,
		},

		status: {
			type: String,
			enums: ["PENDING", "CONFIRMED", "CANCELLED"],
			default: "PENDING",
		},
	},
	{
		timestamps: true,
	},
);

const TrainBookings = mongoose.model<ITrainBooking>("Bookings", trainBooking);

export default TrainBookings;

import mongoose, { Schema } from "mongoose";
import { ITrainSeats } from "../Utils/DataChecking";

const seatSchema = new mongoose.Schema<ITrainSeats>(
    {
        coach: {
            type: Schema.Types.ObjectId,
            ref: "Coach",
        },

        seat_number: {
            type: String,
            unique: true,
        },

        seat_type: {
            type: String,
            enum: ["Type1", "Type2", "Type3"],
            default: "Type1",
        },

        isWindow: { type: Boolean },

        isAvailable: {type: Boolean},

    },
    {
        timestamps: true,
    },
);

const Seats = mongoose.model<ITrainSeats>("Seats", seatSchema);

export default Seats;

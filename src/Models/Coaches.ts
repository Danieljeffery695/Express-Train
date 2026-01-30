import mongoose, {Schema} from "mongoose";
import { ITrainCoach } from "../Utils/DataChecking";

const coachSchema = new mongoose.Schema<ITrainCoach>({
    train: {
        type: Schema.Types.ObjectId,
        ref: "Trains",
        require: true
    },

    coachType: {
        type: String,
        enum: ["Economy", "Business", "FirstClass"],
        default: "Economy",
    },

    seatCount: {
        type: Number,
    },

    seats: {
        type: Schema.Types.ObjectId,
        ref: "Seats",
    }
},
{
		timestamps: true,
	},
);

const TrainCoach = mongoose.model<ITrainCoach>("Coach", coachSchema);

export default TrainCoach;
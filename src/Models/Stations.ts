import mongoose from "mongoose";
import { ITrainStation } from "../Utils/DataChecking";

const stationSchema = new mongoose.Schema<ITrainStation>({
    station_name: {type: String},
    code: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String}

},
{
        timestamps: true,
    },
);

const TrainStation = mongoose.model<ITrainStation>("Station", stationSchema);

export default TrainStation;
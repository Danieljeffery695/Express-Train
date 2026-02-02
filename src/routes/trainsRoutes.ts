import { Router } from "express";
import { createTrain, getAllTrain, updateTrain } from "../Controllers/TrainController";
import {create_Train_Auth} from "../middlewares/train_middleware";

const trainRouter = Router();

trainRouter.post("/api/v1/createTrain", create_Train_Auth, createTrain);

trainRouter.get("/api/v1/getTrains", getAllTrain)
.patch("/api/v1/updateTrain/:id", updateTrain);

export default trainRouter;
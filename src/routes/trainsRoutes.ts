import { Router } from "express";
import {
	createTrain,
	deleteTrain,
	getAllTrain,
	updateTrain,
} from "../Controllers/TrainController";
import {
	create_Train_Auth,
	update_Train_Auth,
} from "../middlewares/train_middleware";

const trainRouter = Router();

trainRouter.post("/api/v1/createTrain", create_Train_Auth, createTrain);

trainRouter
	.get("/api/v1/getTrains", getAllTrain)
	.patch("/api/v1/updateTrain/:id", update_Train_Auth, updateTrain)
	.delete("/api/v1/deleteTrain/:id", deleteTrain);

export default trainRouter;

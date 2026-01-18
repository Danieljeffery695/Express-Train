import { Router } from "express";
import { createTrain } from "../Controllers/TrainController";
import {create_Train_Auth} from "../middlewares/train_middleware";

const trainRouter = Router();

trainRouter.post("/api/v1/createTrain", create_Train_Auth, createTrain);

export default trainRouter;
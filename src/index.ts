import dotenv from "dotenv";
dotenv.config({ path: "./../config.env" });
import express, { type Request, type Response } from "express";
import dbConnection from "./Db/dbConnect";
import { createUser } from "./Controllers/CreateUsers_controller";


const app = express();
app.use(express.json());
dbConnection();

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("simple");
});

app.post("/create/user", createUser);

const port = process.env.PORT;

app.listen(port, () => {
	console.log("I have to focus on my projects ", port);
});

export default app;

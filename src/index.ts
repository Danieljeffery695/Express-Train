import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "./../config.env" });

import express, { type Request, type Response } from "express";

const app = express();
app.use(express.json());

const simpleData = fs.readFileSync(`../simple_admin_data.json`, "utf-8");

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("simple");
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log("I have to focus on my projects");
});

export default app;

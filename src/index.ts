import dotenv from "dotenv";

dotenv.config({ path: "./../config.env" });

import express, { type Request, type Response } from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import dbConnection from "./Db/dbConnect";
import loginAuth from "./middlewares/login_middleware";
import router from "./routes/routers";

// Global Middlewares 
const app = express();
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(express.json());
app.use(helmet());
app.use(limiter);
dbConnection();

// Local routes
app.get("/", (req: Request, res: Response) => {
	res.status(200).send("simple");
});

// Custom routes and Middlewares
app.use(
	loginAuth,
	router
);

const port = process.env.PORT;

app.listen(port, () => {
	console.log("I have to focus on my projects ", port);
});

export default app;

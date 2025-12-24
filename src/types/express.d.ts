import "express-session";
import { ResetTokenType } from "../Utils/DataChecking";

declare module "express-session" {
	interface SessionData<ResetTokenType> {
		resetToken: {};
	}
}

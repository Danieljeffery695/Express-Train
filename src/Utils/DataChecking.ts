
import { JwtPayload } from "jsonwebtoken";

export interface BodyCasting {
	name?: string;
	email: string;
	phone?: string;
	password: string;
	passwordConfirm?: string;
}

export interface IUserCreate {
	name: string;
	email: string;
	phone: string;
	phoneNumberRegion: string;
	password: string;
	passwordConfirm?: string;
	role: string;
	isAdmin: boolean;
	ipGeo: Array<string>;
	ipAddress: Array<string>;
	passwordChanged: boolean;
	passwordChangedAt: Date;
	resetPasswordToken: string;
	resetPasswordTokenExpires: Date;
	deactivated: boolean;
	deactivatedAt: Date;
	updatedAt: Date;
	createdAt: Date;

	compareLoginPassword(
		currentInputPwd: string,
		userDbPwd: string,
	): Promise<boolean>;
}

export interface ResetTokenType {
	resetPasswordTokenExpires: Date;
	resetPasswordToken?: string;
	resetUrl: string;
	id: string;
	saltToken: string;
}
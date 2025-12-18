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

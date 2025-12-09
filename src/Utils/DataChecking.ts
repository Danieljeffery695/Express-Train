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
	updatedAt: Date;
	createdAt: Date;

	compareLoginPassword(
		currentInputPwd: string,
		userDbPwd: string,
	): Promise<boolean>;
}

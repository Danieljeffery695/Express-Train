interface T {
	errorState: boolean;
	errorMessage?: string;
}

export function CheckBool(...rest: Array<T>) {
	for (let i = 0; i < rest.length; i++) {
		const { errorState, errorMessage } = rest[i];
		if (!errorState) return { errState: false, errMsg: errorMessage };
	}

	return { errState: true };
}

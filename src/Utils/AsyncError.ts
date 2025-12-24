import type { NextFunction, Request, Response } from "express";

export const handleAsyncErr = (fn: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch((err: Error) => {
			console.log(err);
			res.status(404).json({
				Status: "Fail",
				Message: err.message,
			});
		});
	};
};

// Simple but complex logic. i can pass a message "Something went wrong, statusCode: 200, 201,301, 302, 400, 401, 404" instead of hard coding the message and status code there.
// and filter out the statusCode using string methods. and also configure the error message by taking out the status code and displaying the rest
// With this logic implemented. there won't be any error handling function inside the handleAsyncErr wherever it is being used
// Can be implemented but i will leave the idea for now. Maybe later

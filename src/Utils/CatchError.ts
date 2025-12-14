import {NextFunction} from "express";

function errorProdMood(err: Error) {
	// If environment is in production or others then error checks should be run
	let typeOfError;
	switch (err.cause) {
		case "ParseError":
			typeOfError = "Invalid number";
			break;
		case "TypeError":
			typeOfError = "Something went wrong, please try again later";
			break;
		case "Error":
			typeOfError = "Sorry, Sorry went wrong. Give us sometime to fix it";
			break;
		case "ValidationError":
			typeOfError = "Validation of data failed. please input the right data";
			break;
		case "MongoServerError":
			typeOfError = "Server Error";
			break;
		case "SyntaxError":
			typeOfError = "Something went wrong after posting your data";
			break;
		case "JsonWebTokenError":
			typeOfError = "invalid signature";
			break;
		case "TokenExpiredError":
			typeOfError = "Expired signature";
			break;
		default:
			typeOfError = "default Error";
	}
	console.log(`🧨 ${typeOfError}`);
	return typeOfError;
}

function catchError(err: Error, message: string, statusCode: number, next: NextFunction) {
	if (process.env.NODE_ENV == "development") {		
		console.log(err);
		return next({err, responseMsg: message, statusCode});
	} else {
		errorProdMood(err);
   }
}

export default catchError;

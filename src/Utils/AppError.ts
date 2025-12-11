import { NextFunction, Request, Response } from "express";

export function handleAppError() {
       return ((err: any, req: Request, res: Response, next: NextFunction) => {
            err.message = err.message || "Server Errors";
            err.responseMsg = err.responseMsg || "Please standby we're working on the issues. Thanks for your Patience..!!!";
            err.statusCode = err.statusCode || 500;

            res.status(err.statusCode).json({
                Status: `Failed Trace ${req.originalUrl}`,
                Message: err.message,
                Causes: err.responseMsg
            });

            next();
       });
}

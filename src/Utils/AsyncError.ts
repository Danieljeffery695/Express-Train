import {Request, Response, NextFunction } from "express";

export const handleAsyncErr = (fn: Function) => {
        return (err: any, req: Request, res: Response, next: NextFunction) => {
            err.message = err.message || "Server Errors";
            err.responseMsg = err.responseMsg || "Please standby we're working on the issues. Thanks for your Patience..!!!";
            err.statusCode = err.statusCode || 500;
            Promise.resolve(fn(req, res, next)).catch((error: Error) => res.status(err.statusCode).json({
                Status: "Failed",
                Message: err.message,
                Causes: err.responseMsg
            }));
    };
}

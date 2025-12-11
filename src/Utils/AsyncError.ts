import { Request, Response, NextFunction } from "express";

export const handleAsyncErr = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: Error) => {
          res.status(404).json({
              Status: "Fail",
              Message: err.message
            });
        });
    };
};

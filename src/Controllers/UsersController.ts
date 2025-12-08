import Users from "../Models/Users";
import type { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        //This locals data is accessible everywhere across all chained request sent to the same endpoints
        const [name, phone, email, password, passwordConfirm, phoneNumberRegion] = res.locals.signUpData;
        const newUser = await Users.create({
            name,
            email,
            phone,
            phoneNumberRegion,
            password,
            passwordConfirm
        });

        res.status(200).json({
            Status: "success",
            data: newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            Status: "failed",
            data: error,
        });
    }
};
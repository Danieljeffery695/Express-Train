import Users from "../Models/Users";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, phone, password} = req.body;
        const newUser = await Users.create({
        name: name,
            email: email,
        phone: phone,
            password: password
        });
        
        res.status(200).json({
            "Status": "success",
            "data": newUser 
        });
        console.log(newUser);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            "Status": "failed",
            "data": error 
        });
    }
}


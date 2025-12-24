import type { NextFunction } from "express";
import nodemailer from "nodemailer";
import catchError from "./CatchError";

async function emailSender(
	receiver: string,
	subject: string,
	token: string,
	next: NextFunction,
) {
	try {
		if (
			process.env.EMAIL_HOST &&
			process.env.EMAIL_PORT &&
			process.env.EMAIL_USERNAME &&
			process.env.EMAIL_PASSWORD
		) {
			// Create a test account or replace with real credentials.

			const transporter = nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: 2525,
				secure: false, // true for 465, false for other ports
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			});

			// Wrap in an async IIFE so we can use await.
			const info = await transporter.sendMail({
				from: '"Express Train Web 🚄🚊" <ExpressTrainweb123@email>',
				to: receiver,
				subject,
				text: "Express Reset Password Token", // plain‑text body
				html: `<h1>Please ignore this message if you are not the one who requested for password changes</h1>
    <p>kindly click on the link and to set a new password ${token}</p>
    <p>You got 10 minutes to reset your password</p>`, // HTML body
			});

			console.log("Message sent:", info.messageId);
			return info;
		}
	} catch (error: any) {
		catchError(error, error.message, 400, next);
	}
}

export default emailSender;

import nodemailer  from "nodemailer";
import catchError from "./CatchError";
import {NextFunction} from "express";

async function emailSender(next: NextFunction) {
    try {
        if(process.env.EMAIL_HOST && process.env.EMAIL_PORT && process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {   
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
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
});

console.log("Message sent:", info.messageId);
return info;
}
    } catch (error: any) {
        catchError(error, error.message, 400, next);
    }
}

export default emailSender
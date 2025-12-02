import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const dbString: NodeJS.ProcessEnv | string = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PASSWORD);
        const db = await mongoose.connect(dbString);
        console.log("Database Connected Successfully");
    } catch (error) {
        if(process.env.NODE_ENV === "development") {
            console.log(error);
        } else {
            console.log("Sorry we're having issues connecting with our database at the moment");
        }
    }
}

export default dbConnection;
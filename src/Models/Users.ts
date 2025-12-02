import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "name": {
        type: String,
        require: [true, "Please Your name is require"]
    },

    "email": {
        type: String,
        unique: true,
        require: [true, "Please Your email is require"]
    },

    "phone": {
        type: Number,
        require: [true, "Please Your phone number is require"]
    }, 

    "password": {
        type: String,
        require: [true, "Please provide a password"]
    }, 

    "isAdmin": {
        type: Boolean,
        default: false
    }
});

const Users = mongoose.model("Users", userSchema);

export default Users
import mongoose, {
   HydratedDocument
} from "mongoose";
import bcrypt from "bcryptjs";
import { IUserCreate } from "../Utils/DataChecking";

const userSchema = new mongoose.Schema<IUserCreate>({
  name: {
    type: String,
    required: [true, "Please Your name is required"], 
	minlength: 2
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please Your email is required"], 
  },

  phone: {
    type: String,
    required: [true, "Please Your phone number is required"], 
  },

  phoneNumberRegion: {
	type: String,
	default: "none",
  },

  password: {
    type: String,
    required: [true, "Please provide a password"], 
	minlength: [8, "Password length must be above eight Characters"]
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password for validation"], 
    validate: {
      validator: function (this: HydratedDocument<User>, data: string) {
        return data === this.password;
      },
	  message: "Passwords are not the same!"
    },
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});


userSchema.pre(
  "save",
  async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

  }
);

const Users = mongoose.model<IUserCreate>("Users", userSchema);

export default Users;

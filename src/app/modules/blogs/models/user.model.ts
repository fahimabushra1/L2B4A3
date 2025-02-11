import { model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema<User>({

    name:{type: String, required: [true, "full name must be needed"]},
    email: {type: String, required: [true, "email must be needed"]},
    password: {type: String, required: [true, "password must be needed"]},
    role: {type: String, enum: {values: ["admin", "user"], message: "{VALUE} is not valid",}, required: [true, "role must be needed"]},
    isBlocked: { type: Boolean, default: false },
}, 
    { timestamps: true },
);

export const userModel = model<User> ("user", userSchema);
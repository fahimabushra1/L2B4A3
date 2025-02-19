import { model, Schema } from "mongoose";
import { Admin } from "../interfaces/admin.interface";

const userSchema = new Schema<Admin>({

    name:{type: String, required: [true, "full name must be needed"]},
    email: {type: String, required: [true, "email must be needed"]},
    password: {type: String, required: [true, "password must be needed"]},
    role: {type: String, enum: {values: ["admin"], message: "{VALUE} is not valid",}, required: [true, "role must be needed"]},
}, 
    { timestamps: true },
);

export const userModel = model<Admin> ("admin", userSchema);
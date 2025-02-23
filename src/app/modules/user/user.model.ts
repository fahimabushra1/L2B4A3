import { model, Schema } from "mongoose";
import { InUserModel, User } from "./user.interface";

const userSchema = new Schema<User, InUserModel>({
    id: {type: String, unique: true},
    name:{type: String, required: [true, "name must be needed"]},
    email: {type: String, required: [true, "email must be needed"]},
    password: {type: String, required: [true, "password must be needed"]},
    role: {type: String, enum: {values: ["admin", "user"], message: "{VALUE} is not valid",}, required: [true, "role must be needed"]},
    isBlocked: { type: Boolean, default: false },
}, 
    { timestamps: true },
);



// creating a custom static method
userSchema.statics.isUserExist = async function (id: string) {
    const existingUser = await userModel.findOne({id});
    return existingUser;
};


export const userModel = model<User> ("user", userSchema);
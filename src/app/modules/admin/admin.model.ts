import { model, Schema } from "mongoose";
import { Admin, InAdminModel } from "./admin.interface";

const adminSchema = new Schema<Admin,InAdminModel>({

    id: {type: String, unique: true},
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'user',
      },
    name:{type: String, required: [true, "full name must be needed"]},
    email: {type: String, required: [true, "email must be needed"]},
    password: {type: String, required: [true, "password must be needed"]},
    role: {type: String, enum: {values: ["admin"], message: "{VALUE} is not valid",}, required: [true, "role must be needed"]},
}, 
    { timestamps: true },
);


//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await adminModel.findOne({ id });
    return existingUser;
  };

export const adminModel = model<Admin> ("admin", adminSchema);
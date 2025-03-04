import { model, Schema } from "mongoose";
import { TUserModel, User } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<User, TUserModel>({
    id: {type: String, unique: true},
    name:{type: String, required: [true, "name must be needed"]},
    email: {type: String, required: [true, "email must be needed"]},
    password: {type: String, required: [true, "password must be needed"], select: 0,},
    needsPasswordChange: {type: Boolean,default: true,},
    passwordChangedAt: {type: Date,},
    role: {type: String, enum: {values: ["admin", "user"], message: "{VALUE} is not valid",}, required: [true, "role must be needed"]},
    isBlocked: { type: Boolean, default: false },
}, 
    { timestamps: true },
);


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    const user = await userModel.findOne({ id }).select('+password');
    console.log(user);
      return user;
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  
  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };

export const userModel = model<User, TUserModel> ("user", userSchema);
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
};

export interface TUserModel extends Model<User> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<User>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }
  
  export type userRole = keyof typeof USER_ROLE;

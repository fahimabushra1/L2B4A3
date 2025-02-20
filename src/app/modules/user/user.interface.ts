import { Model } from "mongoose";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
};


// for creating static
export interface UserModel extends Model<User> {
    isUserExist(id: string): Promise<User | null>;
};
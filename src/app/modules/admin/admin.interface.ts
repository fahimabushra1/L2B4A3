import { Model, Types } from "mongoose";

export type Admin = {
    
    id: string;
    user: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin";
};

export interface InAdminModel extends Model<Admin> {
    isUserExists(id: string): Promise<Admin | null>;
  }
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { Admin } from "../admin/admin.interface";
import { userModel } from "./user.model";
import { generateAdminId, generateUserId } from "./user.utils";
import { User } from "./user.interface";
import httpStatus from 'http-status';
import { adminModel } from "../admin/admin.model";

const createUserIntoDB = async ( payload: User) => {
    // create a user object
    const userData: Partial<User> = {};
  
    //if password is not given , use default password
    userData.password  || (config.default_pass as string);
  
    //set user role
    userData.role = 'user';
  
    // find author info
    // const author = await blogModel.findById(
    //   payload.author,
    // );
  
    // if (!author) {
    //   throw new AppError(400, 'author is not found');
    // }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateUserId();
  
      // create a user (transaction-1)
      const newUser = await userModel.create([userData], { session });
      console.log(newUser)

       // set id , _id as user
       payload.id = newUser[0].id;
       console.log(payload.id)
  
     if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
  
      await session.commitTransaction();
      await session.endSession();

    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

  const createAdminIntoDB = async (password: string, payload: Admin) => {
    // create a user object
    const userData: Partial<User> = {};
  
    //if password is not given , use default password
    userData.password = password || (config.default_pass as string);
  
    //set admin role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await userModel.create([userData], { session });
  
      //create an admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await adminModel.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };


export const UserServices ={
    createUserIntoDB,
    createAdminIntoDB,
}
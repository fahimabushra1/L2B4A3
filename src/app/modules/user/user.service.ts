import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { Admin } from "../admin/admin.interface";
import { Blog } from "../blog/blog.interface";
import { blogModel } from "../blog/blog.model";
import { userModel } from "./user.model";
import { generateUserId } from "./user.utils";
import { User } from "./user.interface";
import httpStatus from 'http-status';

const createUserIntoDB = async (password: string, payload: Blog) => {
    // create a user object
    const userData: Partial<User> = {};
  
    //if password is not given , use default password
    userData.password = password || (config.default_pass as string);
  
    //set user role
    userData.role = 'user';
  
    // find author info
    const author = await blogModel.findById(
      payload.author,
    );
  
    if (!author) {
      throw new AppError(400, 'author is not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateUserId();
  
      // create a user (transaction-1)
      const newUser = await userModel.create([userData], { session });
  
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

  const createAdminIntoDB = async (password: string, payload: TAdmin) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session });
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
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
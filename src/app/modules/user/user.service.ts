import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { userModel } from "./user.model";
import httpStatus from 'http-status';

  const blockUserFromDB = async (id : string) =>{
    const session = await mongoose.startSession();
    try{
      session.startTransaction();
      const blockUser = await userModel.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true, session },
      );
  
      if (!blockUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to block user');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return blockUser;
    }catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('Failed to block user');
    }
  };


export const UserServices ={
    blockUserFromDB
}
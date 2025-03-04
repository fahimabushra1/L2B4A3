import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../../app/errors/AppError';
import { userModel } from '../modules/user/user.model';
import { User } from '../modules/user/user.interface';
import { createToken } from './auth.utils';
import mongoose from "mongoose";
import { generateUserId } from '../modules/user/user.utils';

const registerUser = async ( payload: User) => {

  const validRoles = ['user', 'admin'];
  const role = validRoles.includes(payload.role as string) ? payload.role : 'user';

  const userId = await generateUserId(payload.role);
   // Debugging log
  
  const newUser = new userModel({ ...payload, id: userId });
  await newUser.save();
  console.log("Saved User Data:", newUser);
  
   // Generate ID based on role
   const generatedId = await generateUserId(payload.role);
   console.log("Final User ID Assigned:", generatedId);

  // create a user object
  const userData: Partial<User> = {
    
      name: payload.name,
      email: payload.email,
      password: payload.password || config.default_pass, 
      role,
      id: generatedId,
  
  };

 

  //if password is not given , use default password
  userData.password  || (config.default_pass as string);

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

      return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const loginUser = async (payload: User) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await userModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (
    user.passwordChangedAt &&
    userModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
};
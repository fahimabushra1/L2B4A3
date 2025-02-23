import  httpStatus  from 'http-status';
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
    const { user: userData } = req.body;
    // console.log(userData)
  
    const result = await UserServices.createUserIntoDB( userData);
    console.log(result)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  });

    const createAdmin = catchAsync(async (req, res) => {
        const { password, admin: adminData } = req.body;
      
        const result = await UserServices.createAdminIntoDB(password, adminData);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Admin is created successfully',
          data: result,
        });
      });
    
    export const UserControllers = {
       createUser,
       createAdmin,
    }
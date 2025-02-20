import  httpStatus  from 'http-status';
// import { UserValidation } from "../validation/user.validation";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
// import {  AdminValidationSchema } from "../validation/admin.validation";

const createUser= catchAsync(
    async (req, res)=>{
        const {password, user: userData} = req.body;
    
        // data validation using zod
        // const zodParseData = UserValidation.parse(userData);
      
    const result = await UserServices.createUserIntoDB(password, userData);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
      });
    });

const createAdmin= catchAsync(
    async (req, res)=>{

        const {admin: adminData} = req.body;
    
        // data validation using zod
        // const zodParseData = AdminValidationSchema.parse(adminData);
      
    const result = await UserServices.createAdminIntoDB(adminData);
    
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
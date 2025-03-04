import  httpStatus  from 'http-status';
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
// import catchAsync from "../../utils/catchAsync";
import { Request, Response } from 'express';

// const createAdmin = catchAsync(async (req, res) => {
//         const { password, admin: adminData } = req.body;
      
//         const result = await UserServices.createAdminIntoDB(password, adminData);
      
//         sendResponse(res, {
//           statusCode: httpStatus.OK,
//           success: true,
//           message: 'Admin is created successfully',
//           data: result,
//         });
//       });

      const blockUser = async(req: Request, res: Response) =>{

        const {id} = req.params;
        console.log(id)
        const result = await UserServices.blockUserFromDB(id);
        console.log(result);
    
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'blog is deleted successfully',
          data: result,
        });
    };
    
    export const UserControllers = {
      //  createAdmin,
       blockUser
    }
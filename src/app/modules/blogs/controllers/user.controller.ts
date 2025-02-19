// import { UserValidation } from "../validation/user.validation";
import { UserServices } from "../services/user.service";
import catchAsync from "../utils/catchAsync";
// import {  AdminValidationSchema } from "../validation/admin.validation";

const createUser= catchAsync(
    async (req, res)=>{
        const {password, user: userData} = req.body;
    
        // data validation using zod
        // const zodParseData = UserValidation.parse(userData);
      
    const result = await UserServices.createUserIntoDB(password, userData);
    
    res.status(200).json({
        success: true,
        message:"student is created successfully",
        data: result,
    });
    });

const createAdmin= catchAsync(
    async (req, res)=>{

        const {admin: adminData} = req.body;
    
        // data validation using zod
        // const zodParseData = AdminValidationSchema.parse(adminData);
      
    const result = await UserServices.createAdminIntoDB(adminData);
    
    res.status(200).json({
        success: true,
        message:"student is created successfully",
        data: result,
    });
    });
    
    export const UserControllers = {
       createUser,
       createAdmin,
    }
import config from "../../../config";
import { Admin } from "../interfaces/admin.interface";
import { User } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";

const createUserIntoDB = async (password:string, userData: User) => {

    // create a user object
    const user : User = {}

    // default password
   user.password = password || (config.default_pass as string);

    // set user role
    user.role="user";

    // create a user
    const result = await userModel.create(user);

    // create an admin
    if(object.keys(result).length){
        userData.id = result.id;
        userData.user = result._id;
    }
    return result;
};


const createAdminIntoDB = async (adminData: Admin) => {
    const result = await userModel.create(adminData);
    return result;
};


export const UserServices ={
    createUserIntoDB,
    createAdminIntoDB,
}
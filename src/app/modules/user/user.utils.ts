import { userModel } from "./user.model";

// user id
const findLastUserId = async () => {

  const lastUser = await userModel.findOne(
    {
      role: 'user',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser.id : undefined;
};

// admin id
export const findLastAdminId = async () => {
  const lastAdmin = await userModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};


// Generate User/Admin ID dynamically
 export const  generateUserId = async(role: string) => {
 let currentId = (await findLastUserId()) || (0).toString();

 
 if (role === "admin") {
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId;
  }
  return`A-${(Number(currentId) + 1).toString().padStart(4, "0")}`;
} else {
  const lastUserId = await findLastUserId();
  if (lastUserId) {
    currentId = lastUserId;
  }
  return (Number(currentId)+ 1).toString().padStart(4, '0');
}
}


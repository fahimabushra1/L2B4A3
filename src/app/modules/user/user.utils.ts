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
 export const  generateUserId = async() => {
 const currentId = (await findLastUserId()) || (0).toString();
 let incrementId = (Number(currentId)+ 1).toString().padStart(4, '0');
 return incrementId;
 }

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

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
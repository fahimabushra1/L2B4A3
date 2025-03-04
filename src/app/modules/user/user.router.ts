import express from 'express';
import { UserControllers } from './user.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { AdminValidationSchema } from '../admin/admin.validation';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.put('/users/:id/block',auth(USER_ROLE.admin), UserControllers.blockUser);

export const UserRoutes = router;
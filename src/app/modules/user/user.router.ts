import express from 'express';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationSchema } from '../admin/admin.validation';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/create-user', validationRequest(UserValidations.UserValidationSchema), UserControllers.createUser);
router.post('/create-admin', auth(USER_ROLE.admin),validateRequest(AdminValidationSchema), UserControllers.createAdmin);

export const UserRoutes = router;
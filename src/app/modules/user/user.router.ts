import express from 'express';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationSchema } from '../admin/admin.validation';


const router = express.Router();

router.post('/create-user', validationRequest(UserValidations.UserValidationSchema), UserControllers.createUser);
router.post('/create-admin',validateRequest(AdminValidationSchema), UserControllers.createAdmin);

export const UserRoutes = router;
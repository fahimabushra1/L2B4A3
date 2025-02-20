import express from 'express';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post('/create-user', validationRequest(UserValidations.UserValidationSchema), UserControllers.createUser);
router.post('/create-admin', UserControllers.createAdmin);

export const UserRoutes = router;
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AdminRoutes } from '../modules/admin/admin.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
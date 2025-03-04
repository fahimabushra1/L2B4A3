import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AdminRoutes } from '../modules/admin/admin.router';
import { BlogRoutes } from '../modules/blog/blog.router';
import { AuthRoutes } from '../auth/auth.route';

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
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
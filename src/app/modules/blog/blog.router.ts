import { USER_ROLE } from './../user/user.constant';
import express  from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post('/blogs',auth(USER_ROLE.user), BlogControllers.createBlog);
router.put('/blogs/:id',auth(USER_ROLE.user), BlogControllers.updateBlog);
router.delete('/blogs/:id',auth(USER_ROLE.user, USER_ROLE.admin), BlogControllers.deleteBlog);
router.get('/blogs', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
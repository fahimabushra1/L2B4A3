import express  from 'express';
import { BlogControllers } from './blog.controller';

const router = express.Router();
router.post('/api/blogs', BlogControllers.createBlog);
router.get('/api/blogs', BlogControllers.getAllBlogs);
router.get('/api/blogs/:id', BlogControllers.getSingleBlog);
router.put('/api/blogs/:id', BlogControllers.updateBlog);
router.delete('/api/blogs/:id', BlogControllers.deleteBlog);

export const BlogRoutes = router;
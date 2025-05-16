import express from 'express';
import { authenticateToken } from '../middleware';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controller/blogsController';

const router = express.Router();

router.post('/create', authenticateToken, createBlog);
router.get('/getallBlogs', authenticateToken, getAllBlogs);
router.get('/getBlog/:id', getBlogById);
router.delete('/delete/:id', authenticateToken, deleteBlog);
router.put('/update/:id', authenticateToken, updateBlog);

export default router;

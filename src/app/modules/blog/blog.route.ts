import express from 'express';

import upload from '../../../middleware/ImgUploder';
import { blogController } from './blog.controller';
const router = express.Router();

router.post('/create-blog', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlog);
router.get('/:id', blogController.getSingleBlog);
router.get('/blogSlug/:slug', blogController.getSingleBlogBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', blogController.updateSingleBlog);
router.delete('/:id', blogController.deleteSingleBlog);

export const blogRoutes = router;

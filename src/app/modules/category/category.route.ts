import express from 'express';

import upload from '../../../middleware/ImgUploder';
import { categoryController } from './category.controller';
const router = express.Router();

router.post(
  '/create-category',
  upload.single('image'),
  categoryController.createCategory,
);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getSingleCategory);
router.get('/categorySlug/:slug', categoryController.getSingleCategoryBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', categoryController.updateSingleCategory);
router.delete('/:id', categoryController.deleteSingleCategory);

export const categoryRoutes = router;

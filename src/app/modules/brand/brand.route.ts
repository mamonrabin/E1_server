import express from 'express';

import upload from '../../../middleware/ImgUploder';
import { brandController } from './brand.controller';

const router = express.Router();

router.post(
  '/create-brand',
  upload.single('image'),
  brandController.createBrand,
);
router.get('/', brandController.getAllBrand);
router.get('/:id', brandController.getSingleBrand);
router.get('/brandSlug/:slug', brandController.getSingleBrandBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', brandController.updateSingleBrand);
router.delete('/:id', brandController.deleteSingleBrand);

export const brandRoutes = router;

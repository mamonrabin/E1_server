import express from 'express';

import upload from '../../../middleware/ImgUploder';
import { sizeController } from './size.controller';

const router = express.Router();

router.post('/create-size', upload.single('image'), sizeController.createSize);
router.get('/', sizeController.getAllSize);
router.get('/:id', sizeController.getSingleSize);
router.get('/sizeSlug/:slug', sizeController.getSingleSizeBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', sizeController.updateSingleSize);
router.delete('/:id', sizeController.deleteSingleSize);

export const sizeRoutes = router;

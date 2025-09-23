import express from 'express';
import upload from '../../../middleware/ImgUploder';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  upload.single('image'),
  orderController.createOrder,
);
router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getSingleOrder);
router.put('/:id', orderController.updateSingleOrder);
router.delete('/:id', orderController.deleteSingleOrder);

export const orderRoutes = router;

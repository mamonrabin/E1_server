import express from 'express';
import { cartController } from './cart.controller';

const router = express.Router();

router.post('/create-cart', cartController.createCart);
router.get('/', cartController.getAllCart);
router.get('/:id', cartController.getSingleCart);
router.put('/:id', cartController.updateSingleCart);
router.delete('/:id', cartController.deleteSingleCart);

export const cartRoutes = router;

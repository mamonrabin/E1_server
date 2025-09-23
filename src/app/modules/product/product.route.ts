import express from 'express';

import upload from '../../../middleware/ImgUploder';
import { productController } from './product.controller';
const router = express.Router();

// router.post('/create-product', upload.any(), productController.createProduct);
router.post(
  '/create-product',
  upload.fields([
    { name: 'thumbal_image', maxCount: 1 },
    { name: 'backview_image', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  productController.createProduct,
);
router.get('/', productController.getAllProduct);
router.get('/new-arrivals', productController.getNewArrivalProducts);
router.get('/discount-products', productController.getDiscountProducts);
router.get('/best-sellers', productController.getBestSellerProducts);
router.get('/pagination', productController.getAllProductByPagination);
router.get("/related/:id", productController.getReletiveProduct);
// router.get("/related/:slug", productController.getReletiveProduct);
router.get('/:id', productController.getSingleProduct);
router.get('/productSlug/:slug', productController.getSingleProductBySlug);

// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', productController.updateSingleProduct);
router.delete('/:id', productController.deleteSingleProduct);

export const productRoutes = router;

import { Router } from 'express';
import { bannerRoutes } from '../modules/banner/banner.route';
import { categoryRoutes } from '../modules/category/category.route';
import { subCategoryRoutes } from '../modules/subCategory/subCategory.route';
import { sizeRoutes } from '../modules/size/size.route';
import { colorRoutes } from '../modules/color/color.route';
import { brandRoutes } from '../modules/brand/brand.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/product/product.route';
import { cartRoutes } from '../modules/cart/cart.route';
import { orderRoutes } from '../modules/order/order.route';

const rounter = Router();

const modulRouter = [
  {
    path: '/banner',
    route: bannerRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/subCategory',
    route: subCategoryRoutes,
  },
  {
    path: '/size',
    route: sizeRoutes,
  },
  {
    path: '/color',
    route: colorRoutes,
  },
  {
    path: '/brand',
    route: brandRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/cart',
    route: cartRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
];

modulRouter.forEach((route) => rounter.use(route.path, route.route));

export default rounter;

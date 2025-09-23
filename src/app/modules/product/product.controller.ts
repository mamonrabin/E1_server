import { NextFunction, Request, Response } from 'express';
import { productService } from './product.service';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const thumbalImage = files?.thumbal_image?.[0]?.filename;
    const backviewImage = files?.backview_image?.[0]?.filename;
    const images =
      files?.images?.map((file) => `/uploads/${file.filename}`) || [];

    const result = await productService.createProductByBD({
      ...product,
      thumbal_image: thumbalImage ? `/uploads/${thumbalImage}` : '',
      backview_image: backviewImage ? `/uploads/${backviewImage}` : '',
      images,
    });

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productService.getAllProductByBD();
    res.status(200).json({
      success: true,
      message: 'all product get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getNewArrivalProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getNewArrivalProducts(limit);
    res.status(200).json({
      success: true,
      message: 'new arrival products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDiscountProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getDiscountProducts(limit);
    res.status(200).json({
      success: true,
      message: 'discount products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBestSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getBestSellerProducts(limit);
    res.status(200).json({
      success: true,
      message: 'best seller products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProductByPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productService.getAllProductByBDWithPagination(
      req.query,
    );
    res.status(200).json({
      success: true,
      message: 'all product get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const getReletiveProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params; // Product ID from route
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await productService.getRelatedProducts(id, limit);

    res.status(200).json({
      success: true,
      message: 'Relative products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await productService.getSingleProductByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await productService.getSingleProductBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single product by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const updateSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateProduct = req.body;
    const result = await productService.updateSingleProductByBD(
      id,
      updateProduct,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReletiveProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await productService.getRelatedProductsBySlug(slug, 8);

    res.status(200).json({
      success: true,
      message: 'Relative products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteSingleProductByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getAllProductByPagination,
  getSingleProduct,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct,
  getNewArrivalProducts,
  getDiscountProducts,
  getBestSellerProducts,
  getReletiveProduct
};

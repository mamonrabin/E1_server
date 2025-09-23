import { NextFunction, Request, Response } from 'express';
import { brandService } from './brand.service';

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const result = await brandService.createBrandByBD({
      ...brand,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Brand created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const getAllBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await brandService.getAllBrandByBD();
    res.status(200).json({
      success: true,
      message: 'all brand get successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const getSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await brandService.getSingleBrandByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const getSingleBrandBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await brandService.getSingleBrandBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single brand by slug successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const updateSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateBrand = req.body;
    const result = await brandService.updateSingleBrandByBD(id, updateBrand);
    res.status(200).json({
      success: true,
      message: 'update sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const deleteSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await brandService.deleteSingleBrandByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

export const brandController = {
  createBrand,
  getAllBrand,
  getSingleBrand,
  getSingleBrandBySlug,
  updateSingleBrand,
  deleteSingleBrand,
};

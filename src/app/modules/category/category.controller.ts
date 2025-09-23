import { NextFunction, Request, Response } from 'express';
import { categoryService } from './category.service';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const result = await categoryService.createCategoryByDB({
      ...category,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.getAllCategoryByDB();
    res.status(200).json({
      success: true,
      message: 'all category get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryService.getSingleCategoryByDB(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await categoryService.getSingleCategoryBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single category by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateCategory = req.body;
    const result = await categoryService.updateSingleCategoryByDB(
      id,
      updateCategory,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteSingleCategoryByDB(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  getSingleCategoryBySlug,
  updateSingleCategory,
  deleteSingleCategory,
};

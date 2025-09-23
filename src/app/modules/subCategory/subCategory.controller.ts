import { NextFunction, Request, Response } from 'express';
import { subCategoryService } from './subCategory.service';

const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const SubCategory = req.body;
    const result = await subCategoryService.createSubCategoryByDB(SubCategory);
    res.status(200).json({
      success: true,
      message: 'SubCategory created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await subCategoryService.getAllSubCategoryByDB();
    res.status(200).json({
      success: true,
      message: 'all SubCategory get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await subCategoryService.getSingleSubCategoryByDB(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle SubCategory successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSubCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await subCategoryService.getSingleSubCategoryBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single SubCategory by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateSubCategory = req.body;
    const result = await subCategoryService.updateSingleSubCategoryByDB(
      id,
      updateSubCategory,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle SubCategory successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await subCategoryService.deleteSingleSubCategoryByDB(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle SubCategory successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const subCategoryController = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  getSingleSubCategoryBySlug,
  updateSingleSubCategory,
  deleteSingleSubCategory,
};

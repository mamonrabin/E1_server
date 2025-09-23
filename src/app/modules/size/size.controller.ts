import { NextFunction, Request, Response } from 'express';
import { sizeService } from './size.service';

const createSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const size = req.body;
    const result = await sizeService.createSizeByDB(size);
    res.status(200).json({
      success: true,
      message: 'Size created successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const getAllSize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await sizeService.getAllSizeByDB();
    res.status(200).json({
      success: true,
      message: 'all size get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await sizeService.getSingleSizeByDB(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle size successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSizeBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await sizeService.getSingleSizeBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single size by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleSize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateSize = req.body;
    const result = await sizeService.updateSingleSizeByDB(id, updateSize);
    res.status(200).json({
      success: true,
      message: 'update sinngle size successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleSize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await sizeService.deleteSingleSizeByDB(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle size successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const sizeController = {
  createSize,
  getAllSize,
  getSingleSize,
  getSingleSizeBySlug,
  updateSingleSize,
  deleteSingleSize,
};

import { NextFunction, Request, Response } from 'express';
import { colorService } from './color.service';

const createColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const color = req.body;
    const result = await colorService.createColorByDB(color);
    res.status(200).json({
      success: true,
      message: 'Color created successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const getAllColor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await colorService.getAllColorByDB();
    res.status(200).json({
      success: true,
      message: 'all color get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleColor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await colorService.getSingleColorByDB(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle color successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleColorBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await colorService.getSingleColorBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single color by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleColor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateColor = req.body;
    const result = await colorService.updateSingleColorByDB(id, updateColor);
    res.status(200).json({
      success: true,
      message: 'update sinngle color successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleColor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await colorService.deleteSingleColorByDB(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle color successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const colorController = {
  createColor,
  getAllColor,
  getSingleColor,
  getSingleColorBySlug,
  updateSingleColor,
  deleteSingleColor,
};

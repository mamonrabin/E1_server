import { NextFunction, Request, Response } from 'express';
import { bannerService } from './banner.service';

const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const banner = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const result = await bannerService.createBannerByDB({
      ...banner,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Banner created successfully',
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

const getAllBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await bannerService.getAllBannerByDB();
    res.status(200).json({
      success: true,
      message: 'all banner get successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const getSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await bannerService.getSingleBannerByDB(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const updateSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateBanner = req.body;
    const result = await bannerService.updateSingleBannerByDB(id, updateBanner);
    res.status(200).json({
      success: true,
      message: 'update sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const deleteSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await bannerService.deleteSingleBannerByDB(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

export const bannerController = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  updateSingleBanner,
  deleteSingleBanner,
};

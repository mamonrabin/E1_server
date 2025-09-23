import { NextFunction, Request, Response } from 'express';
import { blogService } from './blog.service';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const result = await blogService.createBlogByBD({
      ...blog,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Blog created successfully',
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

const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await blogService.getAllBlogByBD();
    res.status(200).json({
      success: true,
      message: 'all blog get successfully',
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

const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await blogService.getSingleBlogByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle blog successfully',
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

const getSingleBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await blogService.getSingleBlogBySlug(slug);
    res.status(200).json({
      success: true,
      message: 'get single blog by slug successfully',
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

const updateSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateBlog = req.body;
    const result = await blogService.updateSingleBlogByBD(id, updateBlog);
    res.status(200).json({
      success: true,
      message: 'update sinngle blog successfully',
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

const deleteSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await blogService.deleteSingleBlogByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle blog successfully',
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

export const blogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  getSingleBlogBySlug,
  updateSingleBlog,
  deleteSingleBlog,
};

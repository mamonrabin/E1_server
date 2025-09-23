import { NextFunction, Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const result = await orderService.createOrderByBD({
      ...order,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
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

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.getAllOrderByBD();
    res.status(200).json({
      success: true,
      message: 'all order get successfully',
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

const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await orderService.getSingleOrderByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle order successfully',
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

const updateSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateOrder = req.body;
    const result = await orderService.updateSingleOrderByBD(id, updateOrder);
    res.status(200).json({
      success: true,
      message: 'update sinngle order successfully',
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

const deleteSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await orderService.deleteSingleOrderByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle order successfully',
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

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
};

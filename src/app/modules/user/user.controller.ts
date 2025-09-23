import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await userService.createUserByBD(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
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

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUserByBD();
    res.status(200).json({
      success: true,
      message: 'all user get successfully',
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

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle user successfully',
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

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    const result = await userService.updateSingleUserByBD(id, updateUser);
    res.status(200).json({
      success: true,
      message: 'update sinngle user successfully',
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

const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteSingleUserByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle user successfully',
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

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};

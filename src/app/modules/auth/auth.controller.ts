import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.service';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.login(req.body);
    // const { accessToken, userData } = result;
    const { accessToken } = result;

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      accessToken: accessToken,
      //   data: userData,
    });
  } catch (error) {
    next(error);
  }
};
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.signup(req.body);
    const { accessToken, userData } = result;
    // const { accessToken } = result;

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User singup in successfully',
      accessToken: accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signIn,
  signUp,
};

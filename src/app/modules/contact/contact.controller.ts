import { NextFunction, Request, Response } from 'express';
import { contactService } from './contact.service';


const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = req.body;
    const result = await contactService.createContactByBD(contact);
    res.status(200).json({
      success: true,
      message: 'Contact created successfully',
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

const getAllContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contactService.getAllContactByBD();
    res.status(200).json({
      success: true,
      message: 'all contact get successfully',
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

const getSingleContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await contactService.getSingleContactByBD(id);
    res.status(200).json({
      success: true,
      message: 'get sinngle contact successfully',
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



const updateSingleContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateContact = req.body;
    const result = await contactService.updateSingleContactByBD(id, updateContact);
    res.status(200).json({
      success: true,
      message: 'update sinngle contact successfully',
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

const deleteSingleContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await contactService.deleteSingleContactByBD(id);
    res.status(200).json({
      success: true,
      message: 'delete sinngle contact successfully',
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

export const contactController = {
  createContact,
  getAllContact,
  getSingleContact,
  updateSingleContact,
  deleteSingleContact,
};

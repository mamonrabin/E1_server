import { TContact } from "./contact.interface";
import { contactModel } from "./contact.model";


const createContactByBD = async (contact: TContact) => {
  const result = await contactModel.create(contact);
  return result;
};
const getAllContactByBD = async () => {
  const result = await contactModel.find();
  return result;
};
const getSingleContactByBD = async (id: string) => {
  const result = await contactModel.findById(id);
  return result;
};



const updateSingleContactByBD = async (id: string, updateContact: TContact) => {
  const result = await contactModel.findByIdAndUpdate(id, updateContact, {
    new: true,
  });
  return result;
};

const deleteSingleContactByBD = async (id: string) => {
  const result = await contactModel.findByIdAndDelete(id);
  return result;
};

export const contactService = {
  createContactByBD,
  getAllContactByBD,
  getSingleContactByBD,
  updateSingleContactByBD,
  deleteSingleContactByBD,
};

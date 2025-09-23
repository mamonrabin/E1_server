import { TCart } from './cart.interface';
import { cartModel } from './cart.model';

const createCartByBD = async (cart: TCart) => {
  const result = await cartModel.create(cart);
  return result;
};
const getAllCartByBD = async () => {
  const result = await cartModel.find();
  return result;
};
const getSingleCartByBD = async (id: string) => {
  const result = await cartModel.findById(id);
  return result;
};

const updateSingleCartByBD = async (id: string, updateCart: TCart) => {
  const result = await cartModel.findByIdAndUpdate(id, updateCart, {
    new: true,
  });
  return result;
};

const deleteSingleCartByBD = async (id: string) => {
  const result = await cartModel.findByIdAndDelete(id);
  return result;
};

export const cartService = {
  createCartByBD,
  getAllCartByBD,
  getSingleCartByBD,
  updateSingleCartByBD,
  deleteSingleCartByBD,
};

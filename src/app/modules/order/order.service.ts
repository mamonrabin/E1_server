import { TOrder } from './order.interface';
import { orderModel } from './order.model';

const createOrderByBD = async (order: TOrder) => {
  const result = await orderModel.create(order);
  return result;
};
const getAllOrderByBD = async () => {
  const result = await orderModel.find();
  return result;
};
const getSingleOrderByBD = async (id: string) => {
  const result = await orderModel.findById(id);
  return result;
};

const updateSingleOrderByBD = async (id: string, updateOrder: TOrder) => {
  const result = await orderModel.findByIdAndUpdate(id, updateOrder, {
    new: true,
  });
  return result;
};

const deleteSingleOrderByBD = async (id: string) => {
  const result = await orderModel.findByIdAndDelete(id);
  return result;
};

export const orderService = {
  createOrderByBD,
  getAllOrderByBD,
  getSingleOrderByBD,
  updateSingleOrderByBD,
  deleteSingleOrderByBD,
};

import mongoose from 'mongoose';
import { productModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { orderModel } from './order.model';

// const createOrderByBD = async (order: TOrder) => {
//   const result = await orderModel.create(order);
//   return result;
// };

const createOrderByBD = async (order: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // ✅ Create the order first
    const newOrder = await orderModel.create([order], { session });
    const createdOrder = newOrder[0];

    // ✅ Loop through ordered products and update product stock
    for (const item of order.products) {
      const product = await productModel.findById(item.productRef).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productRef}`);
      }

      // Check stock before reducing
      if ((product.availableQuantity ?? 0) < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.title}`);
      }

      // Update quantities
      product.soldQuantity = (product.soldQuantity || 0) + item.quantity;
      product.availableQuantity = product.quantity - product.soldQuantity;

      // Update stock status
      if (product.availableQuantity <= 0) {
        product.availableQuantity = 0;
        product.stock_status = 'out_of_stock';
      }

      await product.save({ session });
    }

    // ✅ Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return createdOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Order creation failed:', error);
    throw error;
  }
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

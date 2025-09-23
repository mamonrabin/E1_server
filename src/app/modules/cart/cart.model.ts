import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const cartSchema = new Schema<TCart>(
  {
    userRef: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    productRef: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const cartModel = model<TCart>('cart', cartSchema);

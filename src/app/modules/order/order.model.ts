import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import orderIdGenerate from '../../../utils/orderIdGenerate';

const orderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      unique: true,
    },

    subTotalPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    couponRef: {
      type: Schema.Types.ObjectId,
      ref: 'coupon',
    },

    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    productRef: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },

    quantity: { type: Number, required: true },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerCity: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerHouse: {
      type: String,
    },
    customerRoad: {
      type: String,
    },
    customerThana: {
      type: String,
    },
    customerAltPhone: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['CashOnDelivery', 'Online'],
      default: 'CashOnDelivery',
    },

    status: {
      type: String,
      enum: [
        'OrderPlaced',
        'DeliveredPending',
        'Delivered',
        'Cancelled',
        'Hold',
        'InReview',
      ],
      default: 'OrderPlaced',
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = orderIdGenerate('ORD-');
  }
  next();
});

export const orderModel = model<TOrder>('order', orderSchema);

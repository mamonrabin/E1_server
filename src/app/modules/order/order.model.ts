import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import orderIdGenerate from '../../../utils/orderIdGenerate';

const orderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      unique: true,
    },

    subTotalPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },

    couponRef: {
      type: Schema.Types.ObjectId,
      ref: 'coupon',
    },

    // userRef: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },

    products: [
      {
        productRef: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: { type: Number, required: true },
        color: { type: String },
        size: { type: String },
      },
    ],

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    address: { type: String, required: true },
    house: { type: String },
    road: { type: String },
    thana: { type: String },
    altPhone: { type: String },

    paymentMethod: {
      type: String,
      enum: ['CashOnDelivery', 'bkash', 'card'],
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

    note: { type: String },
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

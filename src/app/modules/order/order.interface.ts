import { ObjectId } from 'mongoose';

export type TOrderProduct = {
  productRef: ObjectId;
  quantity: number;
  color?: string;
  size?: string;
};

export type TOrder = {
  orderId: string;
  subTotalPrice: number;
  totalPrice: number;
  shippingCost: number;
  couponRef?: ObjectId;
  // userRef: ObjectId;
  products: TOrderProduct[];
  status:
    | 'OrderPlaced'
    | 'DeliveredPending'
    | 'Delivered'
    | 'Cancelled'
    | 'Hold'
    | 'InReview';
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  house?: string;
  road?: string;
  thana?: string;
  altPhone?: string;
  paymentMethod: 'CashOnDelivery' | 'bkash' | 'card';
  note?: string;
};

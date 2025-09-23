import { ObjectId } from 'mongoose';

export type TOrder = {
  orderId: string;
  subTotalPrice: number;
  totalPrice: number;
  quantity: number;
  shippingCost: number;
  couponRef: ObjectId;
  userRef: ObjectId;
  productRef: ObjectId;
  status:
    | 'OrderPlaced'
    | 'DeliveredPending'
    | 'Delivered'
    | 'Cancelled'
    | 'Hold'
    | 'InReview';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCity: string;
  customerAddress: string;
  customerHouse: string;
  customerRoad: string;
  customerThana: string;
  customerAltPhone: string;
  paymentMethod: 'CashOnDelivery' | 'Online';
  note: string;
};

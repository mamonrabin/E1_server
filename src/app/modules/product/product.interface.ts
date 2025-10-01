import { ObjectId } from 'mongoose';

export type TProduct = {
  title: string;
  slug: string;
  quantity: number;
  mrpPrice: number;
  price?: number;
  discount?: number;
  availableQuantity?: number;
  soldQuantity?: number;
  description: string;
   colors: ObjectId[];
  category: ObjectId;
  subCategory?: ObjectId;
  brand?: ObjectId;
  thumbal_image: string;
  backview_image?: string;
  images: string[];
  freeShipping: boolean;
  sku?: string;
  barcode?: string;
  stock_status?: 'in_stock' | 'out_of_stock' | 'pre_order';
  video_url?: string;
  weight?: string;
  labels?: 'New' | 'Best Seller' | 'Limited Stock' | 'Sale' | 'Featured';
};

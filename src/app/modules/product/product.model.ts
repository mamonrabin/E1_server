import { HydratedDocument, model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import SlugUtils from '../../../utils/slug.utils';
const { generateSlug } = SlugUtils;

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    quantity: { type: Number, required: true },
    mrpPrice: { type: Number, required: true },
    discount: { type: Number },
    price: { type: Number },
    availableQuantity: { type: Number },
    soldQuantity: { type: Number },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'subCategory',
    },
    colors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'color',
        required: true,
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
      required: true,
    },
    thumbal_image: { type: String, required: true },
    backview_image: { type: String },
    images: { type: [String], default: [] },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    sku: { type: String },
    barcode: { type: String },
    stock_status: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'pre_order'],
      default: 'in_stock',
    },
    video_url: { type: String },
    weight: { type: String },
    labels: {
      type: String,
      enum: ['New', 'Trending', 'Limited Stock', 'Sale', 'Featured'],
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  const product = this as HydratedDocument<TProduct>;

  try {
    // Generate slug
    if ((product.isModified('title') || product.isNew) && product.title) {
      product.slug = generateSlug(product.title);
    }

    // Generate SKU
    if (!product.sku && product.title && product.brand) {
      const brandCode = product.brand.toString().slice(-4); // last 4 chars of ObjectId
      const timePart = Date.now().toString().slice(-6); // last 6 digits of timestamp
      const titlePart = product.title
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 4);
      product.sku = `${titlePart}-${brandCode}-${timePart}`;
    }

    // Calculate price from mrpPrice and discount
    if (product.mrpPrice) {
      if (product.discount !== undefined && product.discount !== null) {
        product.price =
          product.mrpPrice - (product.mrpPrice * product.discount) / 100;
      } else {
        product.price = undefined;
      }
    }

   

    // ✅ Calculate availableQuantity and soldQuantity
    if (product.quantity !== undefined) {
      product.soldQuantity = product.soldQuantity || 0;
      product.availableQuantity =
        product.quantity - (product.soldQuantity ?? 0);

      if (product.availableQuantity < 0) {
        product.availableQuantity = 0;
      }
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error('Unknown error during product pre-save.'));
    }
  }
});

export const productModel = model<TProduct>('product', productSchema);

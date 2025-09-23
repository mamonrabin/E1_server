import { HydratedDocument, model, Schema } from 'mongoose';

import SlugUtils from '../../../utils/slug.utils';
import { TBrand } from './brand.interface';
const { generateSlug } = SlugUtils;
const brandSchema = new Schema<TBrand>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

brandSchema.pre('save', function (next) {
  const brand = this as HydratedDocument<TBrand>;
  if ((brand.isModified('title') || brand.isNew) && brand.title) {
    try {
      brand.slug = generateSlug(brand?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const brandModel = model<TBrand>('brand', brandSchema);

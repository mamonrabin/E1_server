import { HydratedDocument, model, Schema } from 'mongoose';

import SlugUtils from '../../../utils/slug.utils';
import { TCategory } from './category.interface';
const { generateSlug } = SlugUtils;
const categorySchema = new Schema<TCategory>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre('save', function (next) {
  const category = this as HydratedDocument<TCategory>;
  if ((category.isModified('title') || category.isNew) && category.title) {
    try {
      category.slug = generateSlug(category?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const categoryModel = model<TCategory>('category', categorySchema);

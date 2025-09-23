import { HydratedDocument, model, Schema } from 'mongoose';

import SlugUtils from '../../../utils/slug.utils';
import { TSubCategory } from './subCategory.interface';

const { generateSlug } = SlugUtils;
const subCategorySchema = new Schema<TSubCategory>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    title: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

subCategorySchema.pre('save', function (next) {
  const subCategory = this as HydratedDocument<TSubCategory>;
  if (
    (subCategory.isModified('title') || subCategory.isNew) &&
    subCategory.title
  ) {
    try {
      subCategory.slug = generateSlug(subCategory?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const subCategoryModel = model<TSubCategory>(
  'subCategory',
  subCategorySchema,
);

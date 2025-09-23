import { HydratedDocument, model, Schema } from 'mongoose';

import SlugUtils from '../../../utils/slug.utils';
import { TSize } from './size.interface';

const { generateSlug } = SlugUtils;
const sizeSchema = new Schema<TSize>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

sizeSchema.pre('save', function (next) {
  const size = this as HydratedDocument<TSize>;
  if ((size.isModified('title') || size.isNew) && size.title) {
    try {
      size.slug = generateSlug(size?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const sizeModel = model<TSize>('size', sizeSchema);

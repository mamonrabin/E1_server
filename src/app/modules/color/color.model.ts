import { HydratedDocument, model, Schema } from 'mongoose';

import SlugUtils from '../../../utils/slug.utils';
import { TColor } from './color.interface';

const { generateSlug } = SlugUtils;
const colorSchema = new Schema<TColor>(
  {
    colorName: { type: String },
    colorCode: { type: String },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'size',
      required: true,
    },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

colorSchema.pre('save', function (next) {
  const color = this as HydratedDocument<TColor>;
  if ((color.isModified('title') || color.isNew) && color.colorName) {
    try {
      color.slug = generateSlug(color?.colorName as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const colorModel = model<TColor>('color', colorSchema);

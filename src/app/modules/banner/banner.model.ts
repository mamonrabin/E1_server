import { model, Schema } from 'mongoose';
import { TBanner } from './banner.interface';

const bannerSchema = new Schema<TBanner>(
  {
    subtitle: { type: String },
    title: { type: String },
    image: { type: String, default: '', required: true },
    link: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    type: {
      type: String,
      enum: ['main', 'offer', 'promotion'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const bannerModel = model<TBanner>('banner', bannerSchema);

import { HydratedDocument, model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';
import SlugUtils from '../../../utils/slug.utils';
const { generateSlug } = SlugUtils;
const blogSchema = new Schema<TBlog>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
   tags: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('save', function (next) {
  const blog = this as HydratedDocument<TBlog>;
  if ((blog.isModified('title') || blog.isNew) && blog.title) {
    try {
      blog.slug = generateSlug(blog?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

export const blogModel = model<TBlog>('blog', blogSchema);

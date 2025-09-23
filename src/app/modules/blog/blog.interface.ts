import { ObjectId } from 'mongoose';

export type TBlog = {
  title: string;
  slug: string;
  image: string;
  description: string;
  author: ObjectId;
  tags: string[];
  status: 'active' | 'inactive';
};

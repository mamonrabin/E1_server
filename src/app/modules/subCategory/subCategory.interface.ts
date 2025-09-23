import { ObjectId } from 'mongoose';

export type TSubCategory = {
  category: ObjectId;
  title: string;
  slug: string;
};

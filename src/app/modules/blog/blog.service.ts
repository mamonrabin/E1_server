import { TBlog } from './blog.interface';
import { blogModel } from './blog.model';

const createBlogByBD = async (blog: TBlog) => {
  const result = await blogModel.create(blog);
  return result;
};
const getAllBlogByBD = async () => {
  const result = await blogModel.find().populate("author");
  return result;
};
const getSingleBlogByBD = async (id: string) => {
  const result = await blogModel.findById(id);
  return result;
};

const getSingleBlogBySlug = async (slug: string) => {
  const result = await blogModel.findOne({ slug }).populate("author");
  return result;
};

const updateSingleBlogByBD = async (id: string, updateBlog: TBlog) => {
  const result = await blogModel.findByIdAndUpdate(id, updateBlog, {
    new: true,
  });
  return result;
};

const deleteSingleBlogByBD = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

export const blogService = {
  createBlogByBD,
  getAllBlogByBD,
  getSingleBlogByBD,
  getSingleBlogBySlug,
  updateSingleBlogByBD,
  deleteSingleBlogByBD,
};

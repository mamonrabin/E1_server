import { TSubCategory } from './subCategory.interface';
import { subCategoryModel } from './subCategory.model';

const createSubCategoryByDB = async (subCategory: TSubCategory) => {
  const result = await subCategoryModel.create(subCategory);
  return result;
};
const getAllSubCategoryByDB = async () => {
  const result = await subCategoryModel.find();
  return result;
};
const getSingleSubCategoryByDB = async (id: string) => {
  const result = await subCategoryModel.findById(id);
  return result;
};

const getSingleSubCategoryBySlug = async (slug: string) => {
  const result = await subCategoryModel.findOne({ slug });
  return result;
};

const updateSingleSubCategoryByDB = async (
  id: string,
  updateCategory: TSubCategory,
) => {
  const result = await subCategoryModel.findByIdAndUpdate(id, updateCategory, {
    new: true,
  });
  return result;
};

const deleteSingleSubCategoryByDB = async (id: string) => {
  const result = await subCategoryModel.findByIdAndDelete(id);
  return result;
};

export const subCategoryService = {
  createSubCategoryByDB,
  getAllSubCategoryByDB,
  getSingleSubCategoryByDB,
  getSingleSubCategoryBySlug,
  updateSingleSubCategoryByDB,
  deleteSingleSubCategoryByDB,
};
